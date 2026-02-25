import { getCart, removeFromCart, updateCartCount } from "../utils/storage.js"; // Import your helper

function renderCheckout() {
  const cart = getCart(); // Get the array from local storage
  const container = document.getElementById("cart-items-container");
  const summaryContainer = document.getElementById("cart-summary");

  // 1. Handle Empty Cart Case
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    summaryContainer.innerHTML = "<p>Total: $0.00</p>";
    return;
  }

  // 2. Render Each Item
  // We use .map() to turn objects into HTML strings
  container.innerHTML = cart
    .map(
      (item) => `
        <div class="bg-white p-4 rounded shadow flex gap-4 items-center">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-contain">
            
            <div class="flex-1">
                <h3 class="font-bold text-lg">${item.name}</h3>
                <p class="text-green-700 font-bold">${item.price}</p>
                
                <div class="mt-2 flex items-center gap-2">
                    <label>Qty:</label>
                    <input type="number" min="1" value="${item.quantity || 1}" 
                           class="border rounded w-16 p-1 pl-2"
                           data-product-id="${item.id}">
                    
                    <button class="text-red-500 text-sm cursor-pointer hover:underline ml-4 delete-btn" 
                            data-product-id="${item.id}">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const productId = e.target.dataset.productId;
      removeFromCart(productId);
      renderCheckout();
    }
  });

  const total = cart.reduce((sum, item) => {
    const priceNumber = parseFloat(item.price.replace("$", ""));
    return sum + priceNumber * (item.quantity || 1);
  }, 0);

  summaryContainer.innerHTML = `
        <div class="flex justify-between text-lg font-bold">
            <span>Subtotal (${cart.reduce((a, c) => a + (c.quantity || 1), 0)} items):</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}
updateCartCount();
// Run on page load
renderCheckout();
