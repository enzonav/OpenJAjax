dump.log();

var myApp = (function () {
    var Namespace = function () {};
    var Module = function () {};
    Namespace.prototype.createModule  = function () {
        var m = new Module;
        if(arguments.length > 0)
            m.extend.apply(m, Array.prototype.slice.apply(arguments));
			//dump.next('debug: creating module');
        return m;
    };
    Module.prototype.extend = function (fn) {
        var argArray,
            results,
            resultKey,
            namespace = this;
        argArray = Array.prototype.slice.apply(arguments).slice(1);
        this._private = this._private || {};
        results = fn.apply(this._private, argArray);
        for(resultKey in results) {
            if(results.hasOwnProperty(resultKey)) {
                namespace[resultKey] = results[resultKey];
            }
        }
        return this;
	}
    var myApp = new Module();
    myApp.namespace = function (ns) {
		//dump.next('debug: creating namespace');
        return ns ? ns : new Namespace();
    }
    myApp.createModule = Namespace.prototype.createModule;
    /*
    myApp is special since it is both a module (for functionality) and a scope
    */
	return myApp;
}());

//dump.next('debug: creating namespaces');
var userObj = myApp.namespace(userObj);
var dom = myApp.namespace(dom);
var main = myApp.namespace(main);
var ajax = myApp.namespace(ajax);

/* Creating namespaces is pretty easy:
-ns_module.js
company = app.namespace(company);
company.master= app.namespace(company.master)

This is honestly little more than a simple wrapper around the scoping approach discussed 
previously.
It does make the objects have a namespace class which gives them the ability to define modules.
The cool thing is that ‘this’ will refer to a private-by-convention stash that you can use to keep 
things out of the face of the users of your library. 
The public API is handled similarly to the revealing module pattern by returning an object.
-user_module.js
company.master.users = company.master.createModule( function(){
    var RevealedClass, hiddenFunction    
    RevealedClass = function(){
        // stuff
    };
    hiddenFunction = function(){};    

    // this is the private area of the module
    this.privateThing = 42;

    return {
        Revealed:RevealedClass,
    };
});


In a different file, you can use these private bits:
-user_exposed.js
company.master.users = company.master.users.extend(function(){
    // use it
    var myLocalThing = this.privateThing,
        ExposedClass = function(){
        };
 
    return {
        Exposed:ExposedClass
    }
});

And finally, if you need jQuery or anything else within your module functions, just add it to 
the extension function declaration and pass it to the createModule()/extends() method.
company.master.users = company.master.users.extend(function($, log){
}, $, loggingSystem);


*/
