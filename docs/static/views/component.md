<h1>Manager HTML components</h1>
<p>
	This module is a module which let's you create HTML elements as elements and not as texts, and it appends it to the element you want, it also has fullscreen and filepicker properties
</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var comp = new Manager.component("body");
if(comp.Fullscreen.isOpen == true){
	comp.Fullscreen.close();
} else {
	comp.Fullscreen.open();
}

var newEl = comp.nel('section'); // new Element <br>
newEl.attr({
  "id": 'componentList',
});
newEl.output(); // You can use newEl.outputTo("element selector"); instead<br>

comp.fileChooser(function(evt,event,input){
	console.log(evt.target.result);
},"data");
</pre>

<h3>getHeader prop</h3>
<p> This function been drived from php getHeader(...) method, this submodule lets you get the navbar of your html page, or the element you want, just be sure to have a file named header.html and to put an parameter that will indicate the elemen to put the header to,
<br>and as we have declared "comp" before, we can use it here</p>
<pre class="mngr-code jsHigh">
comp.getHeader();
comp.getHeader("head");
</pre>

<h3>getFooter prop</h3>
<p>This one is as same as the getHeader prop, but this one is for footers</p>
<pre class="mngr-code jsHigh">
comp.getFooter();
comp.getFooter("#something");
</pre>

<h3>Full Screen</h3>
<p>This submodule is a submodule where changes the state to fullscreen and changes it back again when needed, you can do that with other methods, but this one is simpler</p>
<pre class="mngr-code jsHigh">
if(comp.Fullscreen.isOpen == true){
 comp.Fullscreen.close();
} else {
 comp.Fullscreen.open();
}
</pre>

<h3>New Element</h3>
<p>This submodule lets you make html tags as nodes, like a createElement, but with jquery and makes it better and more controlable</p>
<pre class="mngr-code jsHigh">
var newEl = comp.nel("div");
newEl.html("html");
</pre>
<p>See, soo simple</p>

<h3>Table Rows</h3>
<p>This submodule lets you make table rows like nodes, but it's simpler cause you can create a full row with lots of cols</p>
<pre class="mngr-code jsHigh">
var newRow = comp.tableRow({
 html: "col1",
 attrs: {
  "id": "identity",
  "onclick": "alert('hii')"
 }
});
newRow.appendTo("table");
</pre>

<h3>File Chooser</h3>
<p>We sometimes need buttons for opening files and choosing, sometimes we hide the input file element, sometimes we use the click() method, but not anymore, all you need to do is going with javascript</p>
<pre class="mngr-code jsHigh">
comp.fileChooser(function(evt,event,input){
 console.log(evt.target.result);
},"data");
</pre>

