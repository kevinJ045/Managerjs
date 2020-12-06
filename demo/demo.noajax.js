$(document).ready(function(){

    $.m.on("#onHold").hold(function(){
      console.log("Onhold Event Fired !!");
    },{
      time: 700
    });

    $('#menuToggle').click(function(){
        $('#menu').toggleClass('open');
    });

    $('section').each(function(){
        var $ths = $(this),
            $id = $ths.attr('id'),
            $title = $ths.data('title');

        if($('#menu ul').find('[section="#'+$id+'"]').length){
            return false;
        }

        $('#menu ul').append(`
            <li section="#${$id}">
                ${$title}
            </li>
        `);
    });

    $('#menu ul').append(`<br><br><br>`);

    $("[section]").click(function(){
        var $ths = $(this),
           $section = $($ths.attr('section'));

        $("body,html").animate({
            scrollTop: $section.offset().top
        },900);
        //window.location.href = $(this).attr('section');
    });

});


console.groupCollapsed("Manager Localstorage");
console.log("--Manager init--");
var lsm = new Manager.LSM('Demo',{
  'onset': function(name,id,val){
    //console.log("Set onset function:",name+"."+id+" = "+val);
  },
});

console.log("Logging Manager.LSM");

console.log(lsm);

console.log("Settting DemoProp to Localstorage");

lsm.new('DemoProp',{
  'DemoProp': 'DemoPropVal',
  'DemoProps': 'DemoPropVals',
  'prop1': 'val1',
  'prop2': {
    'val1': 'value1',
    'val2': ['value1','value2'],
  },
});

console.log("Cloning DemoProp to DemoProp2");

lsm.clone('DemoProp','DemoProp2');

console.log("Renaming DemoProp2 to DemoProp3");

lsm.rename('DemoProp2','DemoProp3');

console.log("Setting hi to hello");

lsm.set('hi','Hello');

console.log("Getting hi");

console.log(lsm.get('hi'));

console.log("Removing hi");

lsm.remove('hi'); 

console.log("Getting hi");

console.log(lsm.get('hi'));

console.log("Getting Objects");

console.log(lsm.get('DemoProp','prop1'));

console.log("Getting Object properties");
console.log(lsm.get('DemoProp','prop2','val1'));

console.log("Getting Object properties arrays");
console.log(lsm.get('DemoProp','prop2','val2',1));

console.log("Getting All properties");
console.log(lsm.getAll());

console.log("Outputting");
function outPutLocalStorage(){
  var $el = $("#LSMJS")
$el.empty();

var Methods = {
    'searchInput': '#searchInput',
    'table': {
        'attrs': `Attributes For Table`,
    },
    'contr': {
      'attrs': `class="tableContr" Attributes For Table Container`,
    },
    'head': {
      'attrs': `Attributes For Table Head`,
    },
    'rows': {
      'attrs': `Attributes For Children`,
      'onclick': function(id,val,El){
        alert(id + ': ' +val);

        El.siblings().removeClass('active');
        El.addClass('active');
      },
    },
    'tableSort': 'a-z', // z-a
  };

var contr = Methods.contr;
var table = Methods.table;
var head = Methods.head;
var rows = Methods.rows;
var searchInput = Methods.searchInput;


$el.html(`
  <div ${contr.attrs}>
    <table ${table.attrs} LSM_table>
      <thead ${head.attrs} LSM_table_header>
        <tr>
          <td>Name</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody LSM_list>

      <tbody>
    </table>
  </div>
  `);



var $list = $el.find('[LSM_list]'),
    $header = $el.find('[LSM_table_header]');
$list.empty();

//alert($header.height())

function start(first,last){
  return `
  <tr ${rows.attrs} LSM_list_item>
    <td LSM_list_item_id>
      <p>${first}</p>
    </td>
    <td LSM_list_item_val>
     <p>${last}</p>
    </td>
  </tr>
  `;
};

var list = lsm.LS,item;

for(item in list){
  var strt = start(item,list[item]);
  $list.append(strt);
}

var $table = $list;

sortTable($el.find('[LSM_list]'),Methods.tableSort);

if(searchInput != null){
  var $searchInput = $(searchInput);
  initTableSearch(searchInput,$el.find('[LSM_list]'));
}

$list.find('[LSM_list_item]').each(function(){
  var $ths = $(this);

  if($ths.hasClass('clickable')) return false;

  $ths.click(function(){
    var $lsm_id = $ths.find('[LSM_list_item_id]'),
      $lsm_val = $ths.find('[LSM_list_item_val]');

    $lsm_id = $lsm_id.find('p').text();
    $lsm_val = $lsm_val.find('p').text();

    if($.isFunction(rows.onclick)){
      rows.onclick($lsm_id,$lsm_val,$ths);
    }
  });

  $ths.addClass('clickable');
});

function sortTable($table,method){
Manager.sortTable($table,method);
}

function initTableSearch($input,$table){
new Manager.filter($input,$table);
}

}

