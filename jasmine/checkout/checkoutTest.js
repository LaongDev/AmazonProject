import { displayCart} from "../../js/checkout/checkout.js";
import { loadCart, cart } from "../../js/data/cart.js";

describe('test suite: displayCart', () => {

    let productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    let productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeEach(() => {
        document.querySelector('.js-container-test').innerHTML = `
        <div class="check-out-order-summary-container"></div>
        <div class="js-order-summary-pricing"></div>
        `

        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    productQuantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    productQuantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadCart();

        displayCart()
    })

    it('display cart', () => {
        expect(
            document.querySelectorAll('.js-checkout-product-order-container').length
        ).toEqual(2)
        
        expect(document.querySelector(`.js-item-quantity-${productId1}`).innerText).toContain(2);
        expect(document.querySelector(`.js-item-quantity-${productId2}`).innerText).toContain(1);
    })

    it('delete item in cart', () => {
        

        document.querySelector(`.js-checkout-product-delete-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-checkout-product-order-container').length
        ).toEqual(1)
        expect(
            document.querySelector(`.js-checkout-product-order-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-checkout-product-order-container-${productId2 }`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
       
        document.querySelector('.js-container-test').innerHTML = '';
    })
})