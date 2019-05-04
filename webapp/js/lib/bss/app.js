(function(window){
    "use strict";
    
    jQuery.sap.declare('com.keas.bss.js.lib.bss.app');
    /*
    jQuery.sap.require("sap.ui.model.json.JSONModel");
    jQuery.sap.require("sap.ui.model.resource.ResourceModel");
    jQuery.sap.require("sap.ui.core.mvc.ViewType");*/
 
    var oAppModel, oResourceBundle, sBasePath, sBaseUrl, sResourceBundlePath, sAppRouterName;
 
    oAppModel           = null;
    oResourceBundle     = null;
    sBasePath           = window.location.pathname.replace(/\/[^\/]*\.?[^\/]*$/, '/');            // in this demo ==> /demo/sapui5/shell/ShellRouterDemo/
    sBaseUrl            = window.location.protocol + '//' + window.location.host + sBasePath;
    sResourceBundlePath = sBaseUrl + "i18n/messages.properties";
    sAppRouterName      = "bssAppRouter";
    
    window.app = {};
    
    app.init = function () {
        var oI18nModel, ui5core;
        
        ui5core = sap.ui.getCore();
        
        ui5core.attachInit(function() {
            //do the needful
            oAppModel = new sap.ui.model.json.JSONModel();
            ui5core.setModel(oAppModel, "appModel");
            
            //we could force a certain locale/language
            //oI18nModel = new sap.ui.model.resource.ResourceModel({bundleUrl:sResourceBundlePath, bundleLocale:"en"});
            //or we just let ui5 decide:
            //(HINT: this will cause a messages_de_DE.properties 404 (Not Found) in our setup for German browsers, but then messages_de.properties is found)
            oI18nModel = new sap.ui.model.resource.ResourceModel({bundleUrl:sResourceBundlePath});
            ui5core.setModel(oI18nModel, "i18n");
            oResourceBundle = oI18nModel.getResourceBundle();
            
            //this is the one and only JS View which will use in our application (all other views are XML Views) 
            var view = sap.ui.view({id:"shellMainView", viewName:"com.keas.bss.view.Main", type:sap.ui.core.mvc.ViewType.JS});
            view.placeAt("content");            
        });        
 
    };
 
    /**
     * Return the localized string for the given key
     * @param {string} key Key of the localization property
     * @param {Array=} args Array of strings containing the values to be used for replacing placeholders *optional*
     * @return {string} the corresponding translated text
     */
    app.i18n = function (key, args) {
        return oResourceBundle.getText(key, args);
    };
 
    app.getAppRouterName = function () {
        return sAppRouterName;
    };
 
    app.getAppRouter = function () {
        return sap.ui.core.routing.Router.getRouter(sAppRouterName);
    };
 
    app.getAppModel = function () {
        return oAppModel;
    };
 
    app.setShell = function (oShell) {
        app.oShell = oShell;
    };
 
    app.getShell = function () {
        return app.oShell;
    };
 
    app.getBaseUrl = function () {
        return sBaseUrl;
    };
    
    /**
     * Loads a stylesheet in case it has not been loaded yet. If the stylesheet has been loaded already, then nothing happens (no replacement).
     * This is a handy function which prevents some issues that can occur, especially in older browsers (IE7).
     * For replacement enabled inclusion please use jQuery.sap.includeStyleSheet(sUrl, sId);
     * @param {string} sUrl the application relative path to the css file
     * @param {string} id dom id of the css that shall be used. If not defined, then the dom id will be calculated from sUrl ("/" will be replaced with "-")
     */
    app.includeStyleSheet = function (sUrl, sId) {
        if (!sUrl) {
            return;
        }
        if (!sId){
            sId = sUrl.replace(/\//g, "-");
        }
        if (!document.getElementById(sId)){
            return jQuery.sap.includeStyleSheet(sUrl, sId);
        }
    };
    
    /**
     * Reload the current page and ignore browser cache
     */
    app.reload = function () {
        window.location.reload(true);
    };
 
    /**
     * Allows to change the language on the fly
     * @param {string} lang new language to be used application wide
     */
    app.setLang = function (lang) {
        var oModel, oCore, oConfig;
 
        oCore = sap.ui.getCore();
        oConfig = oCore.getConfiguration();
 
        if (oConfig.getLanguage() !== lang) {
            oConfig.setLanguage(lang);
 
            oModel = new sap.ui.model.resource.ResourceModel({
                bundleUrl : sResourceBundlePath,
                bundleLocale : lang});
            oCore.setModel(oModel, 'i18n');
            oResourceBundle = oModel.getResourceBundle();
        }
    };
 
})(window);