import products from "../data/products.js";
import { addToCart, updateCartCount } from "../utils/storage.js";

function renderProductsPage() {
  const productPageContainer = document.getElementById("products-page");

  productPageContainer.innerHTML = `
    <div class="mt-5 products-grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    ${products
      .map(
        (product) => `
        <div class=" bg-neutral-50 my-item p-4 rounded shadow border border-gray-300 flex flex-col" data-product-id="${product.id}">
            <img class="w-8xs" src="${product.image}" alt="${product.name}">
            <div class="flex gap-1 flex-col flex-1">
                <h2 class="text-lg font-bold mt-2">${product.name}</h2>
                <p >${product.description}</p>
                </div>
                <div class="flex flex-col gap-2 mt-1">
                <p>${product.price}</p>
                <button class="bg-yellow-500 py-2 px-4 rounded hover:bg-yellow-600 cursor-pointer itemBtn" data-product-id="${product.id}">Add to Cart</button >
                </div >
        </div >
        `,
      )
      .join("")}
    </div >

    `;
}

renderProductsPage();

// 1. Define the function separately (The Logic)
function handleGlobalClick(event) {
  // The "If" (Filter)
  if (event.target.classList.contains("itemBtn")) {
    // Find the parent card to get the ID
    const card = event.target.closest(".my-item");
    const productId = card.dataset.productId;

    addToCart(productId);
  }
}

// 2. Attach it to the document (The Watcher)
document.addEventListener("click", handleGlobalClick);

// Run this once when the page loads to restore the number from LocalStorage
updateCartCount();

export default renderProductsPage;
