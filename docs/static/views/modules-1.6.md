<h1>Manager Modules 1.1</h1>
<p>This module is soo simple but very usefull, you know nodejs right? this enables you to use a simple module system like nodejs, but this one is diffrent, just you don't need to define(), you will need to module(), and i mean it</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
Manager.module('ModuleName',['dependency1','dependency2'],
function(module,exports,require,dependency1,dependency2){
	var LSM = require("LSM");
	new LSM("name");

	this.prop = "...";

	function functionName(){
		...
	}

	this.something = exports;

	dependency1(...);
	dependency2(...);

	exports.prop = "...";
	module.exports = functionName;
});
</pre>

