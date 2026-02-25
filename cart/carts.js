import products from "../data/products.js";

// utils/storage.js

export function addToCartyb(productID) {
  const currentCart = getCart();

  // 1. Check if the item is ALREADY in the cart
  const existingItem = currentCart.find(
    (item) => item.id === Number(productID),
  );

  if (existingItem) {
    // 2. If it is, just increase the quantity number
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // 3. If it's NOT, find the product details...
    const product = products.find((p) => p.id === Number(productID));

    if (product) {
      // ...and add it with a starting quantity of 1
      currentCart.push({
        ...product, // copies name, price, image, etc.
        quantity: 1,
      });
    }
  }

  // 4. Save back to local storage
  localStorage.setItem("myShoppingCart", JSON.stringify(currentCart));

  // 5. Force the header to update (We will create this function next!)
  updateCartCount();
}
