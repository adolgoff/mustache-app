Core.createModule("alerter", function(sb) {
	
	var alerter, hideAlert, self;

	function addEscapeListener(e){
		sb.addEvent(document, "keyup", onKeyUp);
	}
	
	function removeEscapeListener(e){
		sb.removeEvent(document, "keyup", onKeyUp);
	}

	function onKeyUp(e){
		if (e.keyCode == 27) hideAlert();
	}

	
	return {
		init : function() {
			self = this;
			alerter = sb.find()[0];
			hideAlert = this.hideAlert;
			sb.listen({
                'input-error' : this.showAlert
            });
            console.log(alerter);
		},
		
		destroy : function() {
			sb.ignore(['input-error']);
			alerter = null;
		},
		
		showAlert : function(error){
			alerter.style.display = "block";
			sb.addEvent(alerter, "click", self.hideAlert);
			addEscapeListener();
		},
		
		
		hideAlert: function(){
			alerter.style.display = "none";
			sb.removeEvent(alerter, "click", this.hideAlert);
			removeEscapeListener();
		},
		
		showPreloader : function(){
			
		},
		
		hidePreloader : function(){
		}
		
	
	}
	
});
