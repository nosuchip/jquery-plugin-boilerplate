(function(window, $){
    $.plugin = function(element, options){
        var self = this;

        if ($.plugin.bound.indexOf(element) > -1) {
            return $.plugin.bound[$.plugin.bound.indexOf(element)];
        }
        $.plugin.bound.push(element);

        //Public fields
        self.element = element;
        self.$element = $(element);

        //Public method
        self.init = function(){
            self.$element.data($.plugin.className, self);
            self.options = $.extend({}, $.plugin.defaultOptions, options);


            self.bind();
            self.refresh();
        };

        self.bind = function() {
            self.$element.on('click', self.message);
        };

        self.refresh = function() {
            self.$element.html(decodeURI($.param(self.options)));
        };

        self.message = function() {
            alert(self.$element.data('data-message'));
        };

        self.init();
    };

    $.plugin.defaultOptions = {
        option1: true,
        options2: [1,2,3,4]
    };

    $.plugin.bound = [];
    $.plugin.className = 'plugin';

    $.fn.plugin = function(options, option, value) {
        if (options === 'option') {
            if (arguments.length === 1) {
                return;
            } if (arguments.length === 2) {
                var instance = this.data($.plugin.className);
                return instance ? instance.options[option] : undefined;
            } else {
                return this.each(function(){
                    var instance = $(this).data($.plugin.className);
                    if (instance) {
                        instance.options[option] = value;
                        instance.refresh();
                    }
                });
            }
        }

        var i = 0;

        return this.each(function(){
            options.value = i;
            (new $.plugin(this, options));
            i++;
        });
    };
})(window, jQuery);
