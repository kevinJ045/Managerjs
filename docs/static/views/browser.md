<h1>Manager Browser Info</h1>
<p>This module gives you the full browser information</p>
<p>it gives you the version,browser name,platform as an object</p>

<h3>Usage</h3>
<p>Basic Usage to show the info of the browser</p>
<pre class="mngr-code jsHigh">
console.log(Manager.browser.browser);
console.log(Manager.browser.version);
console.log(Manager.browser.platform);
console.log(Manager.browser.build);
</pre> 

<h3>Using "is" method</h3>
<p>This method is available for browser and platform, you can use them like <code>isBrowser("browser name"),isPlatform("platform name")</code>,</p> but you can use isVersion like <br><code>isVersion.isMoreThan(version),<br>isVersion.isOrLess(version)</code></p>
<pre class="mngr-code jsHigh">
var isIE;
if($.m.browser.isBrowser('msie') && $.m.browser.isVersion.isOrLess(8)){
	isIE = 'IE, and version is or less than 8.0.';
} else if ($.m.browser.isBrowser('msie') && $.m.browser.isVersion.isMoreThan(8)) {
	isIE = 'IE, and version is more than 8.0.';
} else {
	isIE = 'NOT IE.';
}
console.log(isIE);
</pre>
