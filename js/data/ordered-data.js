export const orders = JSON.parse(localStorage.getItem('orders'))||[
    {
        orderPlace: 'December 28',
        total: 3506,
        Id: "1706545219016",
        orderList: [
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
                arrivalDate: 'Monday, January 29', 
                quantity: 1
            },
            {
                productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 
                arrivalDate: 'Monday, January 29', 
                quantity: 2
            },
        ]
    }

];

export function saveOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
