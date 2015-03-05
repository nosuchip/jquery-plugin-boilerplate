(function(window, $){
    $.plugin = function(element, options){
        var self = this;

        //check whether element to bind already has this plugin instance bound
        if ($.plugin.bound.indexOf(element) > -1) {
            return $.plugin.bound[$.plugin.bound.indexOf(element)];
        }
        $.plugin.bound.push(element);

        //Public fields
        self.element = element;
        self.$element = $(element);
        //TODO: Put any additional plugin public fields here

        //Public method
        self.init = function(){
            self.$element.data($.plugin.className, self);

            self.options = $.extend({}, $.plugin.defaultOptions, options);

            //TODO: Put initialization logic here

            self.bind();
            self.refresh();
        };

        self.el = function(selector) {
            return self.$element.find(selector);
        };

        //Initialze all control bindings. Should be re-callable to support options changes if required
        self.bind = function() {
            //TODO: Put your controls binding here
        };

        //Method iamed to be called on options update (to refreshh plugin state) or at any moment.
        self.refresh = function() {
            //TODO: Put plugin state refreshing logic here
        };

        self.init();
    };

    //Default plugin options which will be extended with user provided one
    $.plugin.defaultOptions = {
        //TODO: Put any default plugins options here
    };

    $.plugin.bound = [];            //List of elements to which plugin already bound
    $.plugin.className = 'plugin';  //Name of plugin which used to store plugin instance if $.data()

    //Plugin initializer. Supports plugin(s) instantiation, option getting ans settings.
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

        return this.each(function(){
            (new $.plugin(this, options));
        });
    };
})(window, jQuery);
