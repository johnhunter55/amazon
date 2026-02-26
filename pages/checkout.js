import {
  getCart,
  removeFromCart,
  updateCartCount,
  removeOneFromCart,
  addToCart,
} from "../utils/storage.js";
// Let user up or down the item
document.addEventListener("click", (e) => {
  const productId = e.target.dataset.productId;
  if (!productId) return;

  if (e.target.classList.contains("delete-btn")) {
    removeFromCart(productId);
    renderCheckout();
  } else if (e.target.classList.contains("increase-btn")) {
    addToCart(productId);
    renderCheckout();
  } else if (e.target.classList.contains("decrease-btn")) {
    removeOneFromCart(productId);
    renderCheckout();
  }
});

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
                    <div class="flex items-center border rounded">
                        <button class="px-3 py-1 hover:bg-gray-100 decrease-btn cursor-pointer" data-product-id="${item.id}">-</button>
                        <span class="px-3">${item.quantity || 1}</span>
                        <button class="px-3 py-1 hover:bg-gray-100 increase-btn cursor-pointer" data-product-id="${item.id}">+</button>
                    </div>
                    
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
renderCheckout();
