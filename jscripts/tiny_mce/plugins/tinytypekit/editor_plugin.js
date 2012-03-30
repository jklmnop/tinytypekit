(function(tinymce) {

	tinymce.create('tinymce.plugins.TinyTypekit', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
                  
                  var sl = new tinymce.dom.ScriptLoader();
                  sl.add('//use.typekit.com/myu8ome.js');
                  sl.loadQueue(function(){
                    if(sl.isDone('//use.typekit.com/myu8ome.js')) {
                      sl.add('../jscripts/tiny_mce/plugins/tinytypekit/js/load.js');
                      sl.loadQueue();
                    }
                  });
                  
                  var interval = setInterval(function(){                    
                    if(ed.dom) {                
                      
                     var iframe = document.getElementById(ed.id + '_ifr');                    
                         
                     var script = iframe.contentDocument.createElement('script');
                         script.type = 'text/javascript';
                         script.src = '//use.typekit.com/myu8ome.js';
                         
                         script.onload = function(){ 
                           
                           var loader = iframe.contentDocument.createElement('script');
                           loader.type = 'text/javascript';
                           loader.src = '../jscripts/tiny_mce/plugins/tinytypekit/js/load.js';
                           
                           iframe.contentDocument.getElementsByTagName('head')[0].appendChild(loader); 
                           iframe.contentDocument.designMode = 'on';
                           
                         };                    
                           
                           iframe.contentDocument.designMode = 'off';
                           iframe.contentDocument.getElementsByTagName('head')[0].appendChild(script);                     
                           
                         
                       
                     clearInterval(interval);
                    }
                  }, 100);
                        
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'TinyTypekit',
				author : 'Jason Kühn',
				authorurl : 'http://jasonku.hn',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('tinytypekit', tinymce.plugins.TinyTypekit);
})(tinymce);