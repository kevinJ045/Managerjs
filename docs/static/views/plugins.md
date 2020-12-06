<h1>Manager Plugins</h1>
<p>
This feature of Manager is soo simple but yet the best to extend plgins to Manager,

All you need to do is just following the next steps,
</p>

<br>

<h3>Starting</h3>
<p>For example if you have a project and has the following files, and they are index.html,scripts.js,<br>
Now create a file called "demo.manager" at "/path/to/" folder,<br>
in your scripts.js you add:</p>
<pre class="mngr-code jsHigh">
Manager.getScript('/path/to/demo')
</pre>
<p danger>Note: Remenber to not put the file extension and the file extension must be .manager</p>

<h3>Managing</h3>
<p>if you have got the file, some error messages should come, you know how it works,
the file is empty yet, so in demo.manager put:</p>
<pre class="mngr-code jsHigh">
$module{
  name:Name,
  version:/1.2.3/, //must be between "/"<br>
  moduleFunction: functionName,
}$module
function{
  function functionName(){
    alert("Ready !!")
  }
}function
</pre>
<p danger>Note: All the functions inside the "function{" will be executed and there <strong>MUST</strong> be a <strong>FUNCTION</strong> names as same as the "moduleFunction" in the "$module{", and the version must be between "/" and all the properties inside the "$module{" must end up with ","</p>










