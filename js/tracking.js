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
    let isCurrent;
    products.forEach((product)=>{
        if (trackData.productId === product.id){
            matching = product;
        }
    });
    console.log(trackData.productId);
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
    const arrivalDate = convertDateStringToDayJS(trackData.arrivalDate);
    const dateOrdered = convertDateStringToDayJS(trackData.dateOrdered);
    
    const totalDuration = arrivalDate.diff(dateOrdered, 'day'); // Get total duration in days
    const elapsedDuration = daysPassed(arrivalDate, dateOrdered)// Get elapsed duration in days
    
    let adjustedProgressPercentage = (elapsedDuration / totalDuration) * 100;

    if(adjustedProgressPercentage < 10.00){
        adjustedProgressPercentage = 10.00;
    }
    isCurrentLabel(adjustedProgressPercentage);
    console.log(adjustedProgressPercentage)
    setTimeout(() => {
        document.querySelector('.progress-bar').style.width = `${Math.min(adjustedProgressPercentage, 100)}%`;
    }, 100);   
}
function convertDateStringToDayJS(dateString) {
    const date = dayjs(dateString, { format: 'dddd, MMMM D' });
    return date.isValid() ? date : null;
}
function daysPassed(startDate, endDate) {
    let currentDate = startDate;
    const end = endDate;
    
    let daysDifference = 0;

    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        daysDifference++;
        currentDate = currentDate.add(1, 'day');
    }

    return daysDifference;
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