Core.createModule("product-panel", function (sb) {
    var products;

    function eachProduct(fn) {
        var i = 0, product;
        for ( ; product = products[i++]; ) {
            fn(product);
        }
    }
    
    function reset () {
        eachProduct(function (product) {
            product.style.display = 'inline-block';        
        });
    }

    return {
        init : function () {
            var that = this;
            
            products = sb.find("li");
            sb.listen({
                'change-filter' : this.changeFilter,
                'reset-filter'  : this.reset,
                'perform-search': this.search,
                'quit-search'   : this.reset,
                'creator-submit': this.createBookmark
            });
            eachProduct(function (product) {
                sb.addEvent(product, 'click', that.addToCart);        
            });
        },
        destroy : function () {
            var that = this;
            eachProduct(function (product) {
                sb.removeEvent(product, 'click', that.addToCart);        
            });
            sb.ignore(['change-filter', 'reset-filter', 'perform-search', 'quit-search']);
        },
        
        reset : reset,
        
        changeFilter : function (filter) {
            reset();
            eachProduct(function (product) {
                if (product.getAttribute("data-8088-keyword").toLowerCase().indexOf(filter.toLowerCase()) < 0) {
                    product.style.display = 'none';
                }
            });
        },
        
        createBookmark : function(data){
 			console.log(data)       	
        },

        search : function (query) {
            reset();
           query = query.toLowerCase();
            eachProduct(function (product) {
                if (product.getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(query) < 0) {
                    product.style.display = 'none';
                }
            });
        },
        
        addToCart : function (e) {
            var li = e.currentTarget;
            sb.notify({
                type : 'add-item',
                data : { id : li.id, name : li.getElementsByTagName('p')[0].innerHTML, price : parseInt(li.id, 10) }
            });
        }
    };
});