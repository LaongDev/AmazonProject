import { filtering } from "./data/product-data.js";

export function searchProduct(searchElement){
    searchElement.value = localStorage.getItem('search')||'';

    if(searchElement.value !== ''){
        filtering(searchElement);
    }
    document.querySelector('.js-middle-search-button').addEventListener('click', ()=>{
        location.href = 'amazon.html';
        filtering(searchElement);
    });
    document.querySelector('.js-middle-search-bar').addEventListener('keydown', (event)=>{
        if (event.key === 'Enter') {
            location.href = 'amazon.html';
            filtering(searchElement);
        }
    });
}




