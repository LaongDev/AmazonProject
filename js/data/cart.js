export let cart;
loadCart();
export function loadCart(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(productId, productQuantity){
    
    let matchingItem;
    
    //push the item inside the cart
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.productQuantity += productQuantity;
    }
    else{
    cart.push(
        {
            productId,
            productQuantity,
            deliveryOptionId: '1'
        }
    );
    savedToLocalStorage()
    }
}

export function removeFromCart(deleteLink){
    let tempCart = []
    cart.forEach((carts) => {
        if(carts.productId !== deleteLink){
            tempCart.push(carts);
        }
    });
    cart = tempCart;
    savedToLocalStorage()
    console.log(cart)
}
export function updateCartQuantity(){
    let cartQuantityElement = document.querySelectorAll('.js-cart-quantity');
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.productQuantity;
    });
    cartQuantityElement.forEach(cartQ => (cartQ.innerHTML = cartQuantity));
    savedToLocalStorage()
    }

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    savedToLocalStorage()
}

export function savedToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}