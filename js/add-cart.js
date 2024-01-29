import {updateCartQuantity, addToCart, cart} from '../js/data/cart.js';
const addCartBtn = document.querySelectorAll('.js-add-to-cart');
updateCartQuantity();
const timeIDs = {};
function handleNotification(productId) {
    const addedElement = document.querySelector(`.js-added-notif-${productId}`);
    addedElement.classList.add('js-added-notif');
    clearTimeout(timeIDs[productId]); // Clear existing timeout (if any) for this productId
    
    timeIDs[productId] = setTimeout(() => {
        addedElement.classList.remove('js-added-notif');
        delete timeIDs[productId]; // Clear the stored timeout ID after completion
    }, 2000);
}
addCartBtn.forEach(addCart => {
    addCart.addEventListener('click', () => {
        const {productId} = addCart.dataset;
        const selectQuantity = document.querySelector(`#js-product-quantity-${productId}`);
        const productQuantity = Number(selectQuantity.value);
        addToCart(productId, productQuantity);
        updateCartQuantity();
        handleNotification(productId);
    });
});
