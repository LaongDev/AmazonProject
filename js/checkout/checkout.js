import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from "../../js/data/cart.js";
import { renderPaymentTotal } from "./orderTotal.js";
import {deliveryOption} from "../../js/data/deliveryOption.js";
import {products, getProduct} from '../../js/data/product-data.js'; 
import {money} from '../util/moneyConvert.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


console.log(cart);

export function displayCart(){
    updateCartQuantity();
    renderPaymentTotal();
    const checkoutContainer = document.querySelector('.check-out-order-summary-container');
    let cartItemHTML = ``;
        if(cart.length === 0){
            let empty = `
            <div class="empty-product">
            <p>Your cart is empty</p>
            <a href="amazon.html" class="view-products-btn">View product</a>
        </div>`;
        checkoutContainer.innerHTML = empty;
        }
        else{
            cart.forEach(cartItem => {
                const match = getProduct(cartItem.productId);
                cartItemHTML += `
                    <div class="checkout-product-order-container 
                    js-checkout-product-order-container
                    js-checkout-product-order-container-${cartItem.productId}">
                        <div class="checkout-delivery-date">
                            Delivery date: <span class="js-checkout-delivery-date">${deliveryDate(cartItem)}</span>
                        </div>
                        <div class="item-checkout-information-grid">
                            <img class="checkout-product-img" src="${match.image}" alt="" loading="lazy">
                            <div class="product-checkout-info">
                                <div class="product-name">${match.name}</div>
                                <div class="product-price">$${money(match.priceCents)}</div>
                                <div class="product-variation"></div>
                                <div class="product-quantity">Quantity: <span class="item-quantity js-item-quantity-${cartItem.productId}">${cartItem.productQuantity}</span>
                                    <span class="js-checkout-product-update checkout-product-update" data-update-link="${cartItem.productId}">Update</span>
                                    <input class="quantity-input quantity-input-${cartItem.productId}">
                                    <span class="save-quantity js-save-quantity" data-save-link="${cartItem.productId}">Save</span>
                                    <span class="js-checkout-product-delete 
                                    js-checkout-product-delete-${cartItem.productId}
                                    checkout-product-delete" data-delete-link="${cartItem.productId}">Delete</span>
                                </div>
                            </div>
                            <div class="product-checkout-delivery-date-option">
                
                                <div class="checkout-delivery-option-name">Choose a delivery option</div>
                
                                <div class="delivery-option-container">
                                    ${deliveryOptHtml(cartItem)}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    checkoutContainer.innerHTML = cartItemHTML;
                    
                    document.querySelectorAll('.js-checkout-product-delete').
                    forEach((link) => {
                        link.addEventListener('click', ()=> {
                            const {deleteLink} = link.dataset;
                            removeFromCart(deleteLink);
                            const container = document.querySelector(`.js-checkout-product-order-container-${deleteLink}`);
                            container.remove();
                            updateCartQuantity();
                            renderPaymentTotal();
                            emptyCart();
                        });
                    });
                });
        }


        document.querySelectorAll('.js-delivery-radio-option').
        forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderPaymentTotal();
                displayCart();
            });
        });
        
        updateCartItem();
        saveCartItem();

        function updateCartItem(){
            document.querySelectorAll('.js-checkout-product-update').
        forEach((update) => {
            update.addEventListener('click', () => {
                const {updateLink} = update.dataset;
                const container = document.querySelector(`.js-checkout-product-order-container-${updateLink}`);
                container.classList.add('is-editing-quantity');
            });
        })
}
function saveCartItem(){
    document.querySelectorAll('.js-save-quantity').forEach((save) => {
        save.addEventListener('click', () => {
            const {saveLink} = save.dataset;
            const quantityInput = document.querySelector(`.quantity-input-${saveLink}`);
            cart.forEach((cartItem) => {
                if(cartItem.productId === saveLink){
                    if(Number(quantityInput.value) >= 1 && Number(quantityInput.value) < 1000){
                        cartItem.productQuantity = Number(quantityInput.value);
                    }
                    else{
                        alert("INVALID NUMBER OR INPUT");
                    }
                    updateCartQuantity();
                    displayCart();
                    renderPaymentTotal();
                }
            });
            const container = document.querySelector(`.js-checkout-product-order-container-${saveLink}`);
            container.classList.remove('is-editing-quantity');

        });
    });
}
function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
function deliveryOptDate(addDay){
    let remainingDays = addDay;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (!isWeekend(deliveryDate)) {
        remainingDays--;
        }
    }
  const dateString = deliveryDate.format(
    'dddd, MMMM D');
    return dateString;
}
function deliveryOptHtml(cartItem){
    let deliveryHtml = ``;
    deliveryOption.forEach((delivery) => {

        const priceString = delivery.priceCents === 0 ? 'FREE' : `$${money(delivery.priceCents)}`;
        
        let isChecked = cartItem.deliveryOptionId === delivery.id;
        deliveryHtml += `
        <div class="js-delivery-radio-option delivery-radio-option"
        data-product-id = ${cartItem.productId}
        data-delivery-option-id = ${delivery.id}>
        <input type="radio" 
        ${isChecked ? 'checked': ''}
         name="radio-delivery-option-${cartItem.productId}" 
         id="radio-delivery-option">
        <div>
            <div class="delivery-option-date">${deliveryOptDate(delivery.deliveryDay)}</div>
            <div class="delivery-option-cost">
               ${priceString} - Shipping
            </div>
        </div>
    </div>
        `;
    });

    return deliveryHtml;
}
function deliveryDate(cartItem){
    let day;
    deliveryOption.forEach((delivery) => {
        if(cartItem.deliveryOptionId === delivery.id){
            day = delivery.deliveryDay;
        }
    });
    return deliveryOptDate(day);
}
}   


displayCart();