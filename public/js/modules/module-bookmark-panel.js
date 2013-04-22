Core.createModule("bookmark-panel", function (sb) {
    var self, bookmarks, panelElement, 
    templateLoaded, bookmarksLoaded, bookmarksData,
    config = {
		templateUrl: "/templates/template-bookmark.html",
		dataUrl: "/data/data.json"
	}
	
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
		sb.ajax(config.templateUrl, 'get', {}, function(templateData){
			templateLoaded = templateData;
			if (bookmarksLoaded) renderBookmarks();
		});
	}
	
	function getBookmarks(){
		var requestParams = {}; 
		sb.ajax(config.dataUrl, 'get', requestParams, function(bookmarksData){
			bookmarksLoaded = bookmarksData;
			if (templateLoaded) renderBookmarks();
		});
	}
	
	function renderBookmarks(consLog){
		additionHtml = Mustache.to_html(templateLoaded, bookmarksLoaded);
		panelElement.innerHTML += additionHtml;
		sb.extend(bookmarksData, bookmarksLoaded);
		bookmarks = sb.find.call(panelElement, "li");
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
            
            sb.addEvent(panelElement, 'click', self.addToCart);        
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