outPutLocalStorage();

Manager.extends(outPutLocalStorage,"outPutLocalStorage");

console.log("Setting and Getting Demo2");
lsm.default.set('Demo2','Default Manager Object');
console.log(lsm.default.get('Demo2'));

console.log("Removing and Getting Demo2");
lsm.default.remove('Demo2');

console.log(lsm.default.get('Demo2'));

lsm.default.set('Demo2','Default Manager Object');

console.log("Renaming Demo2 to Demo3");
lsm.default.rename('Demo2','Demo3');

console.log("Cloning Demo3 to Demo4");
lsm.default.clone('Demo3','Demo4');

console.log(lsm.default.get('Demo4'));

$('#reload').click(function(){
  lsm.reload();
  outPutLocalStorage();
});

console.log("Setting Greetings ang Getting");

lsm.set('Greetings',['hi','hello','HII',"hello"]);

console.log(lsm.get('Greetings'));

console.log("Session Setting ang Getting");

lsm.session.set('Demo','Demo Session');

console.log(lsm.session.get('Demo'));

console.log("initiating saveForm");

lsm.saveForm('#Demo__Form',{
  exclude: 'input[type="hidden"], :file, .disable_save', // Passwords Are Excluded by default
}); // Works only in <form> tags




console.log("--Cookie Manager--");

lsm.cookie.outputmethod = function(text){
  console.log(text);
};

lsm.cookie.options = {
  expires: 690,
  path: "/"
};

console.log("1. Create cookie: cookie name: 'Demo'; cookie values: {name_field_1:\"value1\",name_field_2:\"value2\"}");
lsm.cookie.new("Demo",{name_field_1:"value1",name_field_2:"value2"});

console.log("2. Check if cookie exists.");
console.log(lsm.cookie.check("Demo"));

console.log("3. Check if cookie value is a valid JSON.");
console.log(lsm.cookie.verify("Demo"));

console.log("4. Read cookie values as string.");
console.log(lsm.cookie.read_values("Demo"));

console.log("5. Read cookie values as JSON object.");
console.log(lsm.cookie.read_JSON("Demo"));

console.log("6. Read a single value from the stored JSON: index: \"name_field_1\"");
console.log(lsm.cookie.read_value("Demo","name_field_1"));

console.log("7. Replace a value from the stored JSON: index: \"name_field_1\", value: \"new_value\"");
lsm.cookie.replace_value("Demo","name_field_1","new_value");
console.log(lsm.cookie.read_JSON("Demo"));

console.log("8. Add a value to the stored JSON: index: \"name_field_3\", value: \"value3\"");
lsm.cookie.add_value("Demo","name_field_3","value3");
console.log(lsm.cookie.read_JSON("Demo"));

console.log("9. Remove a value from the stored JSON: index: \"name_field_1\"");
lsm.cookie.remove_value("Demo","name_field_1");
console.log(lsm.cookie.read_JSON("Demo"));

console.groupEnd("Manager Localstorage");


console.group("Manager TimeManager");
console.log("--Time Manager--");
var TM = new Manager.TM({}),Time = TM.time,dayName = TM.getDayName(Time.day);

console.log(TM);

console.groupEnd("Manager TimeManager");
console.group("Manager sorting&filtering");
var SortingMTH = 'a-z';

var filter = new Manager.filter('#filterInput','.searchable',{
  'alternate': null,
  'alternateclass': 'alternate',
  'nofilter': 'nofilter',
  'callback': null,
  'count': null,
  'emptymessage': "No Results"
});

function sort(){

  if(SortingMTH == 'a-z'){
    Manager.sortList('#listToSort','z-a');
    Manager.sortTable('#tableToSort','z-a');
    SortingMTH = 'z-a';
  } else {
    Manager.sortList('#listToSort','a-z');
    Manager.sortTable('#tableToSort','a-z');
    SortingMTH = 'a-z';
  }

  $('.SortingMTH').html(SortingMTH);

  filter.refresh();
}
console.groupEnd("Manager sorting&filtering");

console.group("Manager ObjManager");

var ObjM = new Manager.OBJM('Demo'),
ObjM_2 = new Manager.OBJM('Demo2'),
$scope = ObjM.Objs;

console.log(ObjM);

ObjM_2.set("Concatinatable",true);

ObjM.set('Greeting',"hello");
ObjM.set('Icons',{
  pack1: [
    {
      src: '/path/to',
      name: 'icon.png',
      props: {
        sizes: ['72x72','144x144'],
      }
    },
    {
      src: '/path/to',
      name: 'logo.png',
      props: {
        sizes: ['144x72','288x144'],
      }
    }
  ],
});

