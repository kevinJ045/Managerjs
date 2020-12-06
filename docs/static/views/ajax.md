<h1>Manager Ajax</h1>
<p>This module is known everywhere, starting from little wbsites upto big sites, it is by far a very amazing feature, and Manager supports it, here are some snippets</p> 


<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var http = new Manager.http();
console.log(http.get('someurl')); // this will return the normal text<br>

// Getting json <br>
http.getJson('somejson',function(response){
    console.log(response); //This will return a JSON Object<br>
});

//Getting XML <br>
http.getXml('somexml',function(response){
    console.log(response); // returns an DOM object, like document <br>
});
</pre>

<h3>Getting texts</h3>
<pre class="mngr-code jsHigh">
var http = new Manager.http();
var data = http.get('file.txt');
</pre>
<p>The above code will return the file as text/plain</p>

<h3>Getting JSONs</h3>
<pre class="mngr-code jsHigh">
var http = new Manager.http();
var data = {};
http.getJson('file.json',function(response){
    data = response //This will return a JSON Object<br>
});
</pre>
<p>The above code will return the file as a json object</p>

<h3>Getting XMLs</h3>
<pre class="mngr-code jsHigh">
var http = new Manager.http();
var data = {};
ttp.getXml('file.xml',function(response){
    data = response.getElementById('id').innerHTML //This will return a DOM Object<br>
});
</pre>
<p>The above code will return the file as a DOM object,with the mime text/html</p>

<h3>Using Manager.fetch</h3>
<p>This is not much required, but for anycase i made using Manager Http simpler here.</p>
<pre class="mngr-code jsHigh">
Manager.fetch("someurl",function(data){
    console.log(data); // Will return fetchedDatas Object<br>
    console.log(data.json()) // As JSON<br>
    console.log(data.xml()) // As XML<br>
    console.log(data.text()) // As Text<br>
    console.log(data.data()) // As Text<br>
});
</pre>


