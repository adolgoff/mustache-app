require([
	// loading the core
	'vendors/jquery',
	'vendors/mustache.min',
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
			'modules/module-alerter'
			],

		// start the application
		function(){
			Core.init()
		});
	}
);
