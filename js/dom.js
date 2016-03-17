//document.getElementById(element)
dom = dom.createModule( function(){
	var test1 = function(){
		if(document.getElementById('container')) alert('dom funzionante');
	};
	var handleObj = function(response){
		this.obj = response;
	    this.set_obj = function(){
		    this.name = this[name];
		    for(var s in this){
			    this.name = this[s];
		    }
	    }
		this.call_names = function(){
		    for(var i in this.obj){
			    this.set_obj.call(this, this.set_obj[i]);			
		    }
	    }
    }  
	var mainTable = function(object, target, id){
		var initObj = new handleObj(object);		
		var div = document.getElementById(target);
		var t = document.createElement('table');
		t.setAttribute('id',id);		
		/* thhead */
		var th = document.createElement('thead');
		var rh = document.createElement('tr');
		/* tfoot */
		var tf = document.createElement('tfoot');	
		var rf = document.createElement('tr');		
		for (var x in initObj.obj[0]){	
			/* thhead */		
			var dh = document.createElement('th');			
			var dht = document.createTextNode(x);
			dh.appendChild(dht);
			rh.appendChild(dh);
			/* tfoot */
			var df = document.createElement('td');
			var dft = document.createTextNode('tfoot');
			df.appendChild(dft);
			rf.appendChild(df);
		}
		/* thhead */
		th.appendChild(rh);
		t.appendChild(th);			
		/* tfoot */
		tf.appendChild(rf);
		t.appendChild(tf);
		/* tbody */
		var tb = document.createElement('tbody');
		dump.next('debug: control dom');
		for (var i in initObj.obj){
			var r = document.createElement('tr');
			initObj.call_names();			
			for (var y in initObj.obj[i]){
				var d = document.createElement('td');
				var a_ = document.createElement('A');
				var obj_text = document.createTextNode(initObj.obj[i][y]);
				a_.appendChild(obj_text);				
				d.appendChild(a_);		
				r.appendChild(d);
				/*
				a_.href = doLink('index.php','f_edit',i,this);
				a_.href = 'index.html?action=edit&thbs=' + get('tabs') + '&id=' + this.obj[i]['id'];
				*/
			}
			tb.appendChild(r);
		}
		/* chiude tabella */
		t.appendChild(tb);
		/* appende child nel div */
		div.appendChild(t);		
	}
	var buildSelect = function(object,target,id){
		var div = document.getElementById(target);
		var s = document.createElement('select');
		s.setAttribute('id',id);
		div.appendChild(s);
		option = function(value,txt){
			var my_option = document.createElement('option');
			my_option.value = value;
			my_option.text = txt;		
			//var sel = document.getElementById(id);
			s.add(my_option, null);		
		}
		var a = new handleObj(object);
		dump.log('init HandleObj');
		for (var i in a.obj){
			dump.next('loop with first row obj');
			a.call_names();
			dump.next('call the obj method call_names');			
			for (var y in a.obj[i]){
				//option(a.obj[i]['Email'],a.obj[i]['Email']);
				option(a.obj[i].Email,a.obj[i].Email);
				dump.next('loop single obj proprierties');
			}

		}
		dump.next('close section');		
	}
	return {
		main_table: mainTable, build_select: buildSelect, my_test1: test1
	}	
});
//dom.my_test1();

