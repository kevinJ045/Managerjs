<h1>Manager.LSM</h1>

<p>This module is yet the simplest Module yet, also it has it's own modules/properties for initiations, This module also is a constructor so we will need to use the "new" statement.</p>

<h3>Usage</h3>
<pre class="mngr-code jsHigh">
var lsm = new Manager.LSM("name"); //Constructor init <br>

lsm.set("hloMsg","Hello World Manager.js!");
console.log(lsm.get("hloMsg"));

lsm.set("object",{
 name: "John",
 Age: 28,
 jobs: [
   "policeman",
   "driver",
 ],
});
console.log("name: " + lsm.get("object","name")); // getting property<br>
console.log("age: " + lsm.get("object","age"));
console.log("Job: " + lsm.get("object","jobs",0)); // getting property's property<br>

//Managerjs formSaver<br>
lsm.saveForm("#Form,form"); //Once you put this, and once you  reput it, manager will automatically fetch the values of each input<br>
</pre>

<h3>Local Strage</h3>
<p>Working with localstorages as DataBases</p>
<pre class="mngr-code jsHigh">
var lsm = new Manager.LSM("name");
lsm.set('SomeObject',{
 name: "John",
 fname: "Doe",
});
</pre>

<h3>Setting And Getting</h3>
<p>As you have seen before, setting is simple, but getting is diffrent but simple too</p>
<pre class="mngr-code jsHigh">
lsm.set('SomeObject',{
 name: "John",
 fname: "Doe",
});
lsm.get("SomeObject"); // will return the full object<br>
lsm.get("SomeObject","name"); // will return John
</pre>

<h3>Removing Cloing And Renaming</h3>
<p>Removing is soo simple, cloning is when you want the data in an LSM db to be copied to another db, you clone. the other one is renaming which you already know what it is</p>
<pre class="mngr-code jsHigh">
lsm.remove("SomeObject");
lsm.rename('name','demo');
lsm.clone('demo','other');
</pre>

<h3>Session Storage</h3>
<p>Is the same as Local Storage, but you only need to type session before the functions</p>
<pre class="mngr-code jsHigh">
lsm.session.set("name","value");
</pre>


