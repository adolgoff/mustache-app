Core.createModule("creator", function(sb) {
	var header, url, descr, tags, button, self, form;

	var isUrlValid = function(addr) {
		var re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
		return addr.match(re);
	}
	
	function onSended(e){
		sb.notify({
			type : 'created-bookmark'
		});
	}
	 
	return {
		init : function() {
			self = this;
			form = sb.find();
			header = sb.find('#header')[0];
			url = sb.find('#url')[0];
			descr = sb.find('#descr')[0];
			tags = sb.find('#tags')[0];
			button = sb.find('#btn-submit')[0]
			button.disabled = true;
			sb.addEvent(button, "click", this.submitCreator);
			sb.addEvent(url, "change paste keyup", this.checkSubmitInfo);
		},

		destroy : function() {
			sb.removeEvent(url, "change paste keyup", this.checkSubmitInfo);
			sb.removeEvent(button, "click", this.submitCreator);
			data = header = url = descr = tags = self = null;
		},
		
		checkSubmitInfo : function(e){
			var urlInvalid = !Boolean(isUrlValid(url.value));
			button.disabled = urlInvalid;
		},

		submitCreator : function(e) {
			e.preventDefault();
			var urlInvalid = !Boolean(isUrlValid(url.value));
			if (urlInvalid) {
				// dispatching error event to handle it from Alerter module
				sb.notify({
					type : 'input-error',
					data : "Check your text fields"
				});
			} else {
				var addr = url.value;
				addr = addr.indexOf("http") < 0 ? "http://" + addr : addr;
				var addrArray = addr.split("/");
				var data = {
					header : header.value,
					url : addrArray[0] + '//' + addrArray[2] + '/favicon.ico',
					link : url.value,
					descr : descr.value,
					tags : tags.value
				}
				// send ajax post request to save a bookmark and listen to 'onSended' callback
				//_url, method, data, callback
				sb.ajax('/', 'post', data, this.onSended);
			}
			return false;
		},

		hide : function() {

		},

		show : function() {

		}
	};
}); 