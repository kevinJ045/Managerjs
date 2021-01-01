<h1>Manager Events 1.1</h1>
<p>
	Manager has events for some modules, like forexample lsm,objm...

	this will let you control the initiations of manager module.
</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
window.addEventListener('manager:module',function(event){
	...
});
</pre>

<h3>Available Events</h3>
<p>These are the only available events for Manager V1.1</p>
<ul>
	<li>manager:module</li>
	<li>manager:lsm:set</li>
	<li>manager:lsm:get</li>
	<li>manager:lsm:remove</li>
	<li>manager:require</li>
	<li>manager:extend</li>
	<li>manager:fetch</li>
	<li>manager:objm:set</li>
	<li>manager:objm:get</li>
	<li>manager:objm:ctrl</li>
	<li>manager:script</li>
</ul>