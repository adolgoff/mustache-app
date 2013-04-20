Core.createModule("shopping-cart", function (sb) {
    var cart, cartItems;
    
    return {
        init : function () {
            cart = sb.find("ul")[0];
            cartItems = {};

            sb.listen({
                'add-item' : this.addItem        
            });
        },
        
        destroy : function () {
            cart = cartItems = null;
            sb.ignore(['add-item']);
        },
        
        addItem : function (product) {
            var entry; 
            entry = sb.find('#cart-' + product.id + ' .quantity')[0];
            if (entry) {
                entry.innerHTML = parseInt(entry.innerHTML, 10) + 1;
                cartItems[product.id]++;
            } else {
                entry = sb.create_element("li", { id : "cart-" + product.id, children : [
                            sb.create_element("span", { 'class' : 'product_name', text : product.name }),
                            sb.create_element("span", { 'class' : 'quantity', text : '1' }),
                            sb.create_element("span", { 'class' : 'price', text : '$' + product.price.toFixed(2) })
                        ],
                        'class' : 'cart_entry' });
                cart.appendChild(entry);
                cartItems[product.id] = 1;
            }
        }
    };
});
