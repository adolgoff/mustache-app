Core.createModule("search-box", function(sb) {
    var input, button, reset, quitSearch;

	function addEscapeListener(e){
		sb.addEvent(document, "keyup", onKeyUp);
	}
	
	function removeEscapeListener(e){
		sb.removeEvent(document, "keyup", onKeyUp);
	}

	function onKeyUp(e){
		if (e.keyCode == 27) quitSearch();
	}

    return {
        init : function () {
            input = sb.find("#search_input")[0],
            button = sb.find("#btn-search")[0],
            reset  = sb.find("#btn-quit")[0];
			quitSearch = this.quitSearch;            
			
            sb.addEvent(button, "click", this.handleSearch);
            sb.addEvent(reset, "click", this.quitSearch);
            sb.addEvent(input, "focus", addEscapeListener);
            sb.addEvent(input, "focusout", removeEscapeListener);
        },
        
        destroy : function () {
            sb.removeEvent(button, "click", this.handleSearch);
            sb.removeEvent(reset, "click", this.quitSearch);
            sb.removeEvent(input, "focus", addEscapeListener);
            sb.removeEvent(input, "focusout", removeEscapeListener);
            quitSearch = input = button = reset = null;
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
        	if (e) e.preventDefault();
        	history.pushState ? history.pushState("", document.title, window.location.pathname + window.location.search) : loc.hash = "";
            input.value = "";
            sb.notify({
                type : 'quit-search',
                data : null
            });
        }
    };
});