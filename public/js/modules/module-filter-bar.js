Core.createModule("filters-bar", function (sb) {
    var filters;

    return {
    	
        init : function () {
            filters = sb.find('a');
            sb.addEvent(filters, "click", this.filterProducts);
        }, 
        
        
        destroy : function () {
            sb.removeEvent(filters, "click", this.filterProducts);
            filter = null;
        },
        
        
        filterProducts : function (e) {
            sb.notify({
                    type : 'change-filter',
                    data : e.currentTarget.innerHTML
                });
        }
    };
});