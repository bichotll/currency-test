var chai = require("chai");
var expect = chai.expect;

var currency = require('./../src/currencies');

describe('Currency', function(){
    describe('detectCurrency', function(){
        it('returns a CurrentType instance', function(){
            expect(currency.detectCurrency('$123.32').stringSign).to.equal('USD');
        });
    });
    before(function(){
        var currentCurrencyType = currency.currencies.indianRupee;
        describe('getFormattedAmountByCurrency', function(){
            it('returns undefined if same currency', function(){
                expect(currency.getFormattedAmountByCurrency(123, currentCurrencyType, 'INR')).to.be.an('undefined');;
            });
        });
    });
    describe('getAmount', function(){
        //context
        it('returns the amount as Number', function(){
            expect(currency.getAmount('$123.32')).to.equal(123.32);
            expect(currency.getAmount('458 INT')).to.equal(458);
        });
        //...others possibilities
    });
    //...
});
