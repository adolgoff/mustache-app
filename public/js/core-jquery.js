/*
 * @author	Alex Dolgov 
 * @email	a.n.dolgov@gmail.com
 * 
 * The Core object is the application Core, connected to jQuery and modules on the other side.
 * 
 * It can: 
 *
 * 1. createModule (module ID : str, fn (sb))	// registers a module in the Core
 * 2. start (module ID)							//
 * 3. stop (module ID)							// 
 * 4. startAll() 								// starting all modules
 * 5. stopAll()									// stopping all modules 
 * 6. registerEvents							//
 * 7. triggerEvent								// working with events, adding 
 * 8. removeEvents								// removinf and firing them
 * 9. log 										//
 * 10. dom methods: query, bind, unbind, create, apply_attrs(el, attrs)
 */
var Core = (function () {
    var modules = {},
    to_s = function (anything) { return Object.prototype.toString.call(anything); },
    debug = true;
	var self;
    return {
        debug : function (on) {
            debug  = on ? true : false;
        },
        createModule : function (moduleID, creator) {
            var temp;
            if (typeof moduleID === 'string' && typeof creator === 'function') {
                temp = creator(Sandbox.create(this, moduleID));
                if (temp.init && typeof temp.init === 'function' && temp.destroy && typeof temp.destroy === 'function') {
                    temp = null;
                    modules[moduleID] = {
                        create : creator,
                        instance : null
                    };
                } else {
                    self.log(1, "Module '" + moduleID + "' Registration : FAILED : instance has no init or destory functions");
                }
            } else {
                self.log(1, "Module '" + moduleID + "' Registration : FAILED : one or more arguments are of incorrect type");
            }
        },
        
        
        init : function () {
            self = this;
            var moduleID;
            for (moduleID in modules) {
	            self.log(1, moduleID);
                if (modules.hasOwnProperty(moduleID)) {
                    self.start(moduleID);
                }
            }
            self.log(1, "Start all modules");
        },
        
   
        deinit : function () {
            var moduleID;
            for (moduleID in modules) {
                if (modules.hasOwnProperty(moduleID)) {
                    self.stop(moduleID);
                }
            }
        },
   
   
       start : function (moduleID) {
            var mod = modules[moduleID];
            if (mod) {
                mod.instance = mod.create(Sandbox.create(this, moduleID));
                mod.instance.init();
            }
        },
        
             
        stop : function (moduleID) {
            var data;
            if (data = modules[moduleId] && data.instance) {
                data.instance.destroy();
                data.instance = null;
                self.log(1, "Stop all modules");
            } else {
                self.log(1, "Stop Module '" + moduleID + "': FAILED : module does not exist or has not been started");
            }
        },
        
             
        registerEvents : function (evts, mod) {
            if (this.is_obj(evts) && mod) {
                if (modules[mod]) {
                    modules[mod].events = evts;
                } else {
                    self.log(1, "");
                }
            } else {
                self.log(1, "");
            }
        },
        
        
        triggerEvent : function (evt) {
            var mod;
            for (mod in modules) {
                if (modules.hasOwnProperty(mod)){
                    mod = modules[mod];
                    if (mod.events && mod.events[evt.type]) {
                        mod.events[evt.type](evt.data);
                    }
                }
            }
        },
        
        
        removeEvents : function (evts, mod) {
            if (self.is_obj(evts) && mod && (mod = modules[mod]) && mod.events) {
                delete mod.events;
            } 
        },
        
        
        log : function (severity, message) {
            if (debug) {
                console[ (severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
            } 
        },
        
        dom : {
            query : function (selector, context) {
                var ret = {}, that = this, jqEls, i = 0;

                if (context && context.find) {
                    jqEls = context.find(selector);
                } else {
                    jqEls = jQuery(selector);
                }
                
                ret = jqEls.get();
                ret.length = jqEls.length;
                ret.query = function (sel) {
                    return that.query(sel, jqEls);
                }
                return ret;
            },
            
            bind : function (element, evt, fn) {
                if (element && evt) {
                    if (typeof evt === 'function') {
                        fn = evt;
                        evt = 'click';
                    }
                    jQuery(element).bind(evt, fn);
                } else {
                   self.log (1,"Wrong arguments");
                }
            },
            
            unbind : function (element, evt, fn) {
                if (element && evt) {
                    if (typeof evt === 'function') {
                        fn = evt;
                        evt = 'click';
                    }
                    jQuery(element).unbind(evt, fn);
                } else {
                   self.log (1, "Wrong arguments");
                }
            },
            create: function (el) {
                return document.createElement(el);        
            },
            apply_attrs: function (el, attrs) {
                jQuery(el).attr(attrs);             
            }
        },
        
        /* ==== U T I L S ====  */ 
        
        is_arr : function (arr) {
            return jQuery.isArray(arr);         
        },
        
        is_obj : function (obj) {
            return jQuery.isPlainObject(obj);         
        }
    };

}());
