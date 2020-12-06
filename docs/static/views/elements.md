<h1>Manager element controller</h1>
<p>
	This module lets you for example animate elements 
	from json objects,
</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
Manager.animate('element',{
  "0%":{
    "background": "red",
    "opacity": '0.5',
  },
  "100%":{
    "background": "blue",
    "opacity": "1",
  }
},"infinite",2000);
</pre>