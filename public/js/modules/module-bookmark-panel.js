Core.createModule("bookmark-panel", function (sb) {
    var self, bookmarks, panelElement, templateLoaded, bookmarksData, bookmarksLoaded;

    function eachBookmark(fn) {
        var i = 0, bookmark;
        for ( ; bookmark = bookmarks[i++]; ) {
            fn(bookmark);
        }
    }
    
    function reset () {
        eachBookmark(function (bookmark) {
            bookmark.style.display = 'inline-block';        
        });
    }
    
    function renderBookmarks(){
    	var allBookmarks = sb.getData('bookmarks');
    }

	function getTemplate(){
		$.get('/templates/template-bookmark.html', function(templateData){
			templateLoaded = templateData;
			if (bookmarksLoaded) renderBookmarks('from templates');
		});
		// sb.ajax('/templates/template-bookmark.html', 'get', {}, function(templateData){
			// console.log(templateData);
			// templateLoaded = templateData;
			// if (bookmarksLoaded) renderBookmarks();
		// });
	}
	
	function getBookmarks(){
		$.get('/data/data.json', function(bookmarksData){
			bookmarksLoaded = bookmarksData;
			if (templateLoaded) renderBookmarks();
		});
		// sb
		// var requestParams = {}; 
		// sb.ajax('/data/data.json', 'get', requestParams, function(bookmarksData){
			// console.log(bookmarksData);
			// bookmarksLoaded = bookmarksData;
			// if (templateLoaded){
				// renderBookmarks();
			// } 
		// });
	}
	
	function renderBookmarks(consLog){
		console.log('renderBookmarks ' + consLog);
		console.log(bookmarksLoaded);
		additionHtml = Mustache.to_html(templateLoaded, bookmarksLoaded);
		//console.log(additionHtml);
		//console.log(panelElement)
		panelElement.innerHTML += additionHtml;
		sb.extend(bookmarksData, bookmarksLoaded);
		bookmarks = sb.find.call(panelElement, "li");
		console.log(bookmarks);
		bookmarksLoaded = null;
	}
	
    return {
        init : function () {
        	self = this, templateLoaded = false, bookmarksData = {};
        	panelElement = sb.find()[0];
//             
            sb.listen({
                'change-filter' : this.changeFilter,
                'reset-filter'  : this.reset,
                'perform-search': this.search,
                'quit-search'   : this.reset,
                'created-bookmark': this.createBookmark
            });
//             
            getTemplate();
            getBookmarks();
            
            //sb.addEvent(panelElement, 'click', self.addToCart);        
        },
        
        destroy : function () {
            sb.removeEvent(panelElement, 'click', self.addToCart);        
            sb.ignore(['change-filter', 'reset-filter', 'perform-search', 'quit-search']);
            self = bookmarks = panelElement = templateLoaded = bookmarksLoaded = false
        },
        
        reset : reset,
        
        changeFilter : function (filter) {
            reset();
            eachBookmark(function (bookmark) {
                if (bookmark.getAttribute("data-8088-keyword").toLowerCase().indexOf(filter.toLowerCase()) < 0) {
                    bookmark.style.display = 'none';
                }
            });
        },
        
        createBookmark : function(data){
 			console.log(data)       	
        },

        search : function (query) {
            reset();
           query = query.toLowerCase();
            eachProduct(function (bookmark) {
                if (bookmark.getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(query) < 0) {
                    bookmark.style.display = 'none';
                }
            });
        }
    };
});