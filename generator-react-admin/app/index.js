/*!
 * core/0-base.js
 */
(function(b) {
    var a = jQuery.cleanData;
    b.cleanData = function(c) {
        for (var d = 0, e;
            (e = c[d]) !== undefined; d++) {
            b(e).triggerHandler("destroyed")
        }
        a(c)
    }
})(jQuery);
var root = this;
(function() {
    var a = window.console,
        b = function(e, d) {
            if (!Chanel.devMode && !Chanel.forceConsole) {
                return
            }
            try {
                a[e].apply(a, d)
            } catch (c) {
                if (a && a[e]) {
                    a[e](Array.prototype.slice.call(d))
                }
            }
        };
    Chanel = root.Chanel = {
        devMode: false,
        forceConsole: false,
        debug: function() {
            b("debug", arguments)
        },
        log: function() {
            b("log", arguments)
        },
        info: function() {
            b("info", arguments)
        },
        error: function() {
            b("error", arguments)
        },
        warn: function() {
            b("warn", arguments)
        }
    }
})();
/*!
 * core/1-Class.js
 */
(function() {
    var a = false;
    var c = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/ : /.*/;
    var b = function(f) {
        if (f instanceof Array) {
            var g = [];
            for (var e = 0; e < f.length; e++) {
                g[e] = b(f[e])
            }
            return g
        }
        if (typeof f == "object") {
            var g = {};
            for (var d in f) {
                if (f.hasOwnProperty(d)) {
                    g[d] = b(f[d])
                }
            }
            return g
        }
        return f
    };
    this.Class = function() {};
    Class.extend = function(i) {
        var h = this.prototype;
        this.id = undefined;
        this.name = "noname";
        a = true;
        var g = new this();
        a = false;

        function e(j) {
            if (i[j] === null) {
                return i[j]
            }
            if (i[j] instanceof Array) {
                return b(i[j])
            } else {
                if (typeof i[j] === "object") {
                    return $.extend({}, g[j] || {}, b(i[j]))
                }
            }
            return i[j]
        }
        for (var f in i) {
            if (_.has(i, f)) {
                g[f] = _.isFunction(i[f]) && _.isFunction(h[f]) && c.test(i[f]) ? (function(j, k) {
                    return function() {
                        var m = this._super;
                        this._super = h[j];
                        var l = k.apply(this, arguments);
                        this._super = m;
                        return l
                    }
                })(f, i[f]) : _.isFunction(i[f]) ? i[f] : e(f)
            }
        }

        function d() {
            if (!(this instanceof d)) {
                throw "Remember to use new on constructors!"
            }
            if (!a && this.init) {
                this.init.apply(this, arguments)
            }
        }
        d.prototype = g;
        d.prototype.constructor = d;
        d.extend = arguments.callee;
        return d
    }
})();
/*!
 * core/2-ComponentRegistry.js
 */
(function() {
    var a = Class.extend({
        _componentsToAutoRegister: [],
        init: function() {
            if (Chanel.Registry) {
                throw "ComponentRegistry already instantiated ! Keep it as singleton !"
            }
            Chanel.registeredComponent = {}
        },
        register: function(c, b) {
            if (c instanceof Chanel.AbstractComponent) {
                if (!this.isRegistered(c, b)) {
                    this[c.id] = c;
                    $(c.elmt).data("componentId", c.id)
                } else {
                    throw "There is already a registered component on this element!"
                }
            }
        },
        launchAutoRegister: function(d, b) {
            if (d) {
                this.addAutoRegisterFor(d)
            }
            if (!b) {
                b = document
            }
            if (this._componentsToAutoRegister.length > 0) {
                var e = this;
                var c = $(b);
                c.find("[data-component]").add(c.filter("[data-component]")).each(function() {
                    var f = $(this).data("component");
                    var h = $(this).attr("data-component-options");
                    try {
                        h = typeof h == "string" && /^\{/.test(h) ? (new Function("return " + h))() : h
                    } catch (g) {}
                    if (Chanel[f] && _.indexOf(e._componentsToAutoRegister, f) != -1) {
                        if (Chanel.registeredComponent[f] === undefined) {
                            Chanel.registeredComponent[f] = {};
                            Chanel.registeredComponent[f].count = 1
                        } else {
                            Chanel.registeredComponent[f].count += 1
                        }
                        e.register(new Chanel[f](this, h))
                    }
                })
            }
        },
        addAutoRegisterFor: function(b) {
            this._componentsToAutoRegister = _.chain(this._componentsToAutoRegister).union(b).uniq().value()
        },
        removeAutoRegisterFor: function(b) {
            this._componentsToAutoRegister = _.without(this._componentsToAutoRegister, b)
        },
        unregister: function(c) {
            var b = this[c];
            if (_.isObject(b) && _.has(b, "elmt")) {
                $(b.elmt).removeData("componentId")
            }
            delete this[c]
        },
        getBySelector: function(b) {
            var c = $(b).data("componentId");
            return this.getById(c)
        },
        getById: function(b) {
            if (_.isString(b) && _.has(this, b)) {
                return this[b]
            }
        },
        isRegistered: function(c, b) {
            var d = $(c.elmt).data("componentId");
            if (this._isRegisteredForAnotherElmt(c)) {
                this.unregister(c.id)
            }
            if (b) {
                this.getById(d).destroy(true);
                return false
            } else {
                return _.isObject(this.getById(d))
            }
        },
        _isRegisteredForAnotherElmt: function(b) {
            return _.has(this, b.id) && $('[data-component-id="' + b.id + '"]') != $(b.elmt)
        }
    });
    Chanel.Registry = new a()
})();
/*!
 * core/3-AbstractComponent.js
 */
Chanel.AbstractComponent = Class.extend({
    name: "AbstractComponent",
    elmt: undefined,
    options: undefined,
    _defaultOptions: {
        resizable: false,
        resizeEvent: "resize",
        additionalResizeEvent: ""
    },
    transEndEvents: {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend"
    },
    init: function(b, a) {
        this.id = _.uniqueId(this.name);
        this.elmt = $(b);
        this.options = a || {};
        _.defaults(this.options, this._defaultOptions);
        Chanel.Registry.register(this);
        $(this.elmt).on("destroyed", this, $.proxy(this.onRemoveElement, this));
        if (this.options.resizable) {
            $(window).on(this.options.resizeEvent + " " + this.options.additionalResizeEvent, $.proxy(this.onResize, this))
        }
    },
    onRemoveElement: function(a) {
        if (a.data instanceof Chanel.AbstractComponent) {
            a.data.destroy()
        }
    },
    onResize: function() {
        throw new Error("Override this function to have resizable components")
    },
    destroy: function(a) {
        Chanel.Registry.unregister(this.id);
        if (this.elmt && !a) {
            this.elmt.off()
        }
        this.elmt = undefined
    },
    setOption: function(a, b) {
        if (_.isObject(a) || a == null) {
            var c = this;
            _.each(a, function(d, e) {
                c.options[e] = d
            })
        } else {
            this.options[a] = b
        }
    },
    getOption: function(a) {
        return this.options[a]
    },
    removeOption: function(a) {
        if (_.has(this._defaultOptions, a)) {
            this.options[a] = this._defaultOptions[a]
        } else {
            if (_.has(this.options, a)) {
                delete this.options[a]
            } else {
                throw new Error("option does not exist for key " + a)
            }
        }
    }
});
/*!
 * web/component/form.js
 */
Chanel.Form = Chanel.AbstractComponent.extend({
    name: "Form",
    _defaultOptions: {
        checkedClass: "checked",
        uniformLabelWidth: true,
        submitMethod: "static",
        autoSubmit: false,
        validate: true
    },
    _errorMessage: {
        "1x01": " 1x01 -> method: callback is not a function"
    },
    init: function(b, a) {
        this._super(b, a);
        this._setElements();
        this._setEvents();
        this.onError = false;
        this._onInit()
    },
    _setElements: function() {
        this.elms = {
            labels: this.elmt.find("label"),
            checkableElement: this.elmt.find('input[type="radio"], input[type="checkbox"]'),
            requiredElement: this.elmt.find("input.required, select.required, textarea.required"),
            emailElement: this.elmt.find("input.email")
        }
    },
    _setEvents: function() {
        this.elms.checkableElement.bind("change.Form", $.proxy(this._checkableElementChangeHandler, this));
        this.elmt.bind("submit." + this.name, $.proxy(this._onSubmit, this))
    },
    _onInit: function() {
        this.elms.checkableElement.each($.proxy(function(a, b) {
            b = $(b);
            this._actualiseCheckableElement(b)
        }, this));
        if (this.options.autoSubmit) {
            this.elmt.trigger("submit." + this.name)
        }
    },
    _checkableElementChangeHandler: function(a) {
        this._actualiseCheckableElement($(a.currentTarget))
    },
    _actualiseCheckableElement: function(a) {
        if (a.is(":checked")) {
            if (a.is('[type="radio"]')) {
                a.parent().parent().find(".checked").removeClass("checked")
            }
            a.parent().addClass(this.options.checkedClass)
        } else {
            a.parent().removeClass(this.options.checkedClass)
        }
    },
    _onSubmit: function(a) {
        if (this.options.validate) {
            this._loopOnElements();
            if (this.onError) {
                a.preventDefault();
                this.onError = false;
                return false
            }
        }
        if (this.options.submitMethod == "ajax") {
            a.preventDefault();
            $.ajax({
                url: this.elmt.attr("action"),
                data: this.elmt.serialize(),
                type: "POST",
                context: this
            }).done($.proxy(function() {}, this)).fail($.proxy(function() {}, this))
        }
    },
    _loopOnElements: function() {
        this.elms.requiredElement.each($.proxy(function(a, b) {
            if ($(b).val() == "") {
                this.onError = true;
                $(b).parent().addClass("frm_blank_field")
            } else {
                $(b).parent().removeClass("frm_blank_field")
            }
        }, this));
        this.elms.emailElement.each($.proxy(function(a, b) {
            if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi.test($(b).val())) {
                this.onError = true;
                $(b).parent().addClass("frm_blank_field")
            } else {
                $(b).parent().removeClass("frm_blank_field")
            }
        }, this))
    }
});
/*!
 * web/component/HeaderFlowManager.js
 */
Chanel.HeaderFlowManager = Chanel.AbstractComponent.extend({
    name: "HeaderFlowManager",
    _defaultOptions: {
        resizable: true,
        reflowedClass: "reflowed",
        gutter: 20
    },
    init: function(b, a) {
        this._super(b, a);
        this.activeSize = window.Chanel.size.actualSize;
        this._setElements();
        this.brandSize = this.elms.brand.width();
        this.navSize = this.elms.nav.width();
        this.resizeHandler()
    },
    _setElements: function() {
        this.elms = {};
        this.elms.brand = this.elmt.find(".siteName");
        this.elms.nav = this.elmt.find("nav")
    },
    onResize: function() {
        if (this.activeSize != window.Chanel.size.actualSize) {
            this.activeSize = window.Chanel.size.actualSize;
            if (this.isReflowed) {
                this.elmt.removeClass(this.options.reflowedClass)
            }
            this.brandSize = this.elms.brand.width();
            this.navSize = this.elms.nav.width();
            if (this.isReflowed) {
                this.elmt.addClass(this.options.reflowedClass)
            }
        }
        this.resizeHandler()
    },
    resizeHandler: function() {
        if (this.elmt.width() - this.options.gutter < this.brandSize + this.navSize) {
            this.elmt.addClass(this.options.reflowedClass);
            this.isReflowed = true
        } else {
            this.elmt.removeClass(this.options.reflowedClass);
            this.isReflowed = false
        }
    }
});
/*!
 * web/component/Popin.js
 */
