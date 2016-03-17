

main = main.extend(function(){
    var init_app= function(){
		dump.next('function: init'); 
		var a = location.search.substr(1);
		var b  = a.split("&");
		if(!a) {
			dump.next('debug: do_home');
            main.home();			
		} else {
			if(a && a.indexOf("&") == -1 || a.indexOf("&") !== -1){
				//dump.next('debug: array query vars -> map f  <- main f');
                dump.reset();
                main.map(b, main.main);                
                dump.reset();
			}           
		}				
        dump.next('function: exit init');        		
	};
	//dom.my_test1();
	var function_do_request = function(){
		var a = userObj.sections;           
        for(var i in a){            
            var my_url = a[i].url;
			//var my_callback = a[i]._function;//var b = "b";
			//my_callback = set_callback(i);//here!!!!!!!!!!!!!
			if (main.empty_array(my_url) && a[i].async == 'y'){
				if(a[i]._function == true){
					localStorage.setItem('section', i);
				}
				dump.next('controllo localstorage ' + localStorage.getItem('section'));
				ajax.ajaxGet(my_url, userObj.cfg.div_main);
				//localStorage.removeItem('section');
				//dom.my_test1();
			}
     	}           
	}	
	return {
		init: init_app, do_request: function_do_request, /* build_ajax_callback: function_ajax_callback */
	}
});

(function(){
	dump.next('debug: program start');
    main.init();
	main.do_request();
	dump.next('debug: program exit');	
})();
