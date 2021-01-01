Manager.module('ModuleFromExports',['LSM','OBJM'],function(module,exports,require,$lsm,$objm){
	console.groupCollapsed("Manager From A Module");
	var exec = require("exec"); // You can require some manager modules
	var TM = require("TM");	  // Like this to get them with their full
	var randFrom = require("randFrom"); // functionality and potential
	var define = require("define");
	var t = "From A Module";

	console.log(t,randFrom(0,10));

	var _module = function(){
		alert("init");
	};

	var LSM = $lsm;// You can use dependencies to make this module sensitive 
				   // for the modules it needs, if the required module does
				   // not exist in Manager, this function will not work
	var Objm = new $objm('Demo3');
	// Manager ObjManager have 2 methods to set objects,
	Objm.set({ 
		'helloText':'hii',
		'canSetThruObjects': true
	});
	Objm.set("method2","2 arguments");
	console.log(t,Objm);

	console.log(t,this);// You can do whatever you want inside this function,
					    // delare properties,functions,and stuff, and 
					    // will be saved to this module in the manager ModuleList
					    // Manager.__managerProto__.MODULES.ModuleFromExports

	var proto = this.__managerProto__; // This module will have 2 main __proto__
									   // Modules, __managerProto__, Manager
									   // so that you can use:
									   // this.__managerProto__.LSM,.TM etc...

	var win = proto.self; // To have a better response with the window object
						  // use this.__managerProto__.self instead of window
						  // because it will be same as window, but will return
						  // a RootWindowComponent, so exporting now is simpler

	var doc = proto.document; // The Full document info is here, it lets
						 	  // you explore the manager.js file,
						 	  // even if it's not usefull for you
						 	  // it's usefull for manager to Work Properly

	var root = proto.root;// To have a better response with the navigator object
						  // use this.__managerProto__.self instead of navigator
						  // because it will be same as navigator, but will     
						  // return a RootComponent, as same as the self prop   

	this.helloText = "Hello World !!!";//access the module using the 'this' word

	console.log(t,proto);
	
	function ACCESS(name,fun){ // The Main Function
		if(window){
			window[name] = fun;
		}
	}

	exports.utils = { // The Properties of the Main Function
		access: function(name,fun){
			return new ACCESS(name,fun);
		}
	}
	exports._module = _module; // Using exports.MODULENAME is the main part where
							   // You can use forexample ModuleFromExports._module
							   // Outside this function so you wont need to make
							   // ACCESS._module to call '_module', and for some 
							   // exporting problems also use exports.MODULENAME


	module.exports = ACCESS; // Export The Main Function only using 
							 // module.exports Or Else it will be a problem
							 // This is also simple, all you need to do is 
							 // making the main function and adding properties
							 // then making module.exports = MODULENAME
							 // From making Manager.MODULENAME = MODULEFUNCTION

	console.groupEnd("Manager From A Module");
	return "Whatever You Want here"; // This will make a property that can be used 
									 // for some stuff if you need 
});