Chanel.Popin = Chanel.AbstractComponent.extend({
    name: "Popin",
    _defaultOptions: {
        resizable: true,
        selectorToInsertContent: "#main",
        templateName: "base",
        selectorForInnerCloseElement: ".backBtn",
        autoOpen: false,
        fogAction: true,
        lock: false,
        activeClass: "current_page_item",
        scrollableAreaSelector: ".modalMain",
        scrollIndicator: true,
        scrollIndicatorClass: "scrollIndicator"
    },
    template: {
        base: '<div class="modal" id="{{id}}"><div class="modalInner" data-component="ScrollAssistant"><a href="{{homeurl}}" class="modalClose"></a><div class="modalMain">{{ctn}}</div></div></div> ',
        fixed: '<div class="modal" id="{{id}}"><div class="modalInner" data-component="ScrollAssistant"><a href="{{homeurl}}" class="modalClose"></a><div class="modalMain">{{ctn}}</div></div></div> ',
        fromBottomToTop: '<div class="modalFromBottomToTop" id="{{id}}"><div class="modalInner" data-component="ScrollAssistant"><a href="{{homeurl}}" class="modalClose">Fermer</a><h1 class="brand"><a href="#" target="_blank"><img src="#" alt="CHANEL"/></a></h1><div class="modalMain">{{ctn}}</div></div></div> '
    },
    _opened: [],
    _errorMessage: {
        "1x01": " 1x01 : _getContent: callback is not a function",
        "1x02": " 1x02 : _getContent: This ancor doesn't match to an id selector, please check your href attribute",
        "1x03": " 1x03 : _getContent: href attribute doesn't match anything, please check it"
    },
    init: function(b, a) {
        if (!window.popinReady) {
            window.popinReady = 0
        }
        this.contentGetMethod = null;
        this._super(b, a);
        this.oneOpenedIsLocked = false;
        this.contentAlreadyInjected = false;
        this._getContent($.proxy(this._onContentReady, this))
    },
    _getContent: function(c) {
        var a = this.elmt.attr("href");
        if (/^#/.test(a)) {
            this.contentGetMethod = "local";
            a = "#" + a.split("#")[1];
            if (a && $(a).length) {
                if (typeof c == "function") {
                    var b = $("<div></div>").append($(a)).find(".futurModalContent");
                    return c(b)
                } else {
                    throw new Error(this.id + this._errorMessage["1x01"])
                }
            } else {
                throw new Error(this.id + this._errorMessage["1x02"])
            }
        } else {
            if (/^.+/.test(a)) {
                this.contentGetMethod = "ajax";
                $.ajax({
                    url: a,
                    dataType: "html",
                    data: "ajax=true"
                }).done(function(e) {
                    e = $("<div></div>").append(e);
                    var f = e.find(".futurModalContent"),
                        d = e.find("script").toArray();
                    f.remove("script");
                    return c(f, d)
                })
            } else {
                throw new Error(this.id + this._errorMessage["1x03"])
            }
        }
    },
    _onContentReady: function(b, a) {
        this._setElements(b);
        this._addModalLayer();
        this._rePlaceContentInDom();
        if (a && a.length > 0) {
            this.scripts = a;
            this._injectScripts(0)
        } else {
            this._onScriptsLoaded()
        }
    },
    _injectScripts: function(b) {
        if (b == undefined || b > this.scripts.length - 1) {
            return this._onScriptsLoaded()
        }
        var a = $(this.scripts[b]);
        if (a.attr("src")) {
            Chanel.include(a.attr("src"), $.proxy(this._injectScripts, this, b + 1))
        } else {
            if ($(this.scripts[b]).has("[id]")) {
                if (!$("#" + a.attr("id")).length) {
                    $(this.scripts[b]).appendTo("body")
                }
                this._injectScripts(b + 1)
            }
        }
    },
    _onScriptsLoaded: function() {
        this.positioned = false;
        this._placeModal();
        this._setEvents();
        if (this.options.autoOpen) {
            this.open()
        }
        if (this.modal.find(".upmm")) {
            this.hasGmap = true;
            this.gMap = this.modal.find(".upmm");
            this.needGmapRefresh = true
        }
        if (!this.contentAlreadyInjected) {
            if (this.contentGetMethod == "ajax") {
                Chanel.Registry.launchAutoRegister(null, this.modal)
            }
            $("body").trigger("DOMInjected", this.modal)
        }
        window.popinReady++;
        this.checkScroll();
        if (Chanel.registeredComponent[this.name].count == window.popinReady) {
            $("body").trigger("ALL_POPIN_READY")
        }
    },
    checkHeight: function() {
        var g = this;
        var h = g.modal;
        var b = $(".modalMain", h);
        var d = $(".rteContent", h);
        var l = $(".brand", h).outerHeight(true);
        var c = d.children();
        var a = 60;
        var f = 0;
        var k = parseInt($(".image_container img", h).attr("height"));
        var j = parseInt($(".image_container img", h).attr("width"));
        var i = k / j;
        var e;
        if (window.Chanel.size.actualSize == "small") {
            e = $(b).width() * i
        } else {
            if (window.Chanel.size.actualSize == "tablet") {
                e = k * i * 0.5
            } else {
                e = k * i
            }
        }
        c.each(function(m, n) {
            f += $(this).outerHeight(true)
        });
        if (window.Chanel.size.actualSize == "small") {
            d.height(f + a + e)
        } else {
            if (f > e) {
                d.height(f + a)
            } else {
                d.height(e + a)
            }
        }
    },
    checkScroll: function() {
        if (!this.options.scrollIndicator) {
            return
        }
        var a = this.modal.find(this.options.scrollableAreaSelector);
        if (!a.length) {
            return
        }
        var b = a[0].scrollHeight > a.height();
        if (b) {
            if (!$("." + this.options.scrollIndicatorClass).length) {
                a.append('<div class="' + this.options.scrollIndicatorClass + '"></div>')
            }
        }
    },
    _setElements: function(a) {
        if (a) {
            if (!$("#" + a.attr("id")).length) {
                this.modal = $(_.template(this.template[this.options.templateName], {
                    ctn: a.html(),
                    id: a.attr("id")
                }))
            } else {
                this.contentAlreadyInjected = true;
                this.modal = $("#" + a.attr("id"))
            }
            this.markupID = a.attr("id")
        } else {
            this.modal = $('<div><div class="modalInner"></div></div>')
        }
        this.modalInner = this.modal.find(".modalInner");
        this.insideCloseButton = this.modal.find(".modalClose");
        this.innerCloseButton = this.modal.find(this.options.selectorForInnerCloseElement)
    },
    _setEvents: function() {
        this.elmt.bind("click", $.proxy(this.onClickHandler, this));
        this.insideCloseButton.bind("click", $.proxy(this.onInsideCloseButtonClickHandler, this));
        if (this.options.fogAction) {
            this.innerCloseButton.bind("click", $.proxy(this.onInsideCloseButtonClickHandler, this))
        }
    },
    _addFogEvent: function() {
        if (this.options.fogAction) {
            this.modalLayer.bind("click.popin", $.proxy(this.onInsideCloseButtonClickHandler, this));
            this.modal.bind("click.popin", $.proxy(this.onInsideCloseButtonClickHandler, this));
            this.modalInner.bind("click.popin", function(a) {
                a.stopImmediatePropagation()
            })
        }
    },
    _removeFogEvent: function() {
        this.modalLayer.unbind("click.popin");
        this.modal.unbind("click.popin");
        this.modalInner.unbind("click.popin")
    },
    _rePlaceContentInDom: function() {
        var a = this.options.selectorToInsertContent;
        if (a.indexOf("before-") != -1) {
            $(this.modal).insertBefore($(a.substring(7, a.length)))
        } else {
            this.modal.appendTo(this.options.selectorToInsertContent)
        }
    },
    _addModalLayer: function() {
        if (!$(this.options.selectorToInsertContent).find(".modalLayer").length) {
            this.modalLayer = $('<div class="modalLayer"></div>');
            this.modalLayer.appendTo(this.options.selectorToInsertContent)
        } else {
            this.modalLayer = $(this.options.selectorToInsertContent).find(".modalLayer")
        }
    },
    _placeModal: function() {
        this.modal.addClass("showForInit");
        if (window.Chanel.size.actualSize == "small") {
            this.modal.css("height", "auto")
        } else {
            if ($(this.options.selectorToInsertContent).height() < this.modal.height()) {
                this.modal.css("height", $(this.options.selectorToInsertContent).height() - 20)
            } else {
                this.modal.css("height", this.modal[0].offsetHeight + 5)
            }
        }
        this.modal.css({
            marginTop: -parseInt(this.modal.height() / 2) + $("header").height() - 10
        }).removeClass("showForInit");
        this.positioned = true
    },
    hide: function() {
        var a = this;
        this.isOpen = false;
        _.without(this._opened, this);
        this._removeFogEvent();
        if (this.modal.hasClass("modalFromBottomToTop")) {
            setTimeout(function() {
                a.modal.removeClass("show")
            }, 100)
        } else {
            this.modal.removeClass("show")
        }
        if (Modernizr.csstransitions) {
            this.modalLayer.addClass("performingAnimation");
            this.modalLayer.bind(this.transEndEvents[Modernizr.prefixed("transition")], $.proxy(function() {
                this.modalLayer.removeClass("performingAnimation").unbind(this.transEndEvents[Modernizr.prefixed("transition")])
            }, this));
            this.modal.addClass("performingAnimation");
            this.modal.bind(this.transEndEvents[Modernizr.prefixed("transition")], $.proxy(function() {
                this.modal.removeClass("performingAnimation").unbind(this.transEndEvents[Modernizr.prefixed("transition")])
            }, this))
        }
        this.modalLayer.removeClass("show")
    },
    close: function(a) {
        if (window.popinPage && !a) {
            window.location.href = this.insideCloseButton.attr("href")
        } else {
            this.hide();
            $("body").trigger("modalIsClose", [this.elmt, this.modal]);
            if (this.modal.hasClass("modalFromBottomToTop")) {
                this.modal.css({
                    display: "none"
                })
            }
        }
    },
    open: function() {
        var a = this;
        this.closeOther();
        this.isOpen = true;
        this._opened.push(this);
        if (this.modal.hasClass("modalFromBottomToTop")) {
            this.modal.css({
                display: "block"
            })
        }
        this._addFogEvent();
        if (!this.positioned) {
            this._placeModal()
        }
        this.modalLayer.addClass("show");
        if (this.modal.hasClass("modalFromBottomToTop")) {
            setTimeout(function() {
                a.modal.addClass("show")
            }, 100)
        } else {
            this.modal.addClass("show")
        }
        $("body").trigger("modalIsOpen", [this.elmt, this.modal]);
        $("body").trigger("tagFromString", ["riteOnSendByMailPopinOpen"]);
        if (this.options.templateName != null && this.options.templateName === "fromBottomToTop") {
            $(a.modal).find(".brand img").attr("src", $("footer .brand img").attr("src"))
        }
        if (this.gMap && this.gMap.length && this.needGmapRefresh) {
            this.needGmapRefresh = false;
            $("body").trigger("refreshMap", [this.gMap])
        }
        this._launchStat();
        setTimeout($.proxy(function() {
            if (this.modal.hasClass("modalFromBottomToTop")) {
                this.checkHeight()
            }
            this.modal.css("zoom", 1)
        }, this), 1000)
    },
    closeOther: function() {
        _.each(this._opened, $.proxy(function(a) {
            if (a.close) {
                a.close(true)
            }
        }, this))
    },
    isOneLockPopin: function() {
        var a = false;
        _.each(this._opened, function(b) {
            if (b.options.lock) {
                a = true
            }
        });
        return a
    },
    onClickHandler: function(a) {
        a.preventDefault();
        if (Modernizr.touch) {
            $("nav").addClass("forceClose")
        }
        this.open()
    },
    onInsideCloseButtonClickHandler: function(a) {
        a.preventDefault();
        this.close()
    },
    _launchStat: function() {
        if (window.Chanel.popinWebtrendsFunctions && window.Chanel.popinWebtrendsFunctions[this.markupID] && typeof window.Chanel.popinWebtrendsFunctions[this.markupID] == "function") {
            window.Chanel.popinWebtrendsFunctions[this.markupID]()
        }
    },
    onResize: function() {
        this.positioned = false;
        this.checkHeight()
    }
});
/*!
 * core/component/Popup.js
 */
Chanel.Popup = Chanel.AbstractComponent.extend({
    name: "Popup",
    _defaultOptions: {},
    init: function(b, a) {
        this._super(b, a);
        this.bindEvents()
    },
    bindEvents: function() {
        var a = this;
        this.elmt.on("click", function(b) {
            a.showPopup(b)
        })
    },
    showPopup: function(h) {
        h.preventDefault();
        var d = this.elmt[0],
            c = d.getAttribute("href"),
            a = parseInt(d.getAttribute("data-popup-width")),
            i = parseInt(d.getAttribute("data-popup-height")),
            g = parseInt((screen.availWidth / 2) - (a / 2)),
            f = parseInt((screen.availHeight / 2) - (i / 2)),
            b = window.open(c, "", config = "width=" + a + ", height=" + i + ", top=" + f + ", left=" + g + ", toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no");
        b.moveTo(g, f)
    }
});
/*!
 * web/component/HeaderFlowManager.js
 */
