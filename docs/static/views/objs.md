<h1>Manager.OBJM</h1>
<p>This Module is a module that helps to make global Objects and properties like databases, OBJM is a constructor module so we can init it once and reuse it.</p>
<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var Objm = Manager.OBJM("name"),
   $scope = Objm.Objs;

$scope.name = "John";
$scope.age = "25";

Objm.set("hello","Hello World Managerjs!");

console.log($scope);
</pre>
You can learn more about this at the <a href="javascript:void(0)" data-href="/modules" class="nav__link">Modules</a>