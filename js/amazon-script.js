import {products} from '../js/data/product-data.js'; 
import { toggleBurgerMenu } from './burger-button.js'; 
const mainElement = document.querySelector('.main-product-grid');

toggleBurgerMenu();
addProduct();


function addProduct(){
    
    let productHtmlList = ``;

    products.forEach((product) => {
        let html = `
        <div class="product-container">
        <div class="image-container">
            <img class="product-image" src="${product.image}" alt="" loading="lazy">
        </div>
        
        <div class="product-name limit-to-2-lines">
            ${product.name}
        </div>
        <div class="product-ratings-container">
            <div class="star-rating">
                <img class="star-rate" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="">
            </div>
            <div class="rating-count">
            ${product.rating.count}
            </div>
    
        </div>
        <div class="product-price">
        $<span class="price">${(product.priceCents/100).toFixed(2)}</span>
        </div>
        <div class="product-quantity-container">
            <select name="product-quantity" id="js-product-quantity-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
    
        <div class="variation-option">
    
        </div>
    
        <div class="product-spacer">
    
        </div>
    
        <div class="added-notif-container">
        <div class="added-notif js-added-notif-${product.id}">
            <img src="images/checkmark.png" alt="">
        Added
        </div>
        
    </div>
        <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
        `;
        productHtmlList += html;
        mainElement.innerHTML = productHtmlList;
    });
}
