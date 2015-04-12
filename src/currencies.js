(function (context) {

    'use strict';

    /**
     * Base of currency
     * @interface
     * @constructor
     */
    var CurrencyType = function () {
        /**
         * The currency sign
         * @type {String}
         */
        this.sign = undefined;
        /**
         * The currency string sign
         * @type {String}
         */
        this.stringSign = undefined;
        /**
         * List of the rates by the current currency
         * @type {{}}
         */
        this.rates = {};
        /**
         * Returns the default format amount of the currency
         * @throws 'not implemented'
         * @returns {String}
         */
        this.getDefaultFormat = function () {
            throw new Error('not implemented');
        };
    };

    /**
     * USD dollar currency type
     * @implements CurrencyType
     * @constructor
     */
    var USDDollarCurrencyType = function () {
        CurrencyType.apply(this, arguments);
        this.sign = '$';
        this.stringSign = 'USD';
        this.rates = {
            'GBP': 0.68,
            'INR': 62.27
        };
        this.getDefaultFormat = function (amount) {
            return this.sign + amount.toFixed(2);
        };
    };
    USDDollarCurrencyType.prototype = CurrencyType.prototype;
    USDDollarCurrencyType.prototype.constructor = USDDollarCurrencyType;

    /**
     * British pounds currency type
     * @implements CurrencyType
     * @constructor
     */
    var BritishPoundCurrency = function () {
        CurrencyType.apply(this, arguments);
        this.sign = '£';
        this.stringSign = 'GBP';
        this.rates = {
            'USD': 1.46,
            'INR': 91.11
        };
        this.getDefaultFormat = function (amount) {
            return this.sign + amount.toFixed(2);
        }
    };
    BritishPoundCurrency.prototype = CurrencyType.prototype;
    BritishPoundCurrency.prototype.constructor = BritishPoundCurrency;

    /**
     * Indian rupees currency type
     * @implements CurrencyType
     * @constructor
     */
    var IndianRupeeCurrency = function () {
        CurrencyType.apply(this, arguments);
        this.sign = '₹';
        this.stringSign = 'INR';
        this.rates = {
            'USD': 0.016,
            'GBP': 0.011
        };
        this.getDefaultFormat = function (amount) {
            return +amount + ' ' + this.stringSign;
        }
    };
    IndianRupeeCurrency.prototype = CurrencyType.prototype;
    IndianRupeeCurrency.prototype.constructor = IndianRupeeCurrency;

    /**
     *Check the validation of a form and do so many fancy things
     *@constructor
     */
    var Currency = function () {

        /**
         * List of currencies used
         * @type {{dollar: USDDollarCurrencyType, britishPound: BritishPoundCurrency, indianRupee: IndianRupeeCurrency}}
         */
        this.currencies = {
            'dollar': new USDDollarCurrencyType(),
            'britishPound': new BritishPoundCurrency(),
            'indianRupee': new IndianRupeeCurrency()
        };

        /**
         * Validates the form and does fancy stuff
         * @returns {undefined|string}
         */
        this.getChange = function (amountString, toExchange) {
            var result = undefined;
            var currentCurrencyType = this.detectCurrency(amountString);

            //check if there is any possible currency
            if (currentCurrencyType) {
                var amount = this.getAmount(amountString);
                result = this.getFormattedAmountByCurrency(amount, currentCurrencyType, toExchange);
            }

            return result;
        };

        /**
         * Get the int amount
         * @param amountString
         */
        this.getAmount = function (amountString) {
            //regex n to int
            return +amountString.match(/[0-9.]+/);
        };

        /**
         * Detects the currency checking all them by
         * @param amountString
         * @returns CurrencyType
         */
        this.detectCurrency = function (amountString) {
            var currencyType;
            //regex
            var currencySign = amountString.replace(amountString.match(/[ 0-9.,-]+/), '');
            //for currencies looking for the current one
            for (var currencyKey in this.currencies){
                if (this.currencies[currencyKey].sign === currencySign || this.currencies[currencyKey].stringSign === currencySign){
                    currencyType = this.currencies[currencyKey];
                    break;
                }
            }
            return currencyType;
        };

        /**
         * Returns the by default formatted currency amount
         * @param amount {Number}
         * @param currentCurrencyType CurrencyType
         * @param toExchange {String}
         */
        this.getFormattedAmountByCurrency = function (amount, currentCurrencyType, toExchange) {
            //get toExchange CurrencyType object
            var toExchangeCurrencyType;
            for (var currencyKey in this.currencies){
                if (this.currencies[currencyKey].sign === toExchange || this.currencies[currencyKey].stringSign === toExchange){
                    toExchangeCurrencyType = this.currencies[currencyKey];
                    break;
                }
            }
            //return undefined if the same currencyType
            if (toExchangeCurrencyType === currentCurrencyType){
                return;
            }
            //amount by rate
            amount = amount * currentCurrencyType.rates[toExchangeCurrencyType.stringSign];
            //return formatted amount
            return toExchangeCurrencyType.getDefaultFormat(amount);
        };

    };

    // For Node.js
    if (typeof module === "object" && module && module.exports === context) {
        module.exports = new Currency();

        // For browsers
    } else {
        context.currency = new Currency();
    }

})(this);