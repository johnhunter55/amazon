import products from "../data/products.js";

export const cart = {};

function getCart() {
  const cartString = localStorage.getItem("myShoppingCart");
  if (cartString === null) {
    return [];
  }

  return JSON.parse(cartString);
}

export function addToCart(productID) {
  console.log(productID);
  const currentCart = getCart();

  const product = products.find((p) => p.id === Number(productID));

  if (!product) {
    console.error("Product not found:", productID);
    return;
  }

  currentCart.push(product);

  const jsonString = JSON.stringify(currentCart);

  localStorage.setItem("myShoppingCart", jsonString);

  console.log("Added to cart:", product.name);
}
