(function() {   
	this.cfg = {
		server_url : 'php/response.php',
		instances: ['action', 'my_action','test'],        
		div_aside : '_aside',
		div_main : 'main',
	},
	this.sections = {
		home: {
			async: 'n',
			msg: 'Hello, this is home!',
            sub_msg : 'Home',
			url: [],			
			_function: false
		},
        m_table : {
			async: 'y',			
            url: [],
            _function: false            
		},
		m_select : {
			async: 'y',			
            url: [],
            _function: false            
		},
		test_string : {
			async: 'y',		
            url: [],
            _function: false
		},
        do_table : {
			async: 'y',		
            url: [],			
            _function: true
		},				
		do_select : {
            async: 'y',		
            url: [],
            _function: true
        },
		test_local: {
			async: 'n',		
			msg: 'Just for test local configuration :-)',		
            url: [],
            _function: true
		}
	}		    
}).apply(userObj);

//dump.next('debug: inspecting namespace-module');
//dump.inspect(main.root);


