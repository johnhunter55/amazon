import products from '../data/products.js';
import { addToCart } from '../cart/carts.js';

function renderProductsPage() {
    const productPageContainer = document.getElementById('products-page');

    productPageContainer.innerHTML = `
    <h1>Our Products</h1>
    <div class="products-grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pl-5 pr-5">
    ${products.map(product => `
        <div class="product-card p-4 rounded shadow flex flex-col justify-between" data-product-id="${product.id}">
            <img class="w-8xs" src="${product.image}" alt="${product.name}">
            <div class="flex gap-1 flex-col ">
                <h2 class="text-lg font-bold mt-2">${product.name}</h2>
                <p >${product.description}</p>
                </div>
                <div class="flex flex-col gap-2 mt-1">
                <p>${product.price}</p>
                <button class="bg-yellow-500 py-2 px-4 rounded hover:bg-yellow-600 cursor-pointer itemBtn" data-product-id="${product.id}">Add to Cart</button >
                </div >
        </div >
        `).join(''
    )
        }
    </div >

    `;
}



renderProductsPage();

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('itemBtn')) {
        const productId = event.target.closest('.product-card').dataset.productId;
        addToCart(productId);
    }
})

// const buttons = document.getElementsByClassName("itemBtn")
// console.log(buttons)
// for (let button of buttons) {
//     console.log(button)
//     button.addEventListener('click', function (event) {
//         const productId = event.target.closest('.product-card').dataset.productId;
//         addToCart(productId);
//     })

// }

export default renderProductsPage;
