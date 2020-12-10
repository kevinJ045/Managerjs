<h1><b>Manager.js</b></h1>

<p align="center">
  <img src="./favicon.png" width="150px" alt="Managerjs logo"/>
</p>

<a href="https://github.com/NextSpot045/Managerjs/">
   <img src="https://img.shields.io/github/forks/NextSpot045/Managerjs.svg?style=social&label=Forks&maxAge=2592000" >
   <img src="https://img.shields.io/github/stars/NextSpot045/Managerjs.svg?style=social&label=Stars&maxAge=2592000" >
   <img src="https://img.shields.io/github/watchers/NextSpot045/Managerjs.svg?style=social&label=Watchers&maxAge=2592000" >
</a>

<h3>What is it?</h3>

<p><b>Manager.js</b> is a <b>javascript</b> library that lets you use  
some modules that I thought are usefull for web developers.</p>  
  
This means <b>Manager.js</b> is an important Module to use in your  
projects

<h3>Why should i use it?</h3>
<ul class="list-list">
	<li><icon></icon>It is simple to work with</li>
	<li><icon></icon>It has a localStorage Manager</li>
	<li><icon></icon>It has a cookie manager</li>
	<li><icon></icon>It has a module manager</li>
	<li><icon></icon>And a lot more usefull modules</li>
</ul>

<h3>How do I use it?</h3>

<p>As i've told you before, <b>Manager.js</b> has a lot of modules,  
so it must have been simple to use, that's why i  
Made it soo easy to use it</p>

<h3>Importing</h3>

<div class="mngr-code htmlHigh">
&lt;script src="/path/to/manager.js" type="application/javascript">&lt;/script>
</div>

<h3>Usage</h3>

<pre class="mngr-code jsHigh">
  Manager.module();
</pre>

<h3>Instances</h3>

<pre class="mngr-code jsHigh">
  var ANYWORD = Manager("MODULE");
</pre>

<p>Replace "MODULE" by te module you want, and "ANYWORD" by anyword you want</p>

<pre class="mngr-code jsHigh" id="codeBlock_0">
  var instance = new Manager(); // will be an object
</pre>

<p>The above <a href="#codeBlock_0">code</a> must be used if you are having trubles with the word Manager and also $.m</p>

<h3>Short Cuts</h3>
<pre class="mngr-code jsHigh">
   var lsm = new $.m.LSM("new");
   // ...
</pre>

<h3>Basic Modules</h3>
LSM/Local Storage Manager. visit <a href="https://github.com/kevinJ045/LSM_js/">LSM GitHub</a> or <a href="javascript:void(0)" data-href="/LSM" class="nav__link">LSM module</a>
<pre class="mngr-code jsHigh">
  new Manager.LSM("name");
</pre>
Time manager
<pre class="mngr-code jsHigh">
  new Manager.TM();
</pre>
require scripts
<pre class="mngr-code jsHigh">
  Manager.require("/path/to/script.js");
</pre>
extend functions to make them global
<pre class="mngr-code jsHigh">
  Manager.extends(function,"functionName");
</pre>

