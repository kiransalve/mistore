import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Product from "../component/Product";
import { auth, fs } from "../config/Config";

const Home = (props) => {
  // getting current user uid

  function GetUserUID() {
    const [uid, setUid] = useState(null);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUID();

  // geting current user function

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

  // state of products
  const [product, setProducts] = useState([]);

  // getting product function

  const getProduct = async () => {
    const product = await fs.collection("Products").get();
    const productArray = [];

    for (var snap of product.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productArray.push({
        ...data,
      });
      if (productArray.length === product.docs.length) {
        setProducts(productArray);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // add to cart function

  let ProductList;
  const addToCart = (product) => {
    if (uid !== null) {
      ProductList = product;
      ProductList["qty"] = 1;
      ProductList["TotalProductPrice"] = ProductList.qty * ProductList.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(ProductList)
        .then(() => {
          console.log(ProductList);
        });
    } else {
      props.history.push("/login");
    }
  };

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

  return (
    <div className="wrapper">
      <Navbar user={user} totalProduct={totalProduct} />
      <br />
      {product.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Product</h1>
          <div className="products-box">
            <Product product={product} addToCart={addToCart} />
          </div>
        </div>
      )}
      {product.length < 1 && (
        <div className="container-fluid">Please wait....</div>
      )}
    </div>
  );
};

export default Home;
