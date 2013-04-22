require([
	// loading the core
	'vendors/jquery-1.9.1',
	'core-jquery',
	'sandbox'],
	
	// loading modules
	function() {
		require([
			'modules/module-search-box', 
			'modules/module-creator',
			'modules/module-alerter',
			'modules/module-bookmark-panel' 
			],

		// start the application
		function(){
			Core.init()
		});
	}
);


//TODO: Handle escape key on forms
//TODO: Make Alerter module to handle errors 
//TODO: Make rails service to get new Bookmark