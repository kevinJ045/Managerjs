<h1>Manager Modules</h1>
<p>Manager.require,Manager.extends,Manager.define
This modules above are the three main modules that are used in Manager,</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
Manager.require("./utils.js");
Manager.require("./scripts.js");

function sayHello(){
alert("Hello World!");
}

Manager.extends(sayHello,"sayHello");

Manager.sayHello();
</pre>

<h1>Manager Module Tags</h1>
<p>A manager-module is an html tag that let's u use templates like {{variable}} and so. thou u place a manager-module, it will still be useless without javascript to give it power.</p>

<h3>Using Manager Module Tags</h3>

<span>HTML</span>
<pre class="mngr-code htmlHigh">
&lt;manager-module module="ModuleName">
   My name is {{name}} and i am {{age}} years old !!
   This is a dash: {{variable }}&lt;br>
   People:&lt;br>
      {{#each party.people}}
        name: {{this.name}}&lt;br>
        age: {{this.age}}&lt;br>
      {{/each}}
&lt;/manager-module>
</pre>

<span>JavaScript</span>
<pre class="mngr-code jsHigh">
var Objm = Manager.OBJM("name"),
       $scope = Objm.Objs;

   $scope.name = "John";
   $scope.age = "25";

  Objm.set("hello","Hello World Managerjs!");

  var party = {
    location: "somewhere",
    hoster: "someone",
    people: [
      {
        name: "john",
        age: 21,
        gender: "male",
        student: false,
      },
      {
        name: "sia",
        age: 19,
        gender: "female",
        student: true,
      }
    ],
  }

  Objm.set("party",party);

  console.log($scope);

  Objm.controller('ModuleName',function(obj){
    obj.variable = "_______";
  },{
    extends: "name",
  });
</pre>