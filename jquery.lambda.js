(function($){
    var Fs = ['ajax', 'get', 'getJSON', 'getScript', 'post'];
    
    var m = function(f){
        // The returned object from each chained method.
        // Is both callable and chainable 
        var g = function(){ return (f({j: $(this)})).r; };
        
        // Function attached to each element 
        var cb =  function(h){ 
                    return function(){
                      var b = arguments;
                      return m(function(o){
                          var fo = f?f(o):o;
                          fo.j = h.apply(fo.j, b);
                          return fo;
                      });
                  };
                };

        // Make each element of our function callable
        for(var i in $.fn){
            g[i] = cb($.fn[i]);
        }
        
        // Add $ function
        g.$ = g.init;
        
        // Add functions in array Fs
        for(var j=0; j<Fs.length;j++){
            g.$[Fs[j]] = cb($[Fs[j]]);
        }
        
        // Add return functionality
        g.ret = function(s){
                    return m(function(o){
                        var fo = f?f(o):o;
                        fo.r = s;
                        return fo;
                    });
                };
                  
        return g;
    };

    window.$l = m();

})(jQuery);
