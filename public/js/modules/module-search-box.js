Core.createModule("search-box", function(sb) {
    var input, button, reset;

    return {
        init : function () {
            input = sb.find("#search_input")[0],
            button = sb.find("#btn-search")[0],
            reset  = sb.find("#btn-quit")[0];
            
            sb.addEvent(button, "click", this.handleSearch);
            sb.addEvent(reset, "click", this.quitSearch);
            
            console.log(button);
        },
        
        destroy : function () {
            sb.removeEvent(button, "click", this.handleSearch);
            sb.removeEvent(button, "click", this.quitSearch);
            input = button = reset = null;
        },
        
        handleSearch : function (e) {
        	e.preventDefault();
            var query = input.value;
            if (query) {
                sb.notify({
                    type : 'perform-search',
                    data : query
                });
            }
        },
        quitSearch : function (e) {
        	e.preventDefault();
        	history.pushState ? history.pushState("", document.title, window.location.pathname + window.location.search) : loc.hash = "";
            input.value = "";
            sb.notify({
                type : 'quit-search',
                data : null
            });
        }
    };
});