Core.createModule("bookmark-panel", function (sb) {
    var bookmarks, templateLoaded;

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

    return {
        init : function () {
            templateLoaded = false;
            bookmarks = sb.find("li");
            sb.listen({
                'change-filter' : this.changeFilter,
                'reset-filter'  : this.reset,
                'perform-search': this.search,
                'quit-search'   : this.reset,
                'created-bookmark': this.createBookmark
            });
            eachBookmark(function (bookmark) {
                sb.addEvent(bookmark, 'click', that.addToCart);        
            });
            
            
            // trying templating
            
            $(function(){
 
				var tmpl, 	// Main template HTML
				tdata = {}	// JSON data object that feeds the template
			 
				var initPage = function(){
					$.get(
						'templates/template-bookmark.html',
						function(d){
							tmpl = d
							$.getJSON(
								"data/data.json",
								function(d){
									$.extend(tdata,d);
									console.log(Mustache.to_html(tmpl, tdata));//, tmpl, JSON.stringify(tdata), renderedPage);
								}
							)
						}
					)											
				}()
			})
            
            
            
        },
        destroy : function () {
            var that = this;
            eachBookmark(function (bookmark) {
                sb.removeEvent(bookmark, 'click', that.addToCart);        
            });
            sb.ignore(['change-filter', 'reset-filter', 'perform-search', 'quit-search']);
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