function listAllObjs(){
  $('#allObjs').empty();
  for(var i in $scope.Demo){

    $('#allObjs').append(`
      <tr>
        <td>${i}</td>
        <td>${JSON.stringify($scope.Demo[i])}</td>
      </tr>
    `);

  }

  console.log($scope.Demo);
}
$('#allObjs_add').click(function(){
  var val = $('#allObjs_New').val();
  val = val.trim();
  var val2 = $('#allObjs_New_val').val();
  val2 = val2.trim();
  if(val != "" && val2 != ""){
    ObjM.set(val,val2);
  }

  listAllObjs();
});
$('#allObjs_remove').click(function(){
  var val = $('#allObjs_New').val();
  val = val.trim();
  if(val != ""){
    ObjM.remove(val);
  }

  listAllObjs();
});

ObjM.concat('Demo2');

function callJs(text){
  console.log(text);
  return text; // this will uppear as the text that you have put
}

var ObjM_ctrl = ObjM.controller('Demo',function($scope){
  $scope.new = {'DemoProp':'DemoVal'};
  console.log($scope,"fromController");
},{extends:'Demo'}); // So that now it can use the Global Scope *Demo*

ObjM.controller('BrowserInfo',function($scope){
  $scope.browser = $.m.browser.browser;
  $scope.version = $.m.browser.version;
  $scope.platform = $.m.browser.platform;
  $scope.build = $.m.browser.build;

  // Let's see if the browser is IE(Microsoft's Internet Explorer)
  if($.m.browser.isBrowser('msie') && $.m.browser.isVersion.isOrLess(8)){
    $scope.isIE = 'IE, and version is or less than 8.0.';
  } else if ($.m.browser.isBrowser('msie') && $.m.browser.isVersion.isMoreThan(8)) {
    $scope.isIE = 'IE, and version is more than 8.0.';
  } else {
    $scope.isIE = 'NOT IE.';
  }
},{extends:'Demo'});

Manager.extends(listAllObjs);
console.groupEnd("Manager ObjManager");

console.groupEnd("Manager HTTP");

console.groupCollapsed("Manager Others");
function imp_ort_comp(){
  var Fun = Function($("#FunctionForModule").val());
  Manager.extendsFunction('DemoFunction',Fun,true);
}
function run_comp(){
  if(Manager.DemoFunction != undefined && typeof Manager.DemoFunction == "function"){
    Manager.DemoFunction();
  }
} 
function delete_comp(){
  Manager.unExtend('DemoFunction');
}
function exp_ort_comp(){
  if(Manager.DemoFunction != undefined && typeof Manager.DemoFunction == "function"){
    Manager.exportModule('DemoFunction');
    DemoFunction();
  }
}

/*var browserWindow = new Manager.browserWindow(function(){
  console.log('The Tab is open');
},function(){
  console.log('Exited From The Tab');
});*/

var claculator = new Manager.claculator();

console.log(claculator.calc(1+3));
var Formatted__calc = claculator.format(49950);
console.log(Formatted__calc);
console.log(claculator.toNumber(Formatted__calc));
var strState = "5+32+45/36222-857*7";
console.log(strState,claculator.fromString(strState));
var comp = new Manager.component('body');
//comp.getHeader();
//comp.getFooter();

console.log(comp);

var newEl = comp.nel('section'); // new Element
newEl.attr({
  "id": 'componentList',
});
newEl.output();

newEl = comp.nel('h4');
newEl.html('Component List Appended By javascript');
newEl.outputTo('#componentList');

newEl = comp.nel('div');
newEl.html('Div Element');
newEl.outputTo('#componentList');

comp.nel('br').outputTo('#componentList');

newEl = comp.nel('a');
newEl.html('Anchor Tag');
newEl.attr({
  "href": "https://github.com/kevinj045/Managerjs/"
});
newEl.outputTo('#componentList');

comp.nel('br').outputTo('#componentList');

function opener(){
  comp.fileChooser(function(evt,event,input){
    $("#opener").html(`
        <img src="${evt.target.result}" width="100%"/>
      `);
  },"data");
}

newEl = comp.nel('button');
newEl.addClass('a');
newEl.html('Button Element');
newEl.outputTo('#componentList');

$("#PROPERTIESTABLE").html(`
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
`);


  var Obj045 = {};

  Manager.defineIn(["function_",function(){
    alert('hii')
  }],Obj045);

  Manager.define('function_2',[],function(){
    alert('Hii again');
  }).defineIn(Obj045);

  Manager.defineIn(["function_3",function(){
    alert('hii')
  }],Obj045).extends();
  
  console.log(Obj045);

function reloadCtrl(){
  ObjM.set("undefinedItem","DefinedNow");
  ObjM_ctrl.reload();
  console.log(ObjM.getController("Demo"));
}

Manager.animate('#animate',{
  "0%":{
    "background": "red",
    "opacity": '0.5',
  },
  "100%":{
    "background": "blue",
    "opacity": "1",
  }
},"infinite",2000);

console.groupEnd("Manager Others");







