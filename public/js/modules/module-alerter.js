Core.createModule("alerter", function(sb) {
	
	var alerter;
	
	return {
		init : function() {
			alerter = sb.find("#alerter");
			sb.listen({
                'input-error' 	: this.showAlert
            });
		},
		
		destroy : function() {
			sb.ignore(['input-error']);
			alerter = null;
		},
		
		showAlert : function(error){			
			console.warn("Achtung: " + error);
		},
		
		showPreloader : function(){
			
		},
		
		hideAlert: function(){
			
		}
		
	}
	
});
