var Sandbox =  {
    create : function (Core, module_selector) {
        var CONTAINER = Core.dom.query('#' + module_selector);
        return {
        	
            find : function (selector) {
                return CONTAINER.query(selector);
            },
            
            
            addEvent : function (element, type, fn) {
                Core.dom.bind(element, type, fn);           
            },
            
            
            removeEvent : function (element, type, fn) {
                Core.dom.unbind(element, type, fn);              
            },
            
            
            notify : function (evt) {
                if (Core.is_obj(evt) && evt.type) {
                    Core.triggerEvent(evt);
                }         
            },
            
            
            listen : function (evts) {
                if (Core.is_obj(evts)) {
                    Core.registerEvents(evts, module_selector);
                }
            },
            
            
            ignore : function (evts) {
                if (Core.is_arr) {
                    Core.removeEvents(evts, module_selector);
                }   
            },
            
            
            create_element : function (el, config) {
                var i, child, text;
                el = Core.dom.create(el);
                
                if (config) {
                    if (config.children && Core.is_arr(config.children)) {
                        i = 0;
                        while(child = config.children[i]) {
                            el.appendChild(child);
                            i++;
                        }
                        delete config.children;
                    }
                    if (config.text) {
                        el.appendChild(document.createTextNode(config.text));
                        delete config.text;
                    }
                    Core.dom.apply_attrs(el, config);
                }
                return el;
            }
        };
    }
}
