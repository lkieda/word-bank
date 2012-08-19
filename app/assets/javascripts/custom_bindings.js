ko.bindingHandlers.fadeVisible = {
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).hide();
        $(element).stop();

        if (value == "failure"){
            $(element).css('color', 'red');
        } else {
            $(element).css('color', 'green');
        }

        $(element).fadeIn(100);
        $(element).fadeOut(2000);

//        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};
