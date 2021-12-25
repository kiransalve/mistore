import React from "react";
import IndivisualCartProduct from "./IndivisualCartProduct";

const CartProducts = ({
  cartProducts,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  return cartProducts.map((cartProduct) => (
    <IndivisualCartProduct
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
    />
  ));
};

export default CartProducts;