<h3>Table of Modules</h3>
<p>Here i present you the table of modules/properties</p>
<div class="tableContr free">
  <table>
    <thead>
      <tr>
        <td>Module/<br>Property</td>
        <td>Type</td>
        <td>Module Init</td>
        <td>Use</td>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>LSM</td>
      <td>function,Constructor
      <td>new Manager.LSM(name,options)</td>
      <td>Managing localStorage,sessionStorage 7 cookies</td>
      </tr>
      <tr>
      <td>TM</td>
      <td>function,Constructor
      <td>new Manager.TM(options)</td>
      <td>Managing Date() and time functions</td>
      </tr>
      <tr>
      <td>sortTable</td>
      <td>function,Function
      <td>Manager.sortTable(table,method)</td>
      <td>Sorting Tables</td>
      </tr>
      <tr>
      <td>sortList</td>
      <td>function,Function
      <td>Manager.sortList(list,method)</td>
      <td>Sorting Lists</td>
      </tr>
      <tr>
      <td>filter</td>
      <td>function,Constructor
      <td>new Manager.filter(inpt,element,options)</td>
      <td>Filtering elements like: div,li,td,tr</td>
      </tr>
      <tr>
      <td>OBJM</td>
      <td>function,Constructor
      <td>new Manager.OBJM(name)</td>
      <td>Managing Object Controllers</td>
      </tr>
      <tr>
      <td>http</td>
      <td>function,Constructor
      <td>new Manager.http()</td>
      <td>Managing Ajax/XMLHttpRequest</td>
      </tr>
      <tr>
      <td>scrollDetection</td>
      <td>function,Function
      <td>Manager.scrollDetection(el,options)</td>
      <td>Detecting scroll direction</td>
      </tr>
      <tr>
      <td>pickRandom</td>
      <td>function,Function
      <td>Manager.pickRandom(words)</td>
      <td>Picking a random word from words</td>
      </tr>
      <tr>
      <td>randFrom</td>
      <td>function,Function
      <td>Manager.randFrom(min,max)</td>
      <td>Picking a random interval from 2 numbers, min & max</td>
      </tr>
      <tr>
      <td>browserWindow</td>
      <td>function,Constructor
      <td>new Manager.browserWindow(onpageshow,onpagehide)</td>
      <td>Managing the window,onpageshow,onpagehide</td>
      </tr>
      <tr>
      <td>claculator</td>
      <td>function,Constructor
      <td>new Manager.claculator(args)</td>
      <td>Calculating numbers</td>
      </tr>
      <tr>
      <td>ifrCtrl</td>
      <td>function,Constructor
      <td>new Manager.ifrCtrl(element)</td>
      <td>Controlling iframes</td>
      </tr>
      <tr>
      <td>component</td>
      <td>function,Constructor
      <td>new Manager.component(element)</td>
      <td>Managing & Creating elements</td>
      </tr>
      <tr>
      <td>browser</td>
      <td>object,Constructor
      <td>Manager.browser.prop</td>
      <td>Getting the browser info</td>
      </tr>
      <tr>
      <td>on</td>
      <td>function,Function
      <td>Manager.on(el).event</td>
      <td>Event Handler for manager</td>
      </tr>
      <tr>
      <td>fetch</td>
      <td>function,Function
      <td>Manager.fetch(url,functions,options)</td>
      <td>Fetches data as json,xml,text...</td>
      </tr>
      <tr>
      <td>animate</td>
      <td>function,Function
      <td>Manager.animate(element,keyframes,count,time)</td>
      <td>Css Animations from a javascript object</td>
      </tr>
      <tr>
      <td>asLongAs</td>
      <td>function,Function
      <td>Manager.asLongAs(condition)</td>
      <td>While loop</td>
      </tr>
      <tr>
      <td>extends</td>
      <td>function,Function
      <td>Manager.extends(module,name,isUpdate)</td>
      <td>Importing/defining function to Manager</td>
      </tr>
      <tr>
      <td>extendsFunction</td>
      <td>function,Function
      <td>Manager.extendsFunction(module,fun,isUpdate)</td>
      <td>Importing/defining function from strings to Manager</td>
      </tr>
      <tr>
      <td>eval</td>
      <td>function,Function
      <td>Manager.eval(functions)</td>
      <td>Run A Function from String</td>
      </tr>
      <tr>
      <td>exec</td>
      <td>function,Function
      <td>Manager.exec(module,args)</td>
      <td>Executes A module</td>
      </tr>
      <tr>
      <td>unExtend</td>
      <td>function,Function
      <td>Manager.unExtend(module)</td>
      <td>Removes a module</td>
      </tr>
      <tr>
      <td>exportModule</td>
      <td>function,Function
      <td>Manager.exportModule(module)</td>
      <td>Exporting imported modules</td>
      </tr>
      <tr>
      <td>define</td>
      <td>function,Function
      <td>Manager.define(name,dependencies,module,options)</td>
      <td>Importing/defining function to Manager with dependencies</td>
      </tr>
      <tr>
      <td>defineIn</td>
      <td>function,Function
      <td>Manager.defineIn([name,module],module2)</td>
      <td>Importing/defining function to An Object with/without dependencies</td>
      </tr>
      <tr>
      <td>require</td>
      <td>function,Function
      <td>Manager.require(file,options)</td>
      <td>Importing scripts</td>
      </tr>
      <tr>
      <td>requireJSON</td>
      <td>function,Function
      <td>Manager.requireJSON(json,prop)</td>
      <td>Importing Objects from JSON files</td>
      </tr>
      <tr>
      <td>getScript</td>
      <td>function,Function
      <td>Manager.getScript(file)</td>
      <td>Get a module from a well formatted manager/javascript file</td>
      </tr>
      <tr>
      <td>fn</td>
      <td>function,Constructor
      <td>new Manager.fn(element).prop(args)</td>
      <td>Jquery Init</td>
      </tr>    
    </tbody>
  </table>
</div>

<p>A javascript library to manage Localstorage,Date,Cookies,Ajax/JQuery Ajax,Object Manager, it includes some of the amazing javasript apis i thought are usefull,</p>

one of the main usefull apis is localstorage
<pre class="mngr-code jsHigh">
   new Manager.LSM("name")
</pre>
the 2nd one is DateTime manager
<pre class="mngr-code jsHigh">
   var TimeManager = new Manager.TM(); // simplifying TimeManager<br>
   console.log(TimeManager.time.fullyear);
</pre>
The other one is the javascript manager though i didn't mention it before,
<pre class="mngr-code jsHigh">
   Manager.require("/path/to/script.js",{ // included/imported<br>
      as: "name",
      extends: true,
   });
   function hello(){ 
      alert("Hello World!");
   }
   Manager.extends(hello,"hello"); // Manager.extends(function,"functionName"); <br>

   Manager.define("sayHello",["hello","LSM"],function(helloText){
     Manager.hello(); // we extended this before <br>
     console.log(helloText);
   },{ //Required stuff <br>
     caseIns: false, // case Insensitive <br>
   });

   Manager.exec('sayHello',"hii"); // function then arguments <br>
</pre>

<h3> Compatibility</h3>

<b>Manager.js</b> is compatible with almost everywhere.  
but it currently needs Jquery as a main executor,

<h3> Demo</h3>

<p>here is a demo at this repo,
open it and be sure to open the DevTools,
also you can visit the <a href="https://mngrjs.netlify.app/">Demo</a> here,</p>


