<h1>Extras</h1>
<p>Extras are some modules that are usefull to retrive data from the base Manager 
Object</p>
<p danger>Note: Don't use these extras if not required</p>
<p danger>Note: Only Available in manager 1.1.6</p>

<h3>The Modules</h3>
<ul>
	<li>$root</li>
	<li>$global</li>
	<li>$instance</li>
	<li>$main</li>
</ul>

<h3>Usage</h3>
<p>Instead of using:</p>
<pre class="mngr-code jsHigh">navigator</pre>
<p>Use:</p>
<pre class="mngr-code jsHigh">Manager.$root</pre>

<p>Good To use:</p>
<pre class="mngr-code jsHigh">window</pre>
<p>You can also use:</p>
<pre class="mngr-code jsHigh">Manager.$global</pre>

<p>Instead of using:</p>
<pre class="mngr-code jsHigh">new Manager();</pre>
<p>Use:</p>
<pre class="mngr-code jsHigh">Manager.$instance</pre>

<p>Instead of using:</p>
<pre class="mngr-code jsHigh">Manager</pre>
<p>To get the main object Use:</p>
<pre class="mngr-code jsHigh">Manager.$main</pre>

