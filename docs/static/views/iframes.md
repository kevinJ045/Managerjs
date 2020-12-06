<h1>Manager Iframe Controller</h1>
<p>
	This module let's you controll elements inside iframes,
</p> 

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var iframe_ = new Manager.ifrCtrl('#iframe element','/path/to/someurl');
iframe = iframe_.getIframe();
console.log(iframe);
frame.body.find('elem').toggle();
</pre>
