import {orders} from './data/ordered-data.js';
import { toggleBurgerMenu } from './burger-button.js';
import {money} from './util/moneyConvert.js';
import {products} from './data/product-data.js'
import { addToCart,updateCartQuantity } from './data/cart.js';
import { trackData,saveTrack } from './data/track-data.js';
import { saveSearch } from './filter-product.js';
let orderHtml = ``;

orders.forEach(order => {
    orderHtml += `
        <div class="order-log-container">
            <div class="order-log">
                <header class="header-order">
                    <div class="header-left-side">
                        <div class="date-ordered">
                            <b>Order Placed:&nbsp</b> ${order.orderPlace}
                        </div>
                        <div class="total-order">
                            <b>Total:&nbsp</b> $${money(order.total)}
                        </div>
                    </div>
                        <div class="order-id">
                            <b>Order ID:&nbsp</b>
                            <div class="js-order-generate-id">
                            ${order.Id}
                            </div>
                        </div>
                    
                </header>
                <div class="product-order-grid-container">
                    ${productOrder(order)}
                   
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.js-summary-order').innerHTML = orderHtml;

    document.querySelectorAll('.js-order-buy-again-btn').
    forEach(buy => {
        buy.addEventListener('click', ()=>{
            let matchOrderId = '';
            let matchItemId = '';
            const {orderId, cartItemId} = buy.dataset;
            orders.forEach(order => {
                if(order.Id===orderId){
                    matchOrderId = order;
                }
            })
            order.orderList.forEach(list => {
                if(list.productId === cartItemId){
                    matchItemId = list;
                }
            })
            addToCart(matchItemId.productId, 1)
            updateCartQuantity();
        })


    })

    document.querySelectorAll('.js-track-package-button').forEach(trackBtn => 
        {trackBtn.addEventListener('click', ()=>{
            location.href = 'tracking.html'
            let {trackPackageId, cartItemId} = trackBtn.dataset;
            console.log(trackPackageId, cartItemId);
            let matchOrder = '';
            let matchItem = '';
            orders.forEach(order => {
                if(order.Id===Number(trackPackageId)){
                    matchOrder = order;
                }
            })
            matchOrder.orderList.forEach(list => {
                if(list.productId === cartItemId){
                    matchItem = list;
                }
            })
            trackData.orderId = trackPackageId;
            trackData.productId = cartItemId;
            trackData.arrivalDate = matchItem.arrivalDate;
            trackData.dateOrdered = matchOrder.orderPlace;
            trackData.quantity = matchItem.quantity;
            saveTrack();
            console.log(trackData);
            })
        });
    
});

function productOrder(order){
    let productGridHTML = ``;

    order.orderList.forEach(product => {
        let match;
        products.forEach(productItem => {
            if(product.productId === productItem.id){
                match = productItem;
            }
        })
        productGridHTML += `
            <div class="product-order-grid"> <!--Ordered Product Container-->
                <div class="product-image-container">
                    <img class="product-image" src="${match.image}" alt="">
                </div>

                <div class="product-information-list">
                    <div class="js-product-name-order">
                        <b>${match.name}</b>
                    </div>
                    <div class="arrival-date-order">
                        Arriving on:
                        <span class="js-order-arrival-date">${product.arrivalDate}</span>
                    </div>
                    <div class="product-quantity-order">
                        Quantity:
                        <span class="js-product-quantity-order">${product.quantity}</span>
                    </div>
                    <button class="order-buy-again-btn js-order-buy-again-btn" 
                    data-order-id = "${order.Id}"
                    data-cart-item-id = "${product.productId}"
                    >
                        <img class="order-again-icon" src="images/buy-again.png" alt="">
                        Buy it again</button>
                        <button class="track-package-button-resize 
                        js-track-package-button"
                        data-track-package-id= "${order.Id}"
                        data-cart-item-id= "${product.productId}"
                        >Track package</button>
                </div>
                <button class="track-package-button js-track-package-button" 
                data-track-package-id= "${order.Id}"
                data-cart-item-id= "${product.productId}"
                >Track package</button>
            </div>`
    })
    return productGridHTML;
}
toggleBurgerMenu();

let searchElement = document.querySelector('.js-middle-search-bar')
document.querySelector('.js-middle-search-button').addEventListener('click', ()=>{
    saveSearch(searchElement.value)
    location.href = 'amazon.html'
    
});
