

export function toggleBurgerMenu(){
let isClick = false;
const burgerListElement = document.querySelector('.list-right-nav-container');
const returnLink = document.querySelector('.burger-return-refund');
const cartLink = document.querySelector('.burger-cart');

    document.querySelector('.menu-button').addEventListener('click', () => {
        if(!isClick){
            burgerListElement.style.height = '80px';
            returnLink.style.display = 'flex';
            cartLink.style.display = 'flex';
            isClick = true;
        }
        else{
            burgerListElement.style.height = '0';
            returnLink.style.display = 'none';
            cartLink.style.display = 'none';
            isClick = false;
        }
    });
}
/*Burger Menu Button*/