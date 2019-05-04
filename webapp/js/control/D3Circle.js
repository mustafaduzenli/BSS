;(function () {
    "use strict";
 
    jQuery.sap.declare('bss.control.D3Circle');
 
    jQuery.sap.require("bss.lib.ext.d3");
    jQuery.sap.includeStyleSheet("js/control/D3Circle.css");
 
    sap.ui.core.Control.extend("bss.control.D3Circle", {
 
        metadata: {
            properties : {
                radius   : {type : "int", defaultValue: 50}
            },
            //defaultAggregation : "...",
            aggregations : { },
            associations : { },
            events       : { }
        },
        
        init : function(){ },
 
        onAfterRendering: function (oEvent){
            var jqContent, svg, radius;
            
            radius = this.getRadius();
            if (radius <10){
                radius = 10;
            }
            
            //HINT: jQuery(this.getDomRef()) and this.$() is equal - it gives you the jQuery object for this control's DOM element
            svg = d3.select(this.getDomRef()).append("svg")
                        .attr({
                            "class" : "bssD3CircleSvg",    
                            "width" : 500,
                            "height": 500
                         });
            svg.append("circle").attr({
                cx : 250,
                cy : 100,
                r  : radius
            });
 
        },
 
        renderer : {
 
            render : function(rm, oControl) {
                rm.write("<div");
                rm.writeControlData(oControl);
                rm.addClass("bssD3Circle");
                rm.writeClasses();
                rm.write(">");
                rm.write("</div>");
            }
        }
    });
 
}());