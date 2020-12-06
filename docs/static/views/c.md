<h1>Manager Cookies</h1>

<p>
	Cookies let you store user information in web pages.
	Cookies are data, stored in small text files, on your computer.

	Manager Cookies are like that, they make native cookies but in a simpler way, Manager let's you store JSON objects inside cookies, otherwise use <code>$.cookie(name,value)</code>,

	<br>
	<br>

	Also Manager Cookies are a property of 
	<a href="javascript:void(0)" data-href="/LSM" class="nav__link">Manager LSM</a>
</p> 

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var lsm = new Manager.LSM("name");
lsm.cookie.options = {
  expires: 690,
  path: "/"
};
lsm.cookie.new("Object",{name_field_1:"value1",name_field_2:"value2"});
console.log(lsm.cookie.read_JSON("Demo"));
</pre>





