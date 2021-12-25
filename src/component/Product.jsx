import React from "react";
import IndivisualProduct from "./IndivisualProduct";

const Product = ({ product, addToCart }) => {
  console.log(product);
  // "product" have all product we added to firestore database
  // we get one by one product from product using map menthod
  // indivisualProduct is one product with title, description, price and image
  return product.map((indivisualProduct) => (
    <IndivisualProduct
      key={indivisualProduct.ID}
      indivisualProduct={indivisualProduct}
      addToCart={addToCart}
    />
    // key is unique id of perticular one product
    // indivisualProduct is one product with title, description, price and image
    // addToCart is function we define in Home.jsx to add user clicked product
    // into that user's cart
  ));
};

export default Product;
