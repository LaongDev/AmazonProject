import {cart} from '../data/cart.js';
import { products } from '../data/product-data.js';
import {deliveryOption} from '../data/deliveryOption.js'
import {money} from '../util/moneyConvert.js'
import { displayCart,deliveryDate } from './checkout.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders,saveOrders } from '../data/ordered-data.js'

export function renderPaymentTotal(){
    const orderSummaryElement = document.querySelector('.js-order-summary-pricing');
    let itemsTotal = 0;
    let deliveryFee = 0;

    //calculate total price of all the items including shipping
    cart.forEach(cartItem => {
        let itemPrice;
        
        products.forEach(product => {
            if(cartItem.productId === product.id){
                itemPrice = product.priceCents;
            }
        });
        deliveryOption.forEach(delivery => {
            if(cartItem.deliveryOptionId === delivery.id){
                deliveryFee += delivery.priceCents;
                //total delivery fee
            }
        });
        itemsTotal += (cartItem.productQuantity * itemPrice);
    }); //Model

    const totalBfrTax = deliveryFee + itemsTotal;
    const tax = (((totalBfrTax* 0.1)/100).toFixed(2))*100;
    const total = totalBfrTax + tax;
    const isBtnDsble = cart.length === 0;
    let paymentSummaryHtml = `
        <div class="order-summary-title">Order Summary</div>
        <div class="item-quantity-total">
            <div>Items (<span class="js-total-checkout-product-quantity">${cart.length}</span>):</div> 
            <div class="product-price-total-container">
                $<span class="js-total-product-amount">${money(itemsTotal)}</span>
            </div>
        </div>
        <div class="shipping-handling-price-container">
            <p>Shipping & handling:</p>
            <div class="shipping-handling-price">
                $<span class="js-shipping-price">${money(deliveryFee)}</span>
            </div>
        </div>
        <div class="total-before-tax-container">
            <p>Total before tax:</p>
            
            <div class="total-before-tax-hr">
                <hr>
                <div class="padding-divider">$<span class="js-total-before-tax">${money(totalBfrTax)}</span></div>
            </div>
        </div>
        <div class="tax-estimation">
            <p>Estimated tax (10%)</p>
            <div class="tax-amount-container">
                $ <span class="tax-amount">${money(tax)}</span>
            </div>
        </div>
        <hr>
        <div class="order-total-container">
            <p>Order total:</p>
            <div>
                $<span class="js-order-total">${money(total)}</span>
            </div>
        </div>
        <div class="paypal-payment">
            <div>
                <p>Use Paypal</p>
                <input type="checkbox" name="" id="">
            </div>
        </div>
        <button class=" js-place-order
        place-order-button-show 
        ${isBtnDsble? 'place-order-button-disable': 'place-order-button'}" 
        ${isBtnDsble? 'disabled': ''}> Place your order</button>
        `;
        orderSummaryElement.innerHTML = paymentSummaryHtml;
        orderCart()

    function orderCart(){
        const Id = new Date().getTime()
        document.querySelector('.js-place-order').
            addEventListener('click', ()=>{
                location.href = 'order.html'
                
                let orderPlace = dayjs().format('MMMM D');
                let productId, quantity;
                let orderList = [];
                cart.forEach(cartItem => {
                    productId = cartItem.productId;
                    const arrivalDate = deliveryDate(cartItem);//current
                    console.log(arrivalDate);
                    console.log(cartItem.deliveryOptionId);
                    quantity = cartItem.productQuantity;
                    orderList.push(
                        {
                            productId,
                            arrivalDate,
                            quantity
                        }
                    )
                    console.log(arrivalDate);
                });
                orders.push({
                    orderPlace,
                    total,
                    Id,
                    orderList
                });
                saveOrders();
                console.log(orders);
                cart.splice(0, cart.length);
                displayCart();
            })
    }
}



