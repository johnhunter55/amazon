import products from "../data/products.js";

export const cart = {};

export function updateCartCount() {
  const currentCart = getCart();
  const totalItems = currentCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  // Select the HTML element we created in Step 2
  const countElement = document.getElementById("cart-count");

  // Safety check: Does the element exist on this page?
  if (countElement) {
    countElement.innerText = totalItems;
  }
}

export function removeFromCart(productId) {
  const currentCart = getCart();
  const newCart = currentCart.filter((item) => item.id !== Number(productId));
  localStorage.setItem("myShoppingCart", JSON.stringify(newCart));
  updateCartCount();
}

export function getCart() {
  const cartString = localStorage.getItem("myShoppingCart");
  if (cartString === null) {
    return [];
  }

  return JSON.parse(cartString);
}

export function removeOneFromCart(productID) {
  const currentCart = getCart();

  const matchingItem = currentCart.find(
    (item) => item.id === Number(productID),
  );

  if (matchingItem) {
    matchingItem.quantity = (matchingItem.quantity || 1) - 1;
  } else {
    const product = products.find((p) => p.id === Number(productID));
    if (!product) {
      console.error("Product not found:", productID);
      return;
    }
    currentCart.push({ ...product, quantity: -1 });
  }
  const jsonString = JSON.stringify(currentCart);

  localStorage.setItem("myShoppingCart", jsonString);

  console.log("Removed from cart:", productID);
  updateCartCount();
}

export function addToCart(productID) {
  const currentCart = getCart();

  const matchingItem = currentCart.find(
    (item) => item.id === Number(productID),
  );

  if (matchingItem) {
    matchingItem.quantity = (matchingItem.quantity || 1) + 1;
  } else {
    const product = products.find((p) => p.id === Number(productID));
    if (!product) {
      console.error("Product not found:", productID);
      return;
    }
    currentCart.push({ ...product, quantity: 1 });
  }

  const jsonString = JSON.stringify(currentCart);

  localStorage.setItem("myShoppingCart", jsonString);

  console.log("Added to cart:", productID);
  updateCartCount();
}
