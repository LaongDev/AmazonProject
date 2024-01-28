import {money} from '../../js/util/moneyConvert.js';

describe('test suite: formatCurrency', () => {
    it('convert cents to dollar', () => {
        expect(money(4589)).toEqual('45.89')
    })
    it('handle zero', () => {
        expect(money(0)).toEqual('0.00');
    })
    it('handle decimal', () => {
        expect(money(2000.5)).toEqual('20.01');
    })
});