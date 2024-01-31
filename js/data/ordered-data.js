export const orders = JSON.parse(localStorage.getItem('orders'))||[
    {
        orderPlace: "February 1",
        total: 4067,
        Id: 1706719307885,
        orderList: [
            {
                productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
                arrivalDate: "Monday, February 12",
                quantity: 1
            },
            {
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                arrivalDate: "Friday, February 2",
                quantity: 1
            }
        ]
    }
];
export function saveOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

