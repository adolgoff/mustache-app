require([
	// loading the core
	'vendors/jquery',
	'core-jquery',
	'sandbox'],
	
	// loading modules
	function() {
		require([
			'modules/module-filter-bar', 
			'modules/module-product-panel', 
			'modules/module-search-box', 
			'modules/module-shopping-cart',
			'modules/module-creator'
			],

		// start the application
		function(){
			Core.init()
		});
	}
);
