<h1>Manager Templates 1.1</h1>
<p>This module exists from managerjs v1.1, it is usefull for inline replacment,
You can use it for various reasons, for example for one or two line template management, you don't want to use <a href="javascript:void(0)" data-href="/modules" class="nav__link">Manager Modules</a> for that, so you can yse javascript as shown below
</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var person = {
	name: "John",
	fname: "Doe",
	age: 19,
	gender: "male"
};
var string = "my name is {{name}} and i am {{age}} years old";

var templated = Manager.ManagerTemplate(string,person);
</pre> 