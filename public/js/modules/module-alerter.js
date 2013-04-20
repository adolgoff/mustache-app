Core.createModule("alerter", function(sb) {
	
	var alerter;
	
	return {
		init : function() {
			alerter = sb.find("#alerter");
			sb.listen({
                'input-error' 	: this.alertError
            });
		},
		destroy : function() {
			sb.ignore(filters, "creator-submit", this.submitCreator);
			alerter = null;
		},
		showAlert : function(){			
		},
		showPreloader : function(){}
	}
	
});
