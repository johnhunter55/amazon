import products from '../data/products.js';

function renderProductsPage() {
    const productPageContainer = document.getElementById('products-page');

    productPageContainer.innerHTML = `
    <h1>Our Products</h1>
    <div class="products-grid grid grid-cols-5 gap-4">
    ${products.map(product => `
        <div class="product-card p-4 rounded shadow flex flex-col justify-between">
            <img class="w-8xs" src="${product.image}" alt="${product.name}">
            <div class="flex gap-1 flex-col flex-grow">
                <h2 class="text-lg font-bold mt-2">${product.name}</h2>
                <p >${product.description}</p>
                </div>
                <div class="flex flex-col gap-2 mt-1">
                <p>${product.price}</p>
                <button class="bg-yellow-500 py-2 px-4 rounded hover:bg-yellow-600 cursor-pointer">Add to Cart</button>
                </div>
        </div>
    `).join(''
    )}
    </div >
        `;
}

renderProductsPage();