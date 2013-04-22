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
            bookmark.style.display = 'block';        
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
            
            sb.addEvent(panelElement, 'click', self.filterBookmarks);        
        },
        
        destroy : function () {
            sb.removeEvent(panelElement, 'click', self.filterBookmarks);        
            sb.ignore(['change-filter', 'reset-filter', 'perform-search', 'quit-search', 'created-bookmark']);
            self = bookmarks = panelElement = templateLoaded = bookmarksLoaded = false
        },
        
        reset : reset,
        
        changeFilter : function (filter) {
            reset();
            var tagFilter = '<a href="#' + filter + '">' + filter + '</a>' 
            var el;
            eachBookmark(function (bm) {
            	el = bm.getElementsByClassName("tags")[0];
                if (el.innerHTML.toLowerCase().indexOf(tagFilter.toLowerCase()) < 0) {
                    bm.style.display = 'none';
                }
            });
        },
       
        // TODO: Adding new bookmark to panel 
        createBookmark : function(data){
 			console.log(data)       	
        },

        search : function (query) {
            reset();
            query = query.toLowerCase();
            console.log("Searching: " + query);
            eachBookmark(function (bm) {
                if (bm.innerHTML.toLowerCase().indexOf(query) < 0) {
                    bm.style.display = 'none';
                }
            });
        },
        
        filterBookmarks : function (e) {
        	var tgt =  e.target || e.srcElement;
        	if (tgt.parentNode.className === "tags"){
	            sb.notify({
	                type : 'change-filter',
	                data : tgt.innerHTML
	            });
           	}
        }
        
        
    };
});