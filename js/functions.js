
main = main.createModule(function(){  
	
	/* functionals functions */
    var function_map = function(a,f){
        //dump.next('function: map ');
		var b = Array();
        for (var j = 0; j < a.length; j++) {
            b[j] =  f(a[j]);
        }
        //dump.next('function: exit map');
        return b[j];        
    }
	var function_in_array = function(e, g) {
        //dump.next('function: in_array');
        for (var i = 0; i < g.length; i++){
            if(e == g[i]) return e;			          
        }
        //dump.next('function: exit in_array');
    }
	var function_empty_array = function(a){
        if (a.length === 0) {
            //dump.next('array: array empty');
            return false;           
         } else {
             //dump.next('array: array not empty');
             //dump.inspect(t);
             return a;
         }
	}
	/* msg system */
	var do_msg = function(div,msg){		
		var x = document.getElementById(div);
		x.innerHTML = msg;		
		return x;
	}
	var main_msg = function(msg){		
		do_msg(userObj.cfg.div_main, msg);		
	}
	var left_bar_msg = function(msg){		
		do_msg(userObj.cfg.div_aside, msg);		
	}
	var do_home = function(){
		main_msg(userObj.sections.home.msg);
		left_bar_msg(userObj.sections.home.sub_msg);				
	}
	/* main function */
	var function_main = function(a){
		dump.next('function: main');
		var b = userObj.cfg;
 		//var c = myApp.utils;
        var e = a.split("=");
		var x = e[0];
        var y = e[1];
        if(function_in_array(x, b.instances)){
            if(localStorage.getItem('url')){
                localStorage.removeItem('url');
            }
            localStorage.setItem('url', b.server_url + '?' + x + '=' + y);
            try{
				myArray = userObj.sections[y].url;
				myArray.push(localStorage.getItem('url'));								
			} catch(e){
				main_msg("Si e' verificato un errore");
			}			               
        } else {
            try{
				localStorage.setItem('url', localStorage.getItem('url')  + '&' + x + '=' + y);
				myArray.pop();
				myArray.push(localStorage.getItem('url'));                               
			} catch(e) { main_msg("Si e' verificato un errore indefinito");}			
        }
		dump.reset();
		dump.next('function: exit main');        
	}
	return {
		home: do_home, main: function_main , map: function_map, in_array: function_in_array, empty_array: function_empty_array
	}	
});

ajax = ajax.createModule(function(){
	var xmlHttpRequest = function(){
		var xmlHttp = null;	
		try{
			xmlHttp = new XMLHttpRequest();
		}catch(e){
			try{ 
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return xmlHttp;
	}
	var function_ajax_callback = function(response){
		var json_obj = eval("("+response+")");
		var x = localStorage.getItem('section');
		var o = { "do_table" : dom.main_table, "do_select": dom.build_select };
		var f = o[x];
		localStorage.removeItem('section');
		if(typeof (json_obj) == 'object'){
			return f(json_obj, userObj.cfg.div_main, 'my_div');
			//set_f(json_obj,'main','my_div');
		} else return false;
	}
	var ajaX = function(method,url,div,data){
		var httpRequest = xmlHttpRequest();
		var handler = function(){
			var response = httpRequest.responseText;		
			if(httpRequest.readyState == 4){
				if(httpRequest.status == 200){
					var target = document.getElementById(div);
					try{
						function_ajax_callback(response);						
						dump.next('ajax obj ok');
					}catch(e){
						target.innerHTML = response;
					}					
				}
			}
		}
		httpRequest.onreadystatechange = handler;
		httpRequest.open(method,url, true);	
		if( method == "get" ){
			httpRequest.send(null);			
		}		
		if(method == "post"){
			httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
			httpRequest.send(data);
		}		
	}	
	var function_ajaxGet = function(url, div) {	
		return ajaX('get', url, div);
	}	
	return {
		ajaxGet: function_ajaxGet
	}
});
/*
	var set_callback = function(){
		/*	set callback here */		
		/*	----------------- 		
		if(localStorage.getItem('section')){
			var my_item = localStorage.getItem('section');
			if(userObj.sections.localStorage.getItem('section')._function){
				return set_f[my_item];
			}
			//localStorage.removeItem('section');
		}		
	}
	*/




