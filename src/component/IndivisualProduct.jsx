import React from "react";

const IndivisualProduct = ({ indivisualProduct, addToCart }) => {
  // handleAddToCart is function which run when user clicked add to cart button
  // addToCart is function we define in Home.jsx to add user clicked product
  // into that user's cart
  const handleAddToCart = () => {
    addToCart(indivisualProduct);
  };

  return (
    <>
      <div className="product">
        <div className="product-img">
          {/* indivisualProduct.url is specific url of image (we generated from "handleaddproduct" function) */}
          <img src={indivisualProduct.url} alt="" />
        </div>
        {/* indivisualProduct.title is specific title of product comes from "product" and same for
        description and price*/}
        <div className="product-text title">{indivisualProduct.title}</div>
        <div className="product-text description">
          {indivisualProduct.description}
        </div>
        <div className="product-text price">Rs. {indivisualProduct.price}</div>
        <div
          className="btn btn-danger btn-md cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </div>
        {/* when user click one specifice product's add to cart then "handleAddToCart" function runs.*/}
      </div>
    </>
  );
};

export default IndivisualProduct;