Chanel.OAMRenderer = Chanel.AbstractComponent.extend({
    name: "OAMRenderer",
    _defaultOptions: {
        resizable: true,
        iframeTpl: '<iframe src="{{path}}" width="{{width}}" height="{{height}}" scrolling="no"></iframe>'
    },
    init: function(b, a) {
        this._super(b, a);
        this.activeSize = window.Chanel.size.actualSize;
        this.currentPathOnIframe = null;
        if (Modernizr.ios) {
            this.size = "small"
        } else {
            this.size = this.activeSize
        }
        this._initAnimation();
        this._setIframeSize();
        $("body").on("contentResize", $.proxy(this._setIframeSize, this))
    },
    _initAnimation: function() {
        if (!window.oamjs || (!(window.oamjs || {}).length)) {
            return true
        }
        this.animationGroup = window.oamjs[0];
        this._makeAnimation()
    },
    _makeAnimation: function() {
        if ($("body").hasClass("ie8") || Modernizr.oldandroid) {
            $("#main").css({
                "background-image": "url(" + this.animationGroup[this.size].poster + ")"
            })
        } else {
            if ($("body").hasClass("ie7")) {
                $("#main .iframeCtn").css({
                    background: "url(" + this.animationGroup[this.size].poster + ") no-repeat center center"
                })
            } else {
                this.currentPathOnIframe = this.animationGroup[this.size].path;
                if (this.animationGroup[this.size].id.length > 0) {
                    this.animation = $(_.template(this.options.iframeTpl, this.animationGroup[this.size]));
                    this.elmt.append(this.animation)
                }
            }
        }
    },
    _switchAnimation: function() {
        this.elmt.find("iframe").remove();
        this._makeAnimation()
    },
    onResize: function() {
        if (this.activeSize != window.Chanel.size.actualSize) {
            this.activeSize = window.Chanel.size.actualSize;
            if (Modernizr.ios) {
                this.size = "small"
            } else {
                this.size = this.activeSize
            }
            if (this.animationGroup != undefined) {
                if (this.currentPathOnIframe != this.animationGroup[this.size].path) {
                    this._switchAnimation()
                }
            }
        }
        this._setIframeSize()
    },
    _setIframeSize: function() {
        this.elmt.find("iframe").attr("height", this.elmt.height())
    }
});
/*!
 * web/component/ResizeManager.js
 */
Chanel.ResizeManager = Chanel.AbstractComponent.extend({
    name: "ResizeManager",
    _defaultOptions: {
        resizable: true
    },
    _errorMessage: {
        "0x01": " ResizeManager E01 : init: error exemple"
    },
    init: function(b, a) {
        this._super(b, a);
        window.Chanel.size = {
            actualSize: "none"
        };
        if (!Modernizr.generatedcontent) {
            $("#main").height($("#main").height());
            $("#content").after('<span class="after">&nbsp;</span>')
        }
        this._setElements();
        this._setEvents();
        this.onResize();
        if (Modernizr.mobileios) {
            window.addEventListener("orientationchange", $.proxy(this.onResize, this));
            window.scrollTo(0, 1)
        }
    },
    _setElements: function() {
        this.elms = {
            main: this.elmt.find("#main"),
            header: this.elmt.find("header")
        };
        this._setElementsToResize()
    },
    _setIOSHeight: function() {
        $("body").css({
            position: "absolute",
            left: 0,
            right: 0
        });
        $("body").height(window.innerHeight + 60)
    },
    onResize: function() {
        this._defineSize();
        this._loopOnElements()
    },
    _setElementsToResize: function() {
        this.elmsToResize = [{
            el: $("body"),
            method: "bodyHandler",
            resetMethod: "resetBodyHandler"
        }, {
            el: this.elmt.find("#main"),
            method: "mainHandler",
            resetMethod: "resetMainHandler"
        }, {
            el: this.elmt.find("#content"),
            method: "contentHandler",
            resetMethod: "resetContentHandler"
        }]
    },
    _refreshElements: function() {
        this._setElementsToResize()
    },
    _setEvents: function() {
        $(document).ready($.proxy(this._loopOnElements, this))
    },
    _loopOnElements: function() {
        for (var a = 0; a < this.elmsToResize.length; a++) {
            if (this.elmsToResize[a].el.length) {
                this[this.elmsToResize[a].resetMethod](this.elmsToResize[a].el);
                this[this.elmsToResize[a].method](this.elmsToResize[a].el)
            }
        }
    },
    mainHandler: function(a) {
        if (window.Chanel.size.actualSize === "small") {
            a.css("top", $("body > header").height())
        }
    },
    resetMainHandler: function(a) {
        a.css("top", 0)
    },
    contentHandler: function(a) {
        if (a.height() > this.elms.main.height()) {
            a.css({
                "-webkit-overflow-scrolling": "auto"
            });
            a.height(this.elms.main.height());
            a.css({
                "-webkit-overflow-scrolling": "touch"
            });
            $("body").trigger("contentResize", [a])
        }
    },
    resetContentHandler: function(a) {
        a.height("")
    },
    bodyHandler: function() {
        if (Modernizr.mobileios) {
            var a = 0;
            $("body").css({
                position: "absolute",
                left: 0,
                right: 0
            });
            if (parseInt(window.orientation, 10) == 90) {
                if (window.screen.availWidth != window.innerHeight) {
                    a = 48
                }
                $("body").height(window.screen.availWidth - a)
            } else {
                a = 43;
                $("body").height(window.screen.availHeight - 43)
            }
            a = 0
        }
    },
    resetBodyHandler: function() {
        if (Modernizr.mobileios) {
            $("body").height("")
        }
    },
    _defineSize: function() {
        switch (true) {
            case $(window).width() < 800:
                window.Chanel.size.actualSize = "small";
                break;
            case $(window).width() >= 800 && $(window).width() <= 1024:
                window.Chanel.size.actualSize = "tablet";
                break;
            case $(window).width() >= 1440:
                window.Chanel.size.actualSize = "xlarge";
                break;
            default:
                window.Chanel.size.actualSize = "normal";
                break
        }
    }
});
Chanel.ScrollAssistant = Chanel.AbstractComponent.extend({
    name: "ScrollAssistant",
    _defaultOptions: {},
    _errorMessage: {
        "1x01": " 1x01 -> method: callback is not a function"
    },
    init: function(b, a) {
        this._super(b, a);
        this._setEvents()
    },
    _setEvents: function() {
        $("body").bind("contentResize", $.proxy(this._swipeLauncher, this))
    },
    _swipeLauncher: function() {
        if (Modernizr.oldandroid) {
            this.elmt.swipe({
                threshold: 0,
                excludedElements: "excluded",
                swipeStatus: $.proxy(this._swipeStatus, this),
                allowPageScroll: "vertical"
            })
        }
    },
    _swipeStatus: function(b, a, c, d) {
        switch (a) {
            case "start":
                break;
            case "move":
                this.doScroll(b, a, c, d);
                break;
            case "cancel":
                break
        }
    },
    doScroll: function(b, a, c, d) {
        if (c == "up") {
            this.elmt.scrollTop(this.elmt.scrollTop() - d * -1)
        } else {
            if (c == "down") {
                this.elmt.scrollTop(this.elmt.scrollTop() - d * +1)
            }
        }
    }
});
/*!
 * core/component/ShareSocialNetworks.js
 */
Chanel.ShareSocialNetworks = Chanel.AbstractComponent.extend({
    name: "ShareSocialNetworks",
    _defaultOptions: {
        locale: undefined,
        title: undefined,
        content: undefined,
        img: undefined,
        url: undefined
    },
    init: function(b, a) {
        this._super(b, a);
        if (typeof this.options.url === "undefined") {
            this.options.url = document.location.href
        }
        this.bindEvents()
    },
    bindEvents: function() {
        this.elmt.on("click", $.proxy(this.clickSocialNetworkHandler, this))
    },
    clickSocialNetworkHandler: function(a) {
        if (a && a.preventDefault) {
            a.preventDefault()
        }
        this.goToUrl(this.options.network)
    },
    goToUrl: function(a) {
        window.open(this.getLink(a))
    },
    getAbsolute: function(c) {
        var b = document.createElement("a");
        b.href = c;
        return b.href
    },
    getLink: function(a) {
        return "https://secure.chanel.com/global-service/backend/share/" + a + "/" + this.options.locale + "/1?" + this.getLinkParamaters()
    },
    getLinkParamaters: function() {
        var a = {
            url: this.options.url,
            title: this.options.title,
            content: this.options.content,
            img: this.options.img,
            WT_sn_id: "share",
            WT_sn_websiteName: "popupstore",
            WT_sn_contentName: "",
            WT_sn_sense: "2"
        };
        if (!a.img && window.oamjs && window.oamjs.length) {
            a.img = window.oamjs[0].normal.poster
        }
        return $.param(a)
    }
});
/*!
 * web/component/HeaderFlowManager.js
 */
Chanel.FirstNavManager = Chanel.AbstractComponent.extend({
    name: "FirstNavManager",
    _defaultOptions: {
        resizable: true
    },
    menuHeight: 0,
    heightTitre: 0,
    heightFooter: 0,
    maxMenuHeight: 0,
    navWidth: 0,
    navRightMarge: 0,
    links: [],
    open: false,
    pointsTpl: '<span class="points">...</span>',
    init: function(b, a) {
        this._super(b, a);
        this.links = this.elmt.find("a");
        this.bindEvents()
    },
    setSizeElems: function() {
        this.heightTitre = $("header").height();
        this.heightFooter = $("footer").height() + 6;
        this.maxMenuHeight = $(window).height() - this.heightTitre - this.heightFooter;
        this.navWidth = $(window).width() - $("header nav").position().left;
        this.navRightMarge = parseFloat($("header nav").css("right").split("px")[0])
    },
    bindEvents: function() {
        var a = this;
        $.each(this.links, function(b, c) {
            if (b != 0) {
                $(c).bind("click", function(d) {
                    if (window.Chanel.size.actualSize === "small") {
                        a.closeMenu(200)
                    }
                })
            }
        });
        $("body").on("modalIsOpen", function(b) {
            if (window.Chanel.size.actualSize === "small") {
                a.hideMenu()
            }
        });
        $("body").on("modalIsClose", function(b) {
            if (window.Chanel.size.actualSize === "small") {
                a.showMenu()
            }
        });
        this.elmt.find("a").eq(0).bind("click", function(b) {
            if (window.Chanel.size.actualSize === "small") {
                a.setSizeElems();
                a.manageMenu(b)
            }
        })
    },
    manageMenu: function(a) {
        if (this.open) {
            this.closeMenu(200)
        } else {
            this.openMenu(300);
            this.setPoints()
        }
    },
    openMenu: function(a) {
        var b = this;
        this.open = true;
        this.elmt.addClass("openMenu");
        if (this.menuHeight === 0) {
            this.menuHeight = this.elmt.height()
        }
        this.elmt.css("max-height", this.maxMenuHeight);
        if (a != 0) {
            this.elmt.height(28);
            this.elmt.animate({
                height: this.menuHeight
            }, a)
        } else {
            this.elmt.height(this.menuHeight)
        }
    },
    closeMenu: function(a) {
        var b = this;
        this.open = false;
        if (a != 0) {
            this.elmt.animate({
                height: 28
            }, a, function() {
                b.elmt.removeClass("openMenu");
                b.elmt.height("auto")
            })
        } else {
            this.elmt.removeClass("openMenu");
            this.elmt.height("auto")
        }
    },
    setPoints: function() {
        var b = this,
            a;
        $.each(this.links, function(c, d) {
            d = $(d);
            d.find(".points").remove();
            a = $(b.pointsTpl);
            if (d.innerWidth() + d.position().left > b.navWidth) {
                a.css("right", d.innerWidth() - b.navWidth + d.position().left + b.navRightMarge - 2);
                d.append(a)
            }
        })
    },
    hideMenu: function() {
        this.elmt.hide()
    },
    showMenu: function() {
        this.elmt.show()
    },
    onResize: function() {
        if (this.open) {
            this.setSizeElems()
        }
        if (this.open && window.Chanel.size.actualSize === "small") {
            this.openMenu(0);
            this.setPoints()
        } else {
            if (this.open && window.Chanel.size.actualSize !== "small") {
                this.closeMenu(0)
            }
        }
    }
});
getVersion = function() {
    return "trunk"
};
getRevision = function() {
    return "77005"
};
/*! jQuery UI - v1.10.2 - 2013-04-08
 * http://jqueryui.com
 * Includes: jquery.ui.widget.js
 * Copyright 2013 jQuery Foundation and other contributors Licensed MIT */
