require([
	// loading the core
	'vendors/jquery-1.9.1',
	'core-jquery',
	'sandbox'],
	
	// loading modules
	function() {
		require([
			'modules/module-filter-bar', 
			'modules/module-product-panel', 
			'modules/module-search-box', 
			'modules/module-shopping-cart',
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