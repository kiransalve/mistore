import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, fs } from "../config/Config";
import CartProducts from "./CartProducts";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Cart() {
  // get current logged in user
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = GetCurrentUser();

  // get cart product from firebase and update state
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("user not signed in");
      }
    });
  }, []);
  // console.log(cartProducts);
  // getting the quantity from cartProducts in a separate way
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // reducing the quantity in single value
  const reducerOfQty = (accumalator, currentValue) =>
    accumalator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // reduce method
  // qty.reduce(function(total[the initial value or the previously returned value of function],currentValue,currentIndex,array),initial value)

  // getting the Total Product Price
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  // reducing the price in single value
  const reducerOfPrice = (accumalator, currentValue) =>
    accumalator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  // state of total products
  const [totalProduct, setTotalProduct] = useState(0);

  // getting cart product length
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProduct(qty);
        });
      }
    });
  });

  // global varialble
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    // updating firestore collection
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increament added");
          });
      } else {
        console.log("user not sign in");
      }
    });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;

      // updating firestore collection
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("Cart " + user.uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log("decreament done");
            });
        } else {
          console.log("user not sign in");
        }
      });
    }
  };
  // charging payment
  const history = useHistory();
  const handleToken = async (token) => {
    // console.log(token);
    const cart = { name: "All Product", totalPrice };
    const response = await axios.post(
      "https://mistores/checkout.heroku.com/checkout",
      {
        token,
        cart,
      }
    );
    console.log(response);
    let { status } = response.data;
    if (status === "success") {
      history.push("/");
      const uid = auth.currentUser.uid;
      const carts = await fs.collection("Cart " + uid).get();
      for (var snap of carts.docs) {
        fs.collection("Cart " + uid)
          .doc(snap.id)
          .delete();
      }
    } else {
      alert("something wrong in checkout");
    }
  };

  return (
    <div>
      <Navbar user={user} totalProduct={totalProduct} />
      <br />
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
          <div className="summary-box">
            <h5>Cart Summary</h5>
            <br />
            <div>
              Total No.of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {totalPrice}</span>
            </div>
            <br />
            <StripeCheckout
              stripeKey="pk_test_51JdzUpSH8hIJVJPZDpu9F2g0AgbZzESeFnulPoDzWxbLruBvfI7RpUWWVSkOaAstF1cpYV2auzmYttWnZYggevHQ009YKuttTM"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All Products"
              amount={totalPrice * 100}
            />
          </div>
        </div>
      )}

      {cartProducts.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}
    </div>
  );
}

export default Cart;