(function(b, e) {
    var a = 0,
        d = Array.prototype.slice,
        c = b.cleanData;
    b.cleanData = function(f) {
        for (var g = 0, h;
            (h = f[g]) != null; g++) {
            try {
                b(h).triggerHandler("remove")
            } catch (j) {}
        }
        c(f)
    };
    b.widget = function(f, g, n) {
        var k, l, i, m, h = {},
            j = f.split(".")[0];
        f = f.split(".")[1];
        k = j + "-" + f;
        if (!n) {
            n = g;
            g = b.Widget
        }
        b.expr[":"][k.toLowerCase()] = function(o) {
            return !!b.data(o, k)
        };
        b[j] = b[j] || {};
        l = b[j][f];
        i = b[j][f] = function(o, p) {
            if (!this._createWidget) {
                return new i(o, p)
            }
            if (arguments.length) {
                this._createWidget(o, p)
            }
        };
        b.extend(i, l, {
            version: n.version,
            _proto: b.extend({}, n),
            _childConstructors: []
        });
        m = new g();
        m.options = b.widget.extend({}, m.options);
        b.each(n, function(p, o) {
            if (!b.isFunction(o)) {
                h[p] = o;
                return
            }
            h[p] = (function() {
                var q = function() {
                        return g.prototype[p].apply(this, arguments)
                    },
                    r = function(s) {
                        return g.prototype[p].apply(this, s)
                    };
                return function() {
                    var u = this._super,
                        s = this._superApply,
                        t;
                    this._super = q;
                    this._superApply = r;
                    t = o.apply(this, arguments);
                    this._super = u;
                    this._superApply = s;
                    return t
                }
            })()
        });
        i.prototype = b.widget.extend(m, {
            widgetEventPrefix: l ? m.widgetEventPrefix : f
        }, h, {
            constructor: i,
            namespace: j,
            widgetName: f,
            widgetFullName: k
        });
        if (l) {
            b.each(l._childConstructors, function(p, q) {
                var o = q.prototype;
                b.widget(o.namespace + "." + o.widgetName, i, q._proto)
            });
            delete l._childConstructors
        } else {
            g._childConstructors.push(i)
        }
        b.widget.bridge(f, i)
    };
    b.widget.extend = function(k) {
        var g = d.call(arguments, 1),
            j = 0,
            f = g.length,
            h, i;
        for (; j < f; j++) {
            for (h in g[j]) {
                i = g[j][h];
                if (g[j].hasOwnProperty(h) && i !== e) {
                    if (b.isPlainObject(i)) {
                        k[h] = b.isPlainObject(k[h]) ? b.widget.extend({}, k[h], i) : b.widget.extend({}, i)
                    } else {
                        k[h] = i
                    }
                }
            }
        }
        return k
    };
    b.widget.bridge = function(g, f) {
        var h = f.prototype.widgetFullName || g;
        b.fn[g] = function(k) {
            var i = typeof k === "string",
                j = d.call(arguments, 1),
                l = this;
            k = !i && j.length ? b.widget.extend.apply(null, [k].concat(j)) : k;
            if (i) {
                this.each(function() {
                    var n, m = b.data(this, h);
                    if (!m) {
                        return b.error("cannot call methods on " + g + " prior to initialization; attempted to call method '" + k + "'")
                    }
                    if (!b.isFunction(m[k]) || k.charAt(0) === "_") {
                        return b.error("no such method '" + k + "' for " + g + " widget instance")
                    }
                    n = m[k].apply(m, j);
                    if (n !== m && n !== e) {
                        l = n && n.jquery ? l.pushStack(n.get()) : n;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var m = b.data(this, h);
                    if (m) {
                        m.option(k || {})._init()
                    } else {
                        b.data(this, h, new f(k, this))
                    }
                })
            }
            return l
        }
    };
    b.Widget = function() {};
    b.Widget._childConstructors = [];
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(f, g) {
            g = b(g || this.defaultElement || this)[0];
            this.element = b(g);
            this.uuid = a++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = b.widget.extend({}, this.options, this._getCreateOptions(), f);
            this.bindings = b();
            this.hoverable = b();
            this.focusable = b();
            if (g !== this) {
                b.data(g, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(h) {
                        if (h.target === g) {
                            this.destroy()
                        }
                    }
                });
                this.document = b(g.style ? g.ownerDocument : g.document || g);
                this.window = b(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: b.noop,
        _getCreateEventData: b.noop,
        _create: b.noop,
        _init: b.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: b.noop,
        widget: function() {
            return this.element
        },
        option: function(j, k) {
            var f = j,
                l, h, g;
            if (arguments.length === 0) {
                return b.widget.extend({}, this.options)
            }
            if (typeof j === "string") {
                f = {};
                l = j.split(".");
                j = l.shift();
                if (l.length) {
                    h = f[j] = b.widget.extend({}, this.options[j]);
                    for (g = 0; g < l.length - 1; g++) {
                        h[l[g]] = h[l[g]] || {};
                        h = h[l[g]]
                    }
                    j = l.pop();
                    if (k === e) {
                        return h[j] === e ? null : h[j]
                    }
                    h[j] = k
                } else {
                    if (k === e) {
                        return this.options[j] === e ? null : this.options[j]
                    }
                    f[j] = k
                }
            }
            this._setOptions(f);
            return this
        },
        _setOptions: function(f) {
            var g;
            for (g in f) {
                this._setOption(g, f[g])
            }
            return this
        },
        _setOption: function(f, g) {
            this.options[f] = g;
            if (f === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!g).attr("aria-disabled", g);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _on: function(i, h, g) {
            var j, f = this;
            if (typeof i !== "boolean") {
                g = h;
                h = i;
                i = false
            }
            if (!g) {
                g = h;
                h = this.element;
                j = this.widget()
            } else {
                h = j = b(h);
                this.bindings = this.bindings.add(h)
            }
            b.each(g, function(p, o) {
                function m() {
                    if (!i && (f.options.disabled === true || b(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof o === "string" ? f[o] : o).apply(f, arguments)
                }
                if (typeof o !== "string") {
                    m.guid = o.guid = o.guid || m.guid || b.guid++
                }
                var n = p.match(/^(\w+)\s*(.*)$/),
                    l = n[1] + f.eventNamespace,
                    k = n[2];
                if (k) {
                    j.delegate(k, l, m)
                } else {
                    h.bind(l, m)
                }
            })
        },
        _off: function(g, f) {
            f = (f || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            g.unbind(f).undelegate(f)
        },
        _delay: function(i, h) {
            function g() {
                return (typeof i === "string" ? f[i] : i).apply(f, arguments)
            }
            var f = this;
            return setTimeout(g, h || 0)
        },
        _hoverable: function(f) {
            this.hoverable = this.hoverable.add(f);
            this._on(f, {
                mouseenter: function(g) {
                    b(g.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(g) {
                    b(g.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(f) {
            this.focusable = this.focusable.add(f);
            this._on(f, {
                focusin: function(g) {
                    b(g.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(g) {
                    b(g.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(f, g, h) {
            var k, j, i = this.options[f];
            h = h || {};
            g = b.Event(g);
            g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
            g.target = this.element[0];
            j = g.originalEvent;
            if (j) {
                for (k in j) {
                    if (!(k in g)) {
                        g[k] = j[k]
                    }
                }
            }
            this.element.trigger(g, h);
            return !(b.isFunction(i) && i.apply(this.element[0], [g].concat(h)) === false || g.isDefaultPrevented())
        }
    };
    b.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(g, f) {
        b.Widget.prototype["_" + g] = function(j, i, l) {
            if (typeof i === "string") {
                i = {
                    effect: i
                }
            }
            var k, h = !i ? g : i === true || typeof i === "number" ? f : i.effect || f;
            i = i || {};
            if (typeof i === "number") {
                i = {
                    duration: i
                }
            }
            k = !b.isEmptyObject(i);
            i.complete = l;
            if (i.delay) {
                j.delay(i.delay)
            }
            if (k && b.effects && b.effects.effect[h]) {
                j[g](i)
            } else {
                if (h !== g && j[h]) {
                    j[h](i.duration, i.easing, l)
                } else {
                    j.queue(function(m) {
                        b(this)[g]();
                        if (l) {
                            l.call(j[0])
                        }
                        m()
                    })
                }
            }
        }
    })
})(jQuery);
/*! jquery Selectboxit - v3.3.0 - 2013-03-19
 * http://www.selectboxit.com
 * Copyright (c) 2013 Greg Franko; Licensed MIT */
(function(a) {
    a(window.jQuery, window, document)
})(function(d, b, f, c) {
    d.widget("selectBox.selectBoxIt", {
        VERSION: "3.3.0",
        options: {
            showEffect: "none",
            showEffectOptions: {},
            showEffectSpeed: "medium",
            hideEffect: "none",
            hideEffectOptions: {},
            hideEffectSpeed: "medium",
            showFirstOption: !0,
            defaultText: "",
            defaultIcon: "",
            downArrowIcon: "",
            theme: "default",
            keydownOpen: !0,
            isMobile: function() {
                var g = navigator.userAgent || navigator.vendor || b.opera;
                return /iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/.test(g)
            },
            "native": !1,
            aggressiveChange: !1,
            selectWhenHidden: !0,
            viewport: d(b),
            similarSearch: !1,
            copyAttributes: ["title", "rel"],
            copyClasses: "button",
            nativeMousedown: !1,
            customShowHideEvent: !1,
            autoWidth: !0,
            html: !0
        },
        getThemes: function() {
            var e = this,
                g = d(e.element).attr("data-theme") || "c";
            return {
                bootstrap: {
                    focus: "active",
                    hover: "",
                    disabled: "disabled",
                    arrow: "caret",
                    button: "btn",
                    list: "dropdown-menu",
                    container: "bootstrap",
                    open: "open"
                },
                jqueryui: {
                    focus: "ui-state-focus",
                    hover: "ui-state-hover",
                    disabled: "ui-state-disabled",
                    arrow: "ui-icon ui-icon-triangle-1-s",
                    button: "ui-widget ui-state-default",
                    list: "ui-widget ui-widget-content",
                    container: "jqueryui",
                    open: "selectboxit-open"
                },
                jquerymobile: {
                    focus: "ui-btn-down-" + g,
                    hover: "ui-btn-hover-" + g,
                    disabled: "ui-disabled",
                    arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow",
                    button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + g,
                    list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + g,
                    container: "jquerymobile",
                    open: "selectboxit-open"
                },
                "default": {
                    focus: "selectboxit-focus",
                    hover: "selectboxit-hover",
                    disabled: "selectboxit-disabled",
                    arrow: "selectboxit-default-arrow",
                    button: "selectboxit-btn",
                    list: "selectboxit-list",
                    container: "selectboxit-container",
                    open: "selectboxit-open"
                }
            }
        },
        _create: function() {
            var e = this;
            if (!e.element.is("select")) {
                return
            }
            return e.element.hide(), e.originalElem = e.element[0], e.selectBox = e.element, e.selectItems = e.element.find("option"), e.firstSelectItem = e.selectItems.slice(0, 1), e.documentHeight = d(f).height(), e.theme = e.getThemes()[e.options.theme] || e.getThemes()["default"], e.currentFocus = 0, e.blur = !0, e.textArray = [], e.currentIndex = 0, e.currentText = "", e.flipped = !1, e._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(e.theme)._eventHandlers(), e.originalElem.disabled && e.disable && e.disable(), e._ariaAccessibility && e._ariaAccessibility(), e._mobile && e._mobile(), e.options["native"] && this._applyNativeSelect(), e.triggerEvent("create"), e
        },
        _createDropdownButton: function() {
            var g = this,
                j = g.originalElem.id || "",
                h = g.options.copyClasses,
                e = g.selectBox.attr("class") || "";
            return g.dropdownText = d("<span/>", {
                id: j && j + "SelectBoxItText",
                "class": "selectboxit-text",
                unselectable: "on",
                text: g.firstSelectItem.text()
            }).attr("data-val", g.originalElem.value), g.dropdownImageContainer = d("<span/>", {
                "class": "selectboxit-option-icon-container"
            }), g.dropdownImage = d("<i/>", {
                id: j && j + "SelectBoxItDefaultIcon",
                "class": "selectboxit-default-icon",
                unselectable: "on"
            }), g.dropdown = d("<span/>", {
                id: j && j + "SelectBoxIt",
                "class": "selectboxit " + (h === "button" ? e : ""),
                name: g.originalElem.name,
                tabindex: g.selectBox.attr("tabindex") || "0",
                unselectable: "on"
            }).append(g.dropdownImageContainer.append(g.dropdownImage)).append(g.dropdownText), g.dropdownContainer = d("<span/>", {
                id: j && j + "SelectBoxItContainer",
                "class": "selectboxit-container " + (h === "container" ? e : "")
            }).append(g.dropdown), g
        },
        _createUnorderedList: function() {
            var B = this,
                k, e, q, C, j, A, z, w = "",
                m = B.originalElem.id || "",
                y = d("<ul/>", {
                    id: m && m + "SelectBoxItOptions",
                    "class": "selectboxit-options",
                    tabindex: -1
                }),
                v, g;
            B.options.showFirstOption || (B.selectItems = B.selectBox.find("option").slice(1)), B.selectItems.each(function(h) {
                e = "", q = "", k = d(this).prop("disabled"), C = d(this).data("icon") || "", j = d(this).data("iconurl") || "", A = j ? "selectboxit-option-icon-url" : "", z = j ? "style=\"background-image:url('" + j + "');\"" : "", v = d(this).attr("data-text"), g = v ? v : d(this).text(), d(this).parent().is("optgroup") && (e = "selectboxit-optgroup-option", d(this).index() === 0 && (q = '<span class="selectboxit-optgroup-header" data-disabled="true">' + d(this).parent().first().attr("label") + "</span>")), w += q + '<li id="' + h + '" data-val="' + this.value + '" data-disabled="' + k + '" class="' + e + " selectboxit-option " + (d(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + C + " " + (A || B.theme.container) + '"' + z + "></i></span>" + (B.options.html ? g : B.htmlEscape(g)) + "</a></li>", B.textArray[h] = k ? "" : g, this.selected && (B._setText(B.dropdownText, g), B.currentFocus = h)
            });
            if ((B.options.defaultText || B.selectBox.data("text")) && !B.selectBox.find("option[selected]").length) {
                var x = B.options.defaultText || B.selectBox.data("text");
                B._setText(B.dropdownText, x), B.options.defaultText = x
            }
            return y.append(w), B.list = y, B.dropdownContainer.append(B.list), B.listItems = B.list.find("li"), B.listItems.first().addClass("selectboxit-option-first"), B.listItems.last().addClass("selectboxit-option-last"), B.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(B.theme.disabled), B.dropdownImage.addClass(B.selectBox.data("icon") || B.options.defaultIcon || B.listItems.eq(B.currentFocus).find("i").attr("class")), B.dropdownImage.attr("style", B.listItems.eq(B.currentFocus).find("i").attr("style")), B
        },
        _replaceSelectBox: function() {
            var e = this,
                h, g = e.originalElem.id || "";
            return e.selectBox.css("display", "none").after(e.dropdownContainer), h = e.dropdown.height(), e.downArrow = d("<i/>", {
                id: g && g + "SelectBoxItArrow",
                "class": "selectboxit-arrow",
                unselectable: "on"
            }), e.downArrowContainer = d("<span/>", {
                id: g && g + "SelectBoxItArrowContainer",
                "class": "selectboxit-arrow-container",
                unselectable: "on"
            }).append(e.downArrow), e.dropdown.append(e.downArrowContainer), e.listItems.removeClass("selectboxit-selected").eq(e.currentFocus).addClass("selectboxit-selected"), e.dropdownImageContainer.width() || e.dropdownImageContainer.remove(), e.options.autoWidth && e.dropdown.css({
                width: "auto"
            }).css({
                width: e.list.outerWidth(!0) + e.downArrowContainer.outerWidth(!0) + e.dropdownImage.outerWidth(!0)
            }), e.dropdownText.css({
                "max-width": e.dropdownContainer.width() - (e.downArrowContainer.outerWidth(!0) + e.dropdownImage.outerWidth(!0))
            }), e
        },
        _scrollToView: function(l) {
            var q = this,
                j = q.listItems.eq(q.currentFocus),
                g = q.list.scrollTop(),
                k = j.height(),
                v = j.position().top,
                h = Math.abs(v),
                p = q.list.height(),
                m;
            return l === "search" ? p - v < k ? q.list.scrollTop(g + (v - (p - k))) : v < -1 && q.list.scrollTop(v - k) : l === "up" ? v < -1 && q.list.scrollTop(g - h) : l === "down" && p - v < k && q.list.scrollTop(g + (h - p + k)), q
        },
        _callbackSupport: function(e) {
            var g = this;
            return d.isFunction(e) && e.call(g, g.dropdown), g
        },
        _setText: function(h, g) {
            var i = this;
            return i.options.html ? h.html(g) : h.text(g), i
        },
        open: function(l) {
            var h = this,
                p = h.options.showEffect,
                k = h.options.showEffectSpeed,
                g = h.options.showEffectOptions,
                j = h.options["native"],
                m = h.options.isMobile();
            return h.listItems.length ? (!j && !m && !this.list.is(":visible") && (h.triggerEvent("open"), h._dynamicPositioning && h._dynamicPositioning(), p === "none" ? h.list.show() : p === "show" ? h.list.show(k) : p === "slideDown" ? h.list.slideDown(k) : p === "fadeIn" ? h.list.fadeIn(k) : h.list.show(p, g, k), h.list.promise().done(function() {
                h._scrollToView("search")
            })), h._callbackSupport(l), h) : h
        },
        close: function(l) {
            var h = this,
                p = h.options.hideEffect,
                k = h.options.hideEffectSpeed,
                g = h.options.hideEffectOptions,
                j = h.options["native"],
                m = h.options.isMobile();
            return !j && !m && this.list.is(":visible") && (h.triggerEvent("close"), p === "none" ? h.list.hide() : p === "hide" ? h.list.hide(k) : p === "slideUp" ? h.list.slideUp(k) : p === "fadeOut" ? h.list.fadeOut(k) : h.list.hide(p, g, k)), h._callbackSupport(l), h
        },
        toggle: function() {
            var h = this,
                g = h.list.is(":visible");
            g ? h.close() : g || h.open()
        },
        _keyMappings: {
            38: "up",
            40: "down",
            13: "enter",
            8: "backspace",
            9: "tab",
            32: "space",
            27: "esc"
        },
        _keydownMethods: function() {
            var h = this,
                g = h.list.is(":visible") || !h.options.keydownOpen;
            return {
                down: function() {
                    h.moveDown && g && h.moveDown()
                },
                up: function() {
                    h.moveUp && g && h.moveUp()
                },
                enter: function() {
                    var e = h.list.find("li." + h.focusClass);
                    e.length || (e = h.listItems.first()), h._update(e), h.list.is(":visible") && h.close(), h.triggerEvent("enter")
                },
                tab: function() {
                    h.triggerEvent("tab-blur"), h.close()
                },
                backspace: function() {
                    h.triggerEvent("backspace")
                },
                esc: function() {
                    h.close()
                }
            }
        },
        _eventHandlers: function() {
            var g = this,
                k = g.options.nativeMousedown,
                j = g.options.customShowHideEvent,
                e, h;
            return this.dropdown.bind({
                "click.selectBoxIt": function() {
                    g.dropdown.trigger("focus", !0), g.originalElem.disabled || (g.triggerEvent("click"), !k && !j && g.toggle())
                },
                "mousedown.selectBoxIt": function() {
                    d(this).data("mdown", !0), g.triggerEvent("mousedown"), k && !j && g.toggle()
                },
                "mouseup.selectBoxIt": function() {
                    g.triggerEvent("mouseup")
                },
                "blur.selectBoxIt": function() {
                    g.blur && (g.triggerEvent("blur"), g.list.is(":visible") && g.close())
                },
                "focus.selectBoxIt": function(o, m) {
                    var l = d(this).data("mdown");
                    d(this).removeData("mdown"), !l && !m && setTimeout(function() {
                        g.triggerEvent("tab-focus")
                    }, 0), m || g.triggerEvent("focus")
                },
                "keydown.selectBoxIt": function(l) {
                    var m = g._keyMappings[l.keyCode],
                        i = g._keydownMethods()[m];
                    i && (i(), g.options.keydownOpen && (m === "up" || m === "down") && g.open()), i && m !== "tab" && l.preventDefault()
                },
                "keypress.selectBoxIt": function(l) {
                    var m = l.charCode || l.keyCode,
                        i = String.fromCharCode(m);
                    g.search && g.search(i, !0, !0), m === 32 && l.preventDefault()
                },
                "mouseenter.selectBoxIt": function() {
                    g.triggerEvent("mouseenter")
                },
                "mouseleave.selectBoxIt": function() {
                    g.triggerEvent("mouseleave")
                }
            }), g.list.bind({
                "mouseover.selectBoxIt": function() {
                    g.blur = !1
                },
                "mouseout.selectBoxIt": function() {
                    g.blur = !0
                },
                "focusin.selectBoxIt": function() {
                    g.dropdown.trigger("focus", !0)
                }
            }).delegate("li", "click.selectBoxIt", function() {
                g._update(d(this)), g.triggerEvent("option-click"), d(this).attr("data-disabled") === "false" && g.close()
            }).delegate("li", "focusin.selectBoxIt", function() {
                g.listItems.not(d(this)).removeAttr("data-active"), d(this).attr("data-active", "");
                var i = g.list.is(":hidden");
                (g.options.searchWhenHidden && i || g.options.aggressiveChange || i && g.options.selectWhenHidden) && g._update(d(this))
            }).delegate("li", "mouseup.selectBoxIt", function() {
                k && !j && (g._update(d(this)), g.triggerEvent("option-mouseup"), d(this).attr("data-disabled") === "false" && g.close())
            }), g.selectBox.bind({
                "change.selectBoxIt, internal-change.selectBoxIt": function(l, m) {
                    var i;
                    m || (i = g.list.find('li[data-val="' + g.originalElem.value + '"]'), i.length && (g.listItems.eq(g.currentFocus).removeClass(g.focusClass), g.currentFocus = +i.attr("id"))), i = g.listItems.eq(g.currentFocus), e = i.attr("data-text"), h = e ? e : i.find("a").text(), g._setText(g.dropdownText, h), g.dropdownText.attr("data-val", g.originalElem.value), i.find("i").attr("class") && (g.dropdownImage.attr("class", i.find("i").attr("class")).addClass("selectboxit-default-icon"), g.dropdownImage.attr("style", i.find("i").attr("style"))), g.triggerEvent("changed")
                },
                "disable.selectBoxIt": function() {
                    g.dropdown.addClass(g.theme.disabled)
                },
                "enable.selectBoxIt": function() {
                    g.dropdown.removeClass(g.theme.disabled)
                }
            }), g
        },
        _update: function(k) {
            var h = this,
                l, j, g = h.options.defaultText || h.selectBox.attr("data-text");
            k.attr("data-disabled") === "false" && (l = h.listItems.eq(h.currentFocus).attr("data-text"), j = l ? l : h.listItems.eq(h.currentFocus).text(), (g && h.options.html ? h.dropdownText.html() === g : h.dropdownText.text() === g) && h.selectBox.val() === k.attr("data-val") ? (h._setText(h.dropdownText, j), h.dropdownText.trigger("internal-change")) : (h.selectBox.val(k.attr("data-val")), h.currentFocus = +k.attr("id"), h.originalElem.value !== h.dropdownText.attr("data-val") && h.triggerEvent("change")))
        },
        _addClasses: function(p) {
            var h = this,
                e = p.focus,
                j = p.hover,
                q = p.button,
                g = p.list,
                m = p.arrow,
                l = p.container,
                k = p.open;
            return h.focusClass = e, h.openClass = k, h.selectedClass = "selectboxit-selected", h.downArrow.addClass(h.selectBox.data("downarrow") || h.options.downArrowIcon || m), h.dropdownContainer.addClass(l), h.dropdown.addClass(q), h.list.addClass(g), h.listItems.bind({
                "focusin.selectBoxIt": function() {
                    d(this).addClass(e)
                },
                "blur.selectBoxIt": function() {
                    d(this).removeClass(e)
                }
            }), h.selectBox.bind({
                "open.selectBoxIt": function() {
                    var n = h.list.find("li[data-val='" + h.dropdownText.attr("data-val") + "']"),
                        i;
                    n.length || (h.currentFocus === 0 && !h.options.showFirstOption && h.listItems.eq(0).hasClass(h.theme.disabled) ? n = h.listItems.not("[data-disabled=true]").first() : n = h.listItems.first()), h.currentFocus = +n.attr("id"), i = h.listItems.eq(h.currentFocus), h.dropdown.addClass(k), h.dropdown.removeClass(j).addClass(e), h.listItems.removeClass(h.selectedClass), h.listItems.removeAttr("data-active").not(i).removeClass(e), i.addClass(e).addClass(h.selectedClass)
                },
                "close.selectBoxIt": function() {
                    h.dropdown.removeClass(k)
                },
                "blur.selectBoxIt": function() {
                    h.dropdown.removeClass(e)
                },
                "mouseenter.selectBoxIt": function() {
                    h.dropdown.addClass(j)
                },
                "mouseleave.selectBoxIt": function() {
                    h.dropdown.removeClass(j)
                }
            }), h.listItems.bind({
                "mouseenter.selectBoxIt": function() {
                    d(this).attr("data-disabled") === "false" && (h.listItems.removeAttr("data-active"), d(this).addClass(e).attr("data-active", ""), h.listItems.not(d(this)).removeClass(e), d(this).addClass(e), h.currentFocus = +d(this).attr("id"))
                },
                "mouseleave.selectBoxIt": function() {
                    d(this).attr("data-disabled") === "false" && (h.listItems.not(d(this)).removeClass(e).removeAttr("data-active"), d(this).addClass(e), h.currentFocus = +d(this).attr("id"))
                }
            }), h
        },
        refresh: function(h) {
            var g = this;
            return g._destroySelectBoxIt && (g._destroySelectBoxIt()._create(!0)._callbackSupport(h), g.triggerEvent("refresh")), g
        },
        htmlEscape: function(g) {
            return String(g).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        triggerEvent: function(h) {
            var g = this,
                i = g.options.showFirstOption ? g.currentFocus : g.currentFocus - 1 >= 0 ? g.currentFocus : 0;
            return g.selectBox.trigger(h, {
                elem: g.selectBox.eq(i),
                "dropdown-elem": g.listItems.eq(g.currentFocus)
            }), g
        },
        _copyAttributes: function() {
            var g = this;
            return g._addSelectBoxAttributes && g._addSelectBoxAttributes(), g
        }
    });
    var a = d.selectBox.selectBoxIt.prototype;
    a._ariaAccessibility = function() {
        var e = this;
        return e.dropdown.attr({
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-expanded": "false",
            "aria-owns": e.list.attr("id"),
            "aria-activedescendant": e.listItems.eq(e.currentFocus).attr("id"),
            "aria-label": d("label[for='" + e.originalElem.id + "']").text() || "",
            "aria-live": "assertive"
        }).bind({
            "disable.selectBoxIt": function() {
                e.dropdown.attr("aria-disabled", "true")
            },
            "enable.selectBoxIt": function() {
                e.dropdown.attr("aria-disabled", "false")
            }
        }), e.list.attr({
            role: "listbox",
            "aria-hidden": "true"
        }), e.listItems.attr({
            role: "option"
        }), e.selectBox.bind({
            "change.selectBoxIt": function() {
                e.dropdownText.attr("aria-label", e.originalElem.value)
            },
            "open.selectBoxIt": function() {
                e.list.attr("aria-hidden", "false"), e.dropdown.attr("aria-expanded", "true")
            },
            "close.selectBoxIt": function() {
                e.list.attr("aria-hidden", "true"), e.dropdown.attr("aria-expanded", "false")
            }
        }), e
    }, a._addSelectBoxAttributes = function() {
        var e = this;
        return e._addAttributes(e.selectBox.prop("attributes"), e.dropdown), e.selectItems.each(function(g) {
            e._addAttributes(d(this).prop("attributes"), e.listItems.eq(g))
        }), e
    }, d.selectBox.selectBoxIt.prototype._addAttributes = function(g, j) {
        var h = this,
            e = h.options.copyAttributes;
        return g.length && d.each(g, function(i, l) {
            var k = l.name.toLowerCase(),
                m = l.value;
            m !== "null" && (d.inArray(k, e) !== -1 || k.indexOf("data") !== -1) && j.attr(k, m)
        }), h
    }, a.destroy = function(e) {
        var g = this;
        return g._destroySelectBoxIt(), d.Widget.prototype.destroy.call(g), g._callbackSupport(e), g
    }, a._destroySelectBoxIt = function() {
        var e = this;
        return e.dropdown.unbind(".selectBoxIt").undelegate(".selectBoxIt"), d.contains(e.dropdownContainer[0], e.originalElem) && e.dropdownContainer.before(e.selectBox), e.dropdownContainer.remove(), e.selectBox.removeAttr("style").show(), e.triggerEvent("destroy"), e
    }, a.disable = function(e) {
        var g = this;
        return g.options.disabled || (g.close(), g.selectBox.attr("disabled", "disabled"), g.dropdown.removeAttr("tabindex").addClass("selectboxit-disabled"), d.Widget.prototype.disable.call(g), g.triggerEvent("disable")), g._callbackSupport(e), g
    }, a.disableOption = function(l, h) {
        var m = this,
            k, g, j;
        return (typeof l).toLowerCase() === "number" && (m.close(), k = m.selectBox.find("option").eq(l), m.triggerEvent("disable-option"), k.attr("disabled", "disabled"), m.listItems.eq(l).attr("data-disabled", "true").addClass(m.theme.disabled), m.currentFocus === l && (g = m.listItems.eq(m.currentFocus).nextAll("li").not("[data-disabled='true']").first().length, j = m.listItems.eq(m.currentFocus).prevAll("li").not("[data-disabled='true']").first().length, g ? m.moveDown() : j ? m.moveUp() : m.disable())), m._callbackSupport(h), m
    }, a._isDisabled = function(h) {
        var g = this;
        return g.originalElem.disabled && g.disable(), g
    }, a._dynamicPositioning = function() {
        var w = this,
            h = w.dropdown.offset().top,
            e = w.list.data("max-height") || w.list.outerHeight(),
            k = w.dropdown.outerHeight(),
            x = w.options.viewport,
            g = x.height(),
            v = d.isWindow(x.get(0)) ? x.scrollTop() : x.offset().top,
            q = h + k + e <= g + v,
            m = !q;
        w.list.data("max-height") || w.list.data("max-height", w.list.outerHeight());
        if (!m) {
            w.list.css("max-height", e), w.list.css("top", "auto")
        } else {
            if (w.dropdown.offset().top - v >= e) {
                w.list.css("max-height", e), w.list.css("top", w.dropdown.position().top - w.list.outerHeight())
            } else {
                var j = Math.abs(h + k + e - (g + v)),
                    p = Math.abs(w.dropdown.offset().top - v - e);
                j < p ? (w.list.css("max-height", e - j - k / 2), w.list.css("top", "auto")) : (w.list.css("max-height", e - p - k / 2), w.list.css("top", w.dropdown.position().top - w.list.outerHeight()))
            }
        }
        return w
    }, a.enable = function(e) {
        var g = this;
        return g.options.disabled && (g.triggerEvent("enable"), g.selectBox.removeAttr("disabled"), g.dropdown.attr("tabindex", 0).removeClass(g.disabledClasses), d.Widget.prototype.enable.call(g), g._callbackSupport(e)), g
    }, a.enableOption = function(l, h) {
        var p = this,
            k, g = 0,
            j, m;
        return (typeof l).toLowerCase() === "number" && (k = p.selectBox.find("option").eq(l), p.triggerEvent("enable-option"), k.removeAttr("disabled"), p.listItems.eq(l).attr("data-disabled", "false").removeClass(p.disabledClasses)), p._callbackSupport(h), p
    }, a.moveDown = function(i) {
        var g = this;
        g.currentFocus += 1;
        var j = g.listItems.eq(g.currentFocus).attr("data-disabled") === "true" ? !0 : !1,
            h = g.listItems.eq(g.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
        if (g.currentFocus === g.listItems.length) {
            g.currentFocus -= 1
        } else {
            if (j && h) {
                g.listItems.eq(g.currentFocus - 1).blur(), g.moveDown();
                return
            }
            j && !h ? g.currentFocus -= 1 : (g.listItems.eq(g.currentFocus - 1).blur().end().eq(g.currentFocus).focusin(), g._scrollToView("down"), g.triggerEvent("moveDown"))
        }
        return g._callbackSupport(i), g
    }, a.moveUp = function(i) {
        var g = this;
        g.currentFocus -= 1;
        var j = g.listItems.eq(g.currentFocus).attr("data-disabled") === "true" ? !0 : !1,
            h = g.listItems.eq(g.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
        if (g.currentFocus === -1) {
            g.currentFocus += 1
        } else {
            if (j && h) {
                g.listItems.eq(g.currentFocus + 1).blur(), g.moveUp();
                return
            }
            j && !h ? g.currentFocus += 1 : (g.listItems.eq(this.currentFocus + 1).blur().end().eq(g.currentFocus).focusin(), g._scrollToView("up"), g.triggerEvent("moveUp"))
        }
        return g._callbackSupport(i), g
    }, a._setCurrentSearchOption = function(h) {
        var g = this;
        return (g.options.aggressiveChange || g.options.selectWhenHidden || g.listItems.eq(h).is(":visible")) && g.listItems.eq(h).data("disabled") !== !0 && (g.listItems.eq(g.currentFocus).blur(), g.currentIndex = h, g.currentFocus = h, g.listItems.eq(g.currentFocus).focusin(), g._scrollToView("search"), g.triggerEvent("search")), g
    }, a._searchAlgorithm = function(m, v) {
        var j = this,
            g = !1,
            k, w, h, q, p = j.textArray,
            l = j.currentText;
        for (k = m, h = p.length; k < h; k += 1) {
            q = p[k];
            for (w = 0; w < h; w += 1) {
                p[w].search(v) !== -1 && (g = !0, w = h)
            }
            g || (j.currentText = j.currentText.charAt(j.currentText.length - 1).replace(/[|()\[{.+*?$\\]/g, "\\$0"), l = j.currentText), v = new RegExp(l, "gi");
            if (l.length < 3) {
                v = new RegExp(l.charAt(0), "gi");
                if (q.charAt(0).search(v) !== -1) {
                    j._setCurrentSearchOption(k);
                    if (q.substring(0, l.length).toLowerCase() !== l.toLowerCase() || j.options.similarSearch) {
                        j.currentIndex += 1
                    }
                    return !1
                }
            } else {
                if (q.search(v) !== -1) {
                    return j._setCurrentSearchOption(k), !1
                }
            }
            if (q.toLowerCase() === j.currentText.toLowerCase()) {
                return j._setCurrentSearchOption(k), j.currentText = "", !1
            }
        }
        return !0
    }, a.search = function(k, h, l) {
        var j = this;
        l ? j.currentText += k.replace(/[|()\[{.+*?$\\]/g, "\\$0") : j.currentText = k.replace(/[|()\[{.+*?$\\]/g, "\\$0");
        var g = j._searchAlgorithm(j.currentIndex, new RegExp(j.currentText, "gi"));
        return g && j._searchAlgorithm(0, j.currentText), j._callbackSupport(h), j
    }, a._applyNativeSelect = function() {
        var i = this,
            g, j, h;
        i.dropdownContainer.append(i.selectBox), i.selectBox.css({
            display: "block",
            width: i.dropdown.outerWidth(),
            height: i.dropdown.outerHeight(),
            opacity: "0",
            position: "absolute",
            top: "0",
            left: "0",
            cursor: "pointer",
            "z-index": "999999",
            margin: i.dropdown.css("margin"),
            padding: "0",
            "-webkit-appearance": "menulist-button"
        }).bind({
            "changed.selectBoxIt": function() {
                g = i.selectBox.find("option").filter(":selected"), j = g.attr("data-text"), h = j ? j : g.text(), i._setText(i.dropdownText, h), i.list.find('li[data-val="' + g.val() + '"]').find("i").attr("class") && i.dropdownImage.attr("class", i.list.find('li[data-val="' + g.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon")
            }
        })
    }, a._mobile = function(h) {
        var g = this;
        return g.options.isMobile() && g._applyNativeSelect(), this
    }, a.selectOption = function(h, g) {
        var i = this;
        return (typeof h).toLowerCase() === "number" ? i.selectBox.val(i.selectBox.find("option").eq(h).val()).change() : (typeof h).toLowerCase() === "string" && i.selectBox.val(h).change(), i._callbackSupport(g), i
    }, a.setOption = function(g, k, j) {
        var e = this,
            h = e.listItems.eq(0);
        return g === "showFirstOption" && !k ? h.hide() : g === "showFirstOption" && k ? h.show() : g === "defaultIcon" && k ? e.dropdownImage.attr("class", k + " selectboxit-arrow") : g === "downArrowIcon" && k ? e.downArrow.attr("class", k + " selectboxit-arrow") : g === "defaultText" && e._setText(e.dropdownText, k), d.Widget.prototype._setOption.apply(e, arguments), e._callbackSupport(j), e
    }, a.setOptions = function(g, j) {
        var h = this,
            e = h.listItems.eq(0);
        return d.Widget.prototype._setOptions.apply(h, arguments), h.options.showFirstOption ? e.show() : e.hide(), h.options.defaultIcon && h.dropdownImage.attr("class", h.options.defaultIcon + " selectboxit-arrow"), h.options.downArrowIcon && h.downArrow.attr("class", h.options.downArrowIcon + " selectboxit-arrow"), h.options.defaultText && h._setText(h.dropdownText, h.options.defaultText), h._callbackSupport(j), h
    }, a.wait = function(i, g) {
        var j = this,
            h = this.returnTimeout(i);
        return h.then(function() {
            j._callbackSupport(g)
        }), j
    }, a.returnTimeout = function(e) {
        return d.Deferred(function(g) {
            setTimeout(g.resolve, e)
        })
    }
});
(function(e) {
    var o = "left",
        n = "right",
        d = "up",
        v = "down",
        c = "in",
        w = "out",
        l = "none",
        r = "auto",
        k = "swipe",
        s = "pinch",
        x = "tap",
        i = "doubletap",
        b = "longtap",
        A = "horizontal",
        t = "vertical",
        h = "all",
        q = 10,
        f = "start",
        j = "move",
        g = "end",
        p = "cancel",
        a = "ontouchstart" in window,
        y = "TouchSwipe";
    var m = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "button, input, select, textarea, a, .noSwipe"
    };
    e.fn.swipe = function(D) {
        var C = e(this),
            B = C.data(y);
        if (B && typeof D === "string") {
            if (B[D]) {
                return B[D].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                e.error("Method " + D + " does not exist on jQuery.swipe")
            }
        } else {
            if (!B && (typeof D === "object" || !D)) {
                return u.apply(this, arguments)
            }
        }
        return C
    };
    e.fn.swipe.defaults = m;
    e.fn.swipe.phases = {
        PHASE_START: f,
        PHASE_MOVE: j,
        PHASE_END: g,
        PHASE_CANCEL: p
    };
    e.fn.swipe.directions = {
        LEFT: o,
        RIGHT: n,
        UP: d,
        DOWN: v,
        IN: c,
        OUT: w
    };
    e.fn.swipe.pageScroll = {
        NONE: l,
        HORIZONTAL: A,
        VERTICAL: t,
        AUTO: r
    };
    e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: h
    };

    function u(B) {
        if (B && (B.allowPageScroll === undefined && (B.swipe !== undefined || B.swipeStatus !== undefined))) {
            B.allowPageScroll = l
        }
        if (B.click !== undefined && B.tap === undefined) {
            B.tap = B.click
        }
        if (!B) {
            B = {}
        }
        B = e.extend({}, e.fn.swipe.defaults, B);
        return this.each(function() {
            var D = e(this);
            var C = D.data(y);
            if (!C) {
                C = new z(this, B);
                D.data(y, C)
            }
        })
    }

    function z(a0, aq) {
        var av = (a || !aq.fallbackToMouseEvents),
            G = av ? "touchstart" : "mousedown",
            au = av ? "touchmove" : "mousemove",
            R = av ? "touchend" : "mouseup",
            P = av ? null : "mouseleave",
            az = "touchcancel";
        var ac = 0,
            aL = null,
            Y = 0,
            aX = 0,
            aV = 0,
            D = 1,
            am = 0,
            aF = 0,
            J = null;
        var aN = e(a0);
        var W = "start";
        var T = 0;
        var aM = null;
        var Q = 0,
            aY = 0,
            a1 = 0,
            aa = 0,
            K = 0;
        var aS = null;
        try {
            aN.bind(G, aJ);
            aN.bind(az, a5)
        } catch (ag) {
            e.error("events not supported " + G + "," + az + " on jQuery.swipe")
        }
        this.enable = function() {
            aN.bind(G, aJ);
            aN.bind(az, a5);
            return aN
        };
        this.disable = function() {
            aG();
            return aN
        };
        this.destroy = function() {
            aG();
            aN.data(y, null);
            return aN
        };
        this.option = function(a8, a7) {
            if (aq[a8] !== undefined) {
                if (a7 === undefined) {
                    return aq[a8]
                } else {
                    aq[a8] = a7
                }
            } else {
                e.error("Option " + a8 + " does not exist on jQuery.swipe.options")
            }
        };

        function aJ(a9) {
            if (ax()) {
                return
            }
            if (e(a9.target).closest(aq.excludedElements, aN).length > 0) {
                return
            }
            var ba = a9.originalEvent ? a9.originalEvent : a9;
            var a8, a7 = a ? ba.touches[0] : ba;
            W = f;
            if (a) {
                T = ba.touches.length
            } else {
                a9.preventDefault()
            }
            ac = 0;
            aL = null;
            aF = null;
            Y = 0;
            aX = 0;
            aV = 0;
            D = 1;
            am = 0;
            aM = af();
            J = X();
            O();
            if (!a || (T === aq.fingers || aq.fingers === h) || aT()) {
                ae(0, a7);
                Q = ao();
                if (T == 2) {
                    ae(1, ba.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                }
                if (aq.swipeStatus || aq.pinchStatus) {
                    a8 = L(ba, W)
                }
            } else {
                a8 = false
            }
            if (a8 === false) {
                W = p;
                L(ba, W);
                return a8
            } else {
                ak(true)
            }
        }

        function aZ(ba) {
            var bd = ba.originalEvent ? ba.originalEvent : ba;
            if (W === g || W === p || ai()) {
                return
            }
            var a9, a8 = a ? bd.touches[0] : bd;
            var bb = aD(a8);
            aY = ao();
            if (a) {
                T = bd.touches.length
            }
            W = j;
            if (T == 2) {
                if (aX == 0) {
                    ae(1, bd.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                } else {
                    aD(bd.touches[1]);
                    aV = ap(aM[0].end, aM[1].end);
                    aF = an(aM[0].end, aM[1].end)
                }
                D = a3(aX, aV);
                am = Math.abs(aX - aV)
            }
            if ((T === aq.fingers || aq.fingers === h) || !a || aT()) {
                aL = aH(bb.start, bb.end);
                ah(ba, aL);
                ac = aO(bb.start, bb.end);
                Y = aI();
                aE(aL, ac);
                if (aq.swipeStatus || aq.pinchStatus) {
                    a9 = L(bd, W)
                }
                if (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave) {
                    var a7 = true;
                    if (aq.triggerOnTouchLeave) {
                        var bc = aU(this);
                        a7 = B(bb.end, bc)
                    }
                    if (!aq.triggerOnTouchEnd && a7) {
                        W = ay(j)
                    } else {
                        if (aq.triggerOnTouchLeave && !a7) {
                            W = ay(g)
                        }
                    }
                    if (W == p || W == g) {
                        L(bd, W)
                    }
                }
            } else {
                W = p;
                L(bd, W)
            }
            if (a9 === false) {
                W = p;
                L(bd, W)
            }
        }

        function I(a7) {
            var a8 = a7.originalEvent;
            if (a) {
                if (a8.touches.length > 0) {
                    C();
                    return true
                }
            }
            if (ai()) {
                T = aa
            }
            a7.preventDefault();
            aY = ao();
            Y = aI();
            if (a6()) {
                W = p;
                L(a8, W)
            } else {
                if (aq.triggerOnTouchEnd || (aq.triggerOnTouchEnd == false && W === j)) {
                    W = g;
                    L(a8, W)
                } else {
                    if (!aq.triggerOnTouchEnd && a2()) {
                        W = g;
                        aB(a8, W, x)
                    } else {
                        if (W === j) {
                            W = p;
                            L(a8, W)
                        }
                    }
                }
            }
            ak(false)
        }

        function a5() {
            T = 0;
            aY = 0;
            Q = 0;
            aX = 0;
            aV = 0;
            D = 1;
            O();
            ak(false)
        }

        function H(a7) {
            var a8 = a7.originalEvent;
            if (aq.triggerOnTouchLeave) {
                W = ay(g);
                L(a8, W)
            }
        }

        function aG() {
            aN.unbind(G, aJ);
            aN.unbind(az, a5);
            aN.unbind(au, aZ);
            aN.unbind(R, I);
            if (P) {
                aN.unbind(P, H)
            }
            ak(false)
        }

        function ay(bb) {
            var ba = bb;
            var a9 = aw();
            var a8 = aj();
            var a7 = a6();
            if (!a9 || a7) {
                ba = p
            } else {
                if (a8 && bb == j && (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave)) {
                    ba = g
                } else {
                    if (!a8 && bb == g && aq.triggerOnTouchLeave) {
                        ba = p
                    }
                }
            }
            return ba
        }

        function L(a9, a7) {
            var a8 = undefined;
            if (F() || S()) {
                a8 = aB(a9, a7, k)
            } else {
                if ((M() || aT()) && a8 !== false) {
                    a8 = aB(a9, a7, s)
                }
            }
            if (aC() && a8 !== false) {
                a8 = aB(a9, a7, i)
            } else {
                if (al() && a8 !== false) {
                    a8 = aB(a9, a7, b)
                } else {
                    if (ad() && a8 !== false) {
                        a8 = aB(a9, a7, x)
                    }
                }
            }
            if (a7 === p) {
                a5(a9)
            }
            if (a7 === g) {
                if (a) {
                    if (a9.touches.length == 0) {
                        a5(a9)
                    }
                } else {
                    a5(a9)
                }
            }
            return a8
        }

        function aB(ba, a7, a9) {
            var a8 = undefined;
            if (a9 == k) {
                aN.trigger("swipeStatus", [a7, aL || null, ac || 0, Y || 0, T]);
                if (aq.swipeStatus) {
                    a8 = aq.swipeStatus.call(aN, ba, a7, aL || null, ac || 0, Y || 0, T);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && aR()) {
                    aN.trigger("swipe", [aL, ac, Y, T]);
                    if (aq.swipe) {
                        a8 = aq.swipe.call(aN, ba, aL, ac, Y, T);
                        if (a8 === false) {
                            return false
                        }
                    }
                    switch (aL) {
                        case o:
                            aN.trigger("swipeLeft", [aL, ac, Y, T]);
                            if (aq.swipeLeft) {
                                a8 = aq.swipeLeft.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case n:
                            aN.trigger("swipeRight", [aL, ac, Y, T]);
                            if (aq.swipeRight) {
                                a8 = aq.swipeRight.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case d:
                            aN.trigger("swipeUp", [aL, ac, Y, T]);
                            if (aq.swipeUp) {
                                a8 = aq.swipeUp.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case v:
                            aN.trigger("swipeDown", [aL, ac, Y, T]);
                            if (aq.swipeDown) {
                                a8 = aq.swipeDown.call(aN, ba, aL, ac, Y, T)
                            }
                            break
                    }
                }
            }
            if (a9 == s) {
                aN.trigger("pinchStatus", [a7, aF || null, am || 0, Y || 0, T, D]);
                if (aq.pinchStatus) {
                    a8 = aq.pinchStatus.call(aN, ba, a7, aF || null, am || 0, Y || 0, T, D);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && a4()) {
                    switch (aF) {
                        case c:
                            aN.trigger("pinchIn", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchIn) {
                                a8 = aq.pinchIn.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break;
                        case w:
                            aN.trigger("pinchOut", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchOut) {
                                a8 = aq.pinchOut.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break
                    }
                }
            }
            if (a9 == x) {
                if (a7 === p || a7 === g) {
                    clearTimeout(aS);
                    if (V() && !E()) {
                        K = ao();
                        aS = setTimeout(e.proxy(function() {
                            K = null;
                            aN.trigger("tap", [ba.target]);
                            if (aq.tap) {
                                a8 = aq.tap.call(aN, ba, ba.target)
                            }
                        }, this), aq.doubleTapThreshold)
                    } else {
                        K = null;
                        aN.trigger("tap", [ba.target]);
                        if (aq.tap) {
                            a8 = aq.tap.call(aN, ba, ba.target)
                        }
                    }
                }
            } else {
                if (a9 == i) {
                    if (a7 === p || a7 === g) {
                        clearTimeout(aS);
                        K = null;
                        aN.trigger("doubletap", [ba.target]);
                        if (aq.doubleTap) {
                            a8 = aq.doubleTap.call(aN, ba, ba.target)
                        }
                    }
                } else {
                    if (a9 == b) {
                        if (a7 === p || a7 === g) {
                            clearTimeout(aS);
                            K = null;
                            aN.trigger("longtap", [ba.target]);
                            if (aq.longTap) {
                                a8 = aq.longTap.call(aN, ba, ba.target)
                            }
                        }
                    }
                }
            }
            return a8
        }

        function aj() {
            var a7 = true;
            if (aq.threshold !== null) {
                a7 = ac >= aq.threshold
            }
            return a7
        }

        function a6() {
            var a7 = false;
            if (aq.cancelThreshold !== null && aL !== null) {
                a7 = (aP(aL) - ac) >= aq.cancelThreshold
            }
            return a7
        }

        function ab() {
            if (aq.pinchThreshold !== null) {
                return am >= aq.pinchThreshold
            }
            return true
        }

        function aw() {
            var a7;
            if (aq.maxTimeThreshold) {
                if (Y >= aq.maxTimeThreshold) {
                    a7 = false
                } else {
                    a7 = true
                }
            } else {
                a7 = true
            }
            return a7
        }

        function ah(a7, a8) {
            if (aq.allowPageScroll === l || aT()) {
                a7.preventDefault()
            } else {
                var a9 = aq.allowPageScroll === r;
                switch (a8) {
                    case o:
                        if ((aq.swipeLeft && a9) || (!a9 && aq.allowPageScroll != A)) {
                            a7.preventDefault()
                        }
                        break;
                    case n:
                        if ((aq.swipeRight && a9) || (!a9 && aq.allowPageScroll != A)) {
                            a7.preventDefault()
                        }
                        break;
                    case d:
                        if ((aq.swipeUp && a9) || (!a9 && aq.allowPageScroll != t)) {
                            a7.preventDefault()
                        }
                        break;
                    case v:
                        if ((aq.swipeDown && a9) || (!a9 && aq.allowPageScroll != t)) {
                            a7.preventDefault()
                        }
                        break
                }
            }
        }

        function a4() {
            var a8 = aK();
            var a7 = U();
            var a9 = ab();
            return a8 && a7 && a9
        }

        function aT() {
            return !!(aq.pinchStatus || aq.pinchIn || aq.pinchOut)
        }

        function M() {
            return !!(a4() && aT())
        }

        function aR() {
            var ba = aw();
            var bc = aj();
            var a9 = aK();
            var a7 = U();
            var a8 = a6();
            var bb = !a8 && a7 && a9 && bc && ba;
            return bb
        }

        function S() {
            return !!(aq.swipe || aq.swipeStatus || aq.swipeLeft || aq.swipeRight || aq.swipeUp || aq.swipeDown)
        }

        function F() {
            return !!(aR() && S())
        }

        function aK() {
            return ((T === aq.fingers || aq.fingers === h) || !a)
        }

        function U() {
            return aM[0].end.x !== 0
        }

        function a2() {
            return !!(aq.tap)
        }

        function V() {
            return !!(aq.doubleTap)
        }

        function aQ() {
            return !!(aq.longTap)
        }

        function N() {
            if (K == null) {
                return false
            }
            var a7 = ao();
            return (V() && ((a7 - K) <= aq.doubleTapThreshold))
        }

        function E() {
            return N()
        }

        function at() {
            return ((T === 1 || !a) && (isNaN(ac) || ac === 0))
        }

        function aW() {
            return ((Y > aq.longTapThreshold) && (ac < q))
        }

        function ad() {
            return !!(at() && a2())
        }

        function aC() {
            return !!(N() && V())
        }

        function al() {
            return !!(aW() && aQ())
        }

        function C() {
            a1 = ao();
            aa = event.touches.length + 1
        }

        function O() {
            a1 = 0;
            aa = 0
        }

        function ai() {
            var a7 = false;
            if (a1) {
                var a8 = ao() - a1;
                if (a8 <= aq.fingerReleaseThreshold) {
                    a7 = true
                }
            }
            return a7
        }

        function ax() {
            return !!(aN.data(y + "_intouch") === true)
        }

        function ak(a7) {
            if (a7 === true) {
                aN.bind(au, aZ);
                aN.bind(R, I);
                if (P) {
                    aN.bind(P, H)
                }
            } else {
                aN.unbind(au, aZ, false);
                aN.unbind(R, I, false);
                if (P) {
                    aN.unbind(P, H, false)
                }
            }
            aN.data(y + "_intouch", a7 === true)
        }

        function ae(a8, a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            aM[a8].identifier = a9;
            aM[a8].start.x = aM[a8].end.x = a7.pageX || a7.clientX;
            aM[a8].start.y = aM[a8].end.y = a7.pageY || a7.clientY;
            return aM[a8]
        }

        function aD(a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            var a8 = Z(a9);
            a8.end.x = a7.pageX || a7.clientX;
            a8.end.y = a7.pageY || a7.clientY;
            return a8
        }

        function Z(a8) {
            for (var a7 = 0; a7 < aM.length; a7++) {
                if (aM[a7].identifier == a8) {
                    return aM[a7]
                }
            }
        }

        function af() {
            var a7 = [];
            for (var a8 = 0; a8 <= 5; a8++) {
                a7.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return a7
        }

        function aE(a7, a8) {
            a8 = Math.max(a8, aP(a7));
            J[a7].distance = a8
        }

        function aP(a7) {
            return J[a7].distance
        }

        function X() {
            var a7 = {};
            a7[o] = ar(o);
            a7[n] = ar(n);
            a7[d] = ar(d);
            a7[v] = ar(v);
            return a7
        }

        function ar(a7) {
            return {
                direction: a7,
                distance: 0
            }
        }

        function aI() {
            return aY - Q
        }

        function ap(ba, a9) {
            var a8 = Math.abs(ba.x - a9.x);
            var a7 = Math.abs(ba.y - a9.y);
            return Math.round(Math.sqrt(a8 * a8 + a7 * a7))
        }

        function a3(a7, a8) {
            var a9 = (a8 / a7) * 1;
            return a9.toFixed(2)
        }

        function an() {
            if (D < 1) {
                return w
            } else {
                return c
            }
        }

        function aO(a8, a7) {
            return Math.round(Math.sqrt(Math.pow(a7.x - a8.x, 2) + Math.pow(a7.y - a8.y, 2)))
        }

        function aA(ba, a8) {
            var a7 = ba.x - a8.x;
            var bc = a8.y - ba.y;
            var a9 = Math.atan2(bc, a7);
            var bb = Math.round(a9 * 180 / Math.PI);
            if (bb < 0) {
                bb = 360 - Math.abs(bb)
            }
            return bb
        }

        function aH(a8, a7) {
            var a9 = aA(a8, a7);
            if ((a9 <= 45) && (a9 >= 0)) {
                return o
            } else {
                if ((a9 <= 360) && (a9 >= 315)) {
                    return o
                } else {
                    if ((a9 >= 135) && (a9 <= 225)) {
                        return n
                    } else {
                        if ((a9 > 45) && (a9 < 135)) {
                            return v
                        } else {
                            return d
                        }
                    }
                }
            }
        }

        function ao() {
            var a7 = new Date();
            return a7.getTime()
        }

        function aU(a7) {
            a7 = e(a7);
            var a9 = a7.offset();
            var a8 = {
                left: a9.left,
                right: a9.left + a7.outerWidth(),
                top: a9.top,
                bottom: a9.top + a7.outerHeight()
            };
            return a8
        }

        function B(a7, a8) {
            return (a7.x > a8.left && a7.x < a8.right && a7.y > a8.top && a7.y < a8.bottom)
        }
    }
})(jQuery);
(function(a) {
    a.include = function(g, e) {
        var t = document,
            m = "getElementsByTagName",
            f = t[m]("head")[0],
            p = function() {},
            n = {},
            c = 0,
            h = 1,
            o = [],
            d = "script",
            l = "link",
            r;
        !g.pop && (g = [g]);
        e = e || p;

        function s(u, w, j, v) {
            v = (/\.css$/.test(u));
            if (v) {
                j = t.createElement(l);
                j.href = u;
                j.rel = "stylesheet";
                j.type = "text/css";
                f.appendChild(j);
                w()
            } else {
                c++;
                j = t.createElement(d);
                j.onload = function() {
                    q(j, w)
                };
                j.onreadystatechange = function() {
                    /loaded|complete/.test(this.readyState) && q(j, w)
                };
                j.async = !0;
                j.src = u;
                f.insertBefore(j, f.firstChild)
            }
        }

        function q(j, u) {
            i(u);
            n[j.src.split("/").pop()] = 1;
            j.onload = j.onreadystatechange = null;
            j = o._
        }

        function i(u) {
            function j() {
                !--c && e()
            }
            u.length ? u(j) : (u(), j())
        }

        function k(u, v, j) {
            for (v = u.length, j = []; v--; j.unshift(u[v])) {}
            return j
        }(function b(u, j, v, w) {
            if (!t.body) {
                return setTimeout(b, h)
            }
            o = [].concat(k(t[m](d)), k(t[m](l)));
            for (u = o.length; u--;) {
                r = o[u].src || o[u].href;
                r && (n[r.split("/").pop()] = r)
            }
            for (u = g.length; u--;) {
                w = p;
                v = !1;
                g[u].pop ? (j = g[u][0], w = g[u][1], v = g[u][2]) : (j = g[u]);
                n[j.split("/").pop()] || s(j, w, v)
            }!c && e()
        })()
    }
})(Chanel);
$(document).ready(function() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
    $("body").bind("ALL_POPIN_READY", function() {
        if (window.formidableBottomScript && window.formidableBottomScript.length) {
            for (var b = 0; b < window.formidableBottomScript.length; b++) {
                window.formidableBottomScript[b]()
            }
        }
        $(".frm_form_field select").selectBoxIt()
    });
    Chanel.Registry.launchAutoRegister(["Form", "HeaderFlowManager", "OAMRenderer", "Popin", "Popup", "ResizeManager", "ScrollAssistant", "ShareSocialNetworks", "FirstNavManager"]);
    if (Modernizr.ie7) {
        $("body").css({
            zoom: 1
        })
    }
    $("body").bind("DOMInjected", function(c, b) {
        if (!b) {
            return
        }
    });
    if (Modernizr.touch) {
        $("nav").bind("touchstart", function(b) {
            $(b.currentTarget).removeClass("forceClose")
        })
    }
    var a = function() {
        var b = $(".app_services");
        var c = $(".app_workers");
        if (b.length > 0 || c.length > 0) {
            $(".appointments-pagination").addClass("hr")
        }
    }
});
Modernizr.addTest("ios", function() {
    return !!navigator.userAgent.match(/iPhone|iPod|iPad/i)
});
Modernizr.addTest("mobileios", function() {
    return !!navigator.userAgent.match(/iPhone|iPod/i)
});
Modernizr.addTest("ios5less", function() {
    return !!navigator.userAgent.match(/OS [0-5]/i)
});
Modernizr.addTest("mobile", function() {
    if (/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {
        return true
    }
    return false
});