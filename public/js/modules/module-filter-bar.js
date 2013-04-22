Core.createModule("filters-bar", function (sb) {
    var filters;

    return {
    	
        init : function () {
            filters = sb.find('a');
            sb.addEvent(filters, "click", this.filterBookmarks);
        }, 
        
        
        destroy : function () {
            sb.removeEvent(filters, "click", this.filterBookmarks);
            filter = null;
        },
        
        filterBookmarks : function (e) {
            sb.notify({
                type : 'change-filter',
                data : (e.currentTarget.innerHTML == "все") ? "" : e.currentTarget.innerHTML
            });
        }
    };
});