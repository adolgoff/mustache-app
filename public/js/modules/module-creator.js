Core.createModule("creator", function(sb) {
	var header, url, descr, tags, button, self;

	var isUrlValid = function(addr) {
		var re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
		return addr.match(re);
	}
	
	function onSended(){
		sb.notify({
			type : 'creator-submit',
			data : {
				header : this.header.value,
				url : this.url.value,
				descr : this.descr.value,
				tags : this.tags.value
			}
		});
	}
	 
	return {
		init : function() {
			self = this;
			header = sb.find('#header');
			url = sb.find('#url');
			descr = sb.find('#descr');
			tags = sb.find('#tags');
			button = sb.find('#create-form')
			sb.addEvent(button, "click", this.submitCreator);
		},

		destroy : function() {
			sb.removeEvent(button, "click", this.submitCreator);
			data = header = url = descr = tags = self = null;
		},

		submitCreator : function(e) {
			e.preventDefault();
			var tgt = e.target || e.srcElement;
			var urlInvalid = !Boolean(isUrlValid(this.url.value));
			if (tgt.id !== 'btn-submit' || header.value == "" || urlInvalid) {
				// dispatch error event to handle it from Alerter module
				sb.notify({
					type : 'input-error',
					data : "Check your text fields"
				});
				return false;
			} else {
				
				return false;
			}
		},

		hide : function() {

		},

		show : function() {

		}
	};
}); 