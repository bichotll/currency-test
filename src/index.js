(function(){
    //get form element
    var incomingPrice = document.getElementById('incoming-price');
    var currencyToChange = document.getElementById('currency');
    var outputPrice = document.getElementById('output-price');

    var handleDisplayOnChange = function () {
        var change = currency.getChange(incomingPrice.value, currencyToChange.value);

        if (change) {
            outputPrice.value = change;
        }
    };

    incomingPrice.onchange = function(){
        handleDisplayOnChange();
    };
    currencyToChange.onchange = function(){
        handleDisplayOnChange();
    };
})();