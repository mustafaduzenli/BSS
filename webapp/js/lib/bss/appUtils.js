(function(window){
    "use strict";
 
    jQuery.sap.declare('bss.lib.appUtils');
 
    window.appUtils = {}; 
    /**
     * this is just an example
     */
    appUtils.addNumbers = function (param1, param2) {
        return param1 + param2;
    };
 
})(window);