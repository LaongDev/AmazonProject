import { addToCart, cart, loadCart } from "../../js/data/cart.js";

describe('test suite: addToCart', () => {
    it('adds existing product to cart', () => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    productQuantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadCart();
        spyOn(document, 'querySelector').and.returnValue({ value: '1' });
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].productQuantity).toEqual(2);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);

    });

    it('adds new product to cart', () => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        loadCart();
        spyOn(document, 'querySelector').and.returnValue({ value: '1' });
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].productQuantity).toEqual(1)
    })
});