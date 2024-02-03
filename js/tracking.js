import { updateCartQuantity } from "./data/cart.js";
import { toggleBurgerMenu } from "./burger-button.js"
import { trackData } from "./data/track-data.js";
import { products } from "./data/product-data.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

updateCartQuantity();
toggleBurgerMenu();
renderTracking();
updateProgress();

function renderTracking(){
    let matching;
    products.forEach((product)=>{
        if (trackData.productId === product.id){
            matching = product;
        }
    });
    let trackHTML = `
        <a href="cart.html" class="view-orders">View all orders</a>
        <h1 class="delivery-date">Arriving on ${trackData.arrivalDate}</h1>
        <p class="product-info">${matching.name}</p>
        <p class="product-quantity">Quantity: ${trackData.quantity}</p>
        <img src="${matching.image}" alt="" class="product-image">

        <div class="progress-tracker">
            <div class="label">
                <p class="prepare">Preparing</p>
                <p class="ship">Shipped</p>
                <p class="delivered">Delivered</p>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    `
    document.querySelector('.js-tracking-order-container').innerHTML = trackHTML;
}
function updateProgress() {
    const arrivalDate = dayjs(trackData.arrivalDate);
    const dateOrdered = dayjs(trackData.dateOrdered);
    const totalDuration = arrivalDate.diff(dateOrdered, 'day'); // Get total duration in days
    const elapsedDuration = dayjs().diff(dateOrdered, 'day')// Get elapsed duration in days
    let adjustedProgressPercentage = (elapsedDuration / totalDuration) * 100;

    if(adjustedProgressPercentage < 10.00){
        adjustedProgressPercentage = 10.00;
    }
    isCurrentLabel(adjustedProgressPercentage);
    setTimeout(() => {
        document.querySelector('.progress-bar').style.width = `${Math.min(adjustedProgressPercentage, 100)}%`;
    }, 100);   
}


function isCurrentLabel(percent){
    if(percent >= 10 && percent < 49){
        document.querySelector('.prepare').classList.add('current-label');
        document.querySelector('.ship').classList.remove('current-label');
        document.querySelector('.delivered').classList.remove('current-label');
    }
    else if (percent > 49 && percent < 99) {
        document.querySelector('.ship').classList.add('current-label');
        document.querySelector('.prepare').classList.remove('current-label');
    }
    else if(percent === 100){
        document.querySelector('.delivered').classList.add('current-label');
        document.querySelector('.ship').classList.remove('current-label');
    }
}