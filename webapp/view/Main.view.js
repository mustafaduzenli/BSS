//jQuery.sap.require("sap.ui.ux3.Shell");
jQuery.sap.require("sap.m.Shell");

sap.ui.jsview("com.keas.bss.view.Main", {

    /**
     * Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     */
    getControllerName: function() {
        return "com.keas.bss.controller.Main";
    },

    /**
     * Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     */
    createContent: function(oController) {
        var oRouter, oShell;

        //alert("nabisoft.modules.Main.view.js called");
        oShell = new sap.m.Shell({
            app : new sap.ui.core.ComponentContainer({
                name : "com.keas.bss.cc",
                height : "100%"
                })
            });
        /*
        oShell = new sap.ui.ux3.Shell("demoShell", {
            appTitle: "Shell Demo Application with Routing",
            appIcon: "images/SAPLogo.gif",
            appIconTooltip: "SAP logo",
            showLogoutButton: true,
            showSearchTool: true,
            showInspectorTool: true,
            showFeederTool: true,
            worksetItems: [
                new sap.ui.ux3.NavigationItem("WI_home", {
                    key: "wi_home",
                    text: "Home"
                }),
                new sap.ui.ux3.NavigationItem("WI_1", {
                    key: "wi_1",
                    text: "Sub Items",
                    subItems: [
                        new sap.ui.ux3.NavigationItem("WI_1_1", {
                            key: "wi_1_1",
                            text: "One"
                        }),
                        new sap.ui.ux3.NavigationItem("WI_1_2", {
                            key: "wi_1_2",
                            text: "Two"
                        }),
                        new sap.ui.ux3.NavigationItem("WI_1_3", {
                            key: "wi_1_3",
                            text: "Three"
                        })
                    ]
                }),
                new sap.ui.ux3.NavigationItem("WI_EXMPLS", {
                    key: "wi_exmpls",
                    text: "Examples"
                })
            ],
            paneBarItems: [
                new sap.ui.core.Item("PI_Date", {
                    key: "pi_date",
                    text: "{i18n>date}"
                }),
                new sap.ui.core.Item("PI_Browser", {
                    key: "pi_browser",
                    text: "{i18n>browser}"
                })
            ],
            //content: oTextHome,
            toolPopups: [new sap.ui.ux3.ToolPopup("contactTool", {
                title: "New Contact",
                tooltip: "Create New Contact",
                icon: "images/Contact_regular.png",
                iconHover: "images/Contact_hover.png",
                content: [new sap.ui.commons.TextView({
                    text: "Here could be a contact sheet."
                })],
                buttons: [new sap.ui.commons.Button("cancelContactButton", {
                    text: "Cancel",
                    press: function(oEvent) {
                        sap.ui.getCore().byId("contactTool").close();
                    }
                })]
            })],
            headerItems: [new sap.ui.commons.TextView({
                text: "{i18n>shell.headerItems.username}",
                tooltip: "{i18n>shell.headerItems.username}"
            }), new sap.ui.commons.Button({
                text: "{i18n>shell.headerItems.personalize}",
                tooltip: "{i18n>shell.headerItems.personalize}",
                press: function(oEvent) {
                    alert("Here you could open an personalize dialog");
                }
            }), new sap.ui.commons.MenuButton({
                text: "{i18n>shell.headerItems.help}",
                tooltip: "{i18n>shell.headerItems.help.tooltip}",
                menu: new sap.ui.commons.Menu("menu1", {
                    items: [new sap.ui.commons.MenuItem("menuitem1", {
                        text: "{i18n>shell.headerItems.help}"
                    }), new sap.ui.commons.MenuItem("menuitem2", {
                        text: "{i18n>shell.headerItems.help.reportIncident}"
                    }), new sap.ui.commons.MenuItem("menuitem3", {
                        text: "{i18n>shell.headerItems.help.about}"
                    })]
                })
            })],
            worksetItemSelected: function(oEvent) {
                var sSelectedId, oHashChanger;
                sSelectedId = oEvent.getParameter("id");
                oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
                oHashChanger.setHash(oRouter.getURL("_" + sSelectedId));
            },
            paneBarItemSelected: function(oEvent) {
                var sKey = oEvent.getParameter("key");
                var oShell = oEvent.oSource;
                switch (sKey) {
                    case "pi_date":
                        var oDate = new Date();
                        oShell.setPaneContent(new sap.ui.commons.TextView({
                            text: oDate.toLocaleString()
                        }), true);
                        break;
                    case "pi_browser":
                        oShell.setPaneContent(new sap.ui.commons.TextView({
                            text: "You browser provides the following information:\n" + navigator.userAgent
                        }), true);
                        break;
                    default:
                        break;
                }
            },
            logout: function() {
                alert(app.i18n('shell.headerItems.logout.pressedMessage'));
            },
            search: function(oEvent) {
                alert(app.i18n('shell.search.triggeredMessage', [oEvent.getParameter("text")]));
            },
            feedSubmit: function(oEvent) {
                alert(app.i18n('shell.feedSubmit', [oEvent.getParameter("text")]));
            },
            paneClosed: function(oEvent) {
                alert(app.i18n('shell.paneCLosed', [oEvent.getParameter("id")]));
            }
        });*/

        //ROUTING
        oRouter = new sap.ui.core.routing.Router([{
                pattern: [":?query:", "/:?query:"],
                name: "_WI_home",
                view: "com.keas.bss.view.Home",
                viewType: sap.ui.core.mvc.ViewType.XML,
                targetControl: "demoCC",
                targetAggregation: "content",
                clearTarget: true,
                callback: function(oRoute, oArguments) {
                    oShell.setSelectedWorksetItem("WI_home");
                }
            }, {
                pattern: ["examples:?query:"],
                name: "_WI_EXMPLS",
                view: "nabisoft.modules.Examples",
                viewType: sap.ui.core.mvc.ViewType.XML,
                targetControl: "demoShell",
                targetAggregation: "content",
                clearTarget: true,
                callback: function(oRoute, oArguments) {
                    oShell.setSelectedWorksetItem("WI_EXMPLS");
                }
            },
            /*{      //we will never get this here
                                pattern: "subitems/one",
                                name: "_WI_1",
                                view: "nabisoft.modules.subitems.One",
                                viewType: sap.ui.core.mvc.ViewType.XML,
                                targetControl: "demoShell",
                                targetAggregation: "content",
                                clearTarget: true,
                                callback: function(oRoute, oArguments) {
                                    oShell.setSelectedWorksetItem("WI_1_1");
                                }
                            },*/
            {
                pattern: ["subitems/one:?query:", "subitems:?query:"], //order is important
                name: "_WI_1_1",
                view: "nabisoft.modules.subitems.One",
                viewType: sap.ui.core.mvc.ViewType.XML,
                targetControl: "demoShell",
                targetAggregation: "content",
                clearTarget: true,
                callback: function(oRoute, oArguments) {
                    oShell.setSelectedWorksetItem("WI_1_1");
                }
            }, {
                pattern: "subitems/two:?query:",
                name: "_WI_1_2",
                view: "nabisoft.modules.subitems.Two",
                viewType: sap.ui.core.mvc.ViewType.XML,
                targetControl: "demoShell",
                targetAggregation: "content",
                clearTarget: true,
                callback: function(oRoute, oArguments) {
                    oShell.setSelectedWorksetItem("WI_1_2");
                }
            }, {
                pattern: "subitems/three:?query:",
                name: "_WI_1_3",
                view: "nabisoft.modules.subitems.Three",
                viewType: sap.ui.core.mvc.ViewType.XML,
                targetControl: "demoShell",
                targetAggregation: "content",
                clearTarget: true,
                callback: function(oRoute, oArguments) {
                    oShell.setSelectedWorksetItem("WI_1_3");
                }
            }
        ]);
        oRouter.initialize();

        return oShell;
    }

});