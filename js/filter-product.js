import { products } from "./data/product-data.js";
import { renderProducts } from "./amazon-script.js"
import { addCartFun } from "./add-cart.js";


export function searchProduct(searchElement){
    searchElement.value = localStorage.getItem('search')||'';

    if(searchElement.value !== ''){
        filtering(searchElement);
    }
    document.querySelector('.js-middle-search-button').addEventListener('click', ()=>{
        location.href = 'amazon.html';
        filtering(searchElement);
    });
}

export function filtering(searchElement){
    let searchInput = searchElement.value.toLowerCase();
    let filter = products.filter((product) => {
       return product.keywords.some(keyword => keyword.toLowerCase().includes(searchInput));
   });
   
   saveSearch(searchInput)
   if(filter.length === 0){
       renderNoResult();
   }
   else{
       renderProducts(filter);
   }
}

function renderNoResult(){
    let html = `<p class="no-products">Product you searched has no results</p>`; 
    document.querySelector('.js-main-product-grid').innerHTML = html
}
export function saveSearch(searchInput){
    return localStorage.setItem('search', searchInput);
}