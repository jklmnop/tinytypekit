(function(tinymce) {
        //put your typekit key here
        var typekitKey = 'myu8ome';

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
                  //IE is a jerk, so it isn't supported yet'
                  var isIE = eval("/*@cc_otinyn!@*/!1");
                  if(isIE) {
                    return false;
                  }
                  
                  //Loads Typekit on the parent document. The Typekit service will 403 if 
                  //the iframe attempts to load the CSS. The iframe doesn't have a referrer
                  //so Typekit can't validate the domain
                  var sl = new tinymce.dom.ScriptLoader();
                  sl.add('//use.typekit.com/'+typekitKey+'.js');
                  sl.loadQueue(function(){
                    if(sl.isDone('//use.typekit.com/'+typekitKey+'.js')) {                      
                      sl.add(url + '/js/load.js');
                      sl.loadQueue();
                    }
                  });
                  
                  //Poll to see when the Editor's dom is available.
                  var interval = setInterval(function(){                    
                    if(ed.dom) {                
                      //Some browsers don't like contentDocument and sometimes Typekit with 
                      //a 403.
                      try {
                        //The following code is based on Charles Shada's lovely snippet
                        //http://recklessrecursion.com/2010/10/05/typekit-and-tinymce/
                         var iframe = document.getElementById(ed.id + '_ifr');
                           //this should make it work for IE, but it doesn't.
                           iframe.contentDoc = iframe.contentDocument || iframe.contentWindow.document;

                         //Set up the Typekit script for the iframe
                         var script = iframe.contentDoc.createElement('script');
                             script.type = 'text/javascript';
                             script.src = '//use.typekit.com/'+typekitKey+'.js';

                             //Set up the onload
                             script.onload = function(){ 

                               var loader = iframe.contentDoc.createElement('script');
                               loader.type = 'text/javascript';
                               loader.src = url + '/js/load.js';

                               iframe.contentDoc.getElementsByTagName('head')[0].appendChild(loader); 
                               //Turn design mode back on after Typekit is finished loading
                               iframe.contentDoc.designMode = 'on';

                             };
                             
                             //Turn off design mode before proceeding. It must be off to run JavaScript.
                             iframe.contentDoc.designMode = 'off';
                             iframe.contentDoc.getElementsByTagName('head')[0].appendChild(script); 

                       } catch(e) {}
                       
                     //Stop polling when done
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
				infourl : 'https://github.com/jklmnop/tinytypekit',
				version : "0.1"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('tinytypekit', tinymce.plugins.TinyTypekit);
})(tinymce);