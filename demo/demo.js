$(document).ready(function(){

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
listAllObjs();
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

ObjM.controller('Demo',function($scope){
  $scope.new = {'DemoProp':'DemoVal'};
  console.log($scope,"fromController");
},{extends:'Demo'}); // So that now it can use the Global Scope *Demo*

ObjM.concat('Demo2');

Manager.extends(listAllObjs);
console.groupEnd("Manager ObjManager");

console.group("Manager HTTP");
var http = new Manager.http(),elFileLoader = $('#FileLoader');

function loadFile(type){
  if(type == 'json'){
    http.getJson('./data/data.json',function(response){
      $('#FileLoader').html(JSON.stringify(response));
      ObjM.set('JsonData',response);
      Manager.listAllObjs();
    });
  } else if(type == 'xml'){
    http.getXml('./data/data.xml',function(response){
      $('#FileLoader').empty();
      var Xml = response,JSON_OBJECT = [];

      Xml = $(Xml.getElementsByTagName('books'));

      Xml.find('book').each(function(){
        var $ths = $(this),
            $id = $ths.attr('id'),
            $author = $ths.find('author').text(),
            $price_ = $ths.find('price').attr('by'),
            $price = $ths.find('price').text();

        $('#FileLoader').append(`
          <div>
            <h4>${$id}</h4>
            <p>by ${$author}</p>
            <p>${$price_} ${$price}</p>
            <button class="a">
              Buy 
            </button>
          </div>
          `);

        JSON_OBJECT.unshift({
          id: $id,
          author: $author,
          price: $price,
          price_: $price_,
        });
      });

      ObjM.set('FromXML',JSON_OBJECT);
      listAllObjs();
    });
  } else {
    $('#FileLoader').html(http.get('./data/data.txt'));
  }
}

Manager.define("loadFile",["listAllObjs","http","OBJM"],loadFile,{ //Required stuff
  caseIns: false, // case Insensitive
});

Manager.exec('loadFile','txt');


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

var iframe_ = new Manager.ifrCtrl('#iframeToControl','./data/iframe.html');
iframe = iframe_.getIframe();
console.log(iframe);
function ifr_toggle(elem){
  iframe.body.find(elem).toggle();
}
function ifr_append(text){
  iframe.body.append(text);
}
function ifr_getTitle(){
  alert(iframe.document.title);
}
function ifr_height(first,last){
  if(iframe_.height() == first){
    iframe_.height(last)
  } else {
    iframe_.height(first)
  }

  console.log(iframe_.height(),$('#iframeToControl').height());
}
var comp = new Manager.component('body');
//comp.getHeader();
//comp.getFooter();

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


newEl = comp.nel('button');
newEl.addClass('a');
newEl.html('Button Element');
newEl.outputTo('#componentList');

var uses = {
  "LSM":"Managing localStorage,sessionStorage 7 cookies",
  "TM":"Managing Date() and time functions",
  "sortTable":"Sorting Tables",
  "sortList":"Sorting Lists",
  "filter":"Filtering elements like: div,li,td,tr",
  "OBJM":"Managing Object Controllers",
  "http":"Managing Ajax/XMLHttpRequest",
  "scrollDetection":"Detecting scroll direction",
  "pickRandom":"Picking a random word from words",
  "randFrom":"Picking a random interval from 2 numbers, min & max",
  "browserWindow":"Managing the window,onpageshow,onpagehide",
  "claculator":"Calculating numbers",
  "ifrCtrl":"Controlling iframes",
  "component":"Managing & Creating elements",
  "cp":"Module that let's you: convert",
  "asLongAs":"While loop",
  "extends":"Importing/defining function to Manager",
  "extendsFunction":"Importing/defining function from strings to Manager",
  "eval":"Run A Function from String",
  "exec":"Executes A module",
  "unExtend":"Removes a module",
  "exportModule":"Exporting imported modules",
  "define":"Importing/defining function to Manager with dependencies",
  "defineIn":"Importing/defining function to An Object with/without dependencies",
  "require":"Importing scripts",
  "requireJSON":"Importing Objects from JSON files",
  "fn":"Jquery Init",
}

var meth,type____,use;
var index = 0;

for(var i in Manager.__proto__){
  if(typeof Manager[i] == "function"){
    for(var i_ in Manager[i].prototype){
      index++;
    }
    if(index < 2){
      meth = "Manager."+i+"(args)";
      type____ = "Function";
    } else {
      meth = "new Manager."+i+"(args)";
      type____ = "Constructor";
    }
    index = 0;
  } else {
    if(typeof Manager[i] == "object"){
      meth = "Manager."+i+".prop(args)";
    } else {
      meth = "Manager."+i+"";
    }
  }

  var extendedByManager = Manager[i].extendedByManager;

  if(extendedByManager == true || i == "options" || i == "manager_self"){
    
  } else {
    use = uses[i] != undefined ? uses[i] : "Unknown";

    var row = comp.tableRow(i,typeof Manager[i] + "," + type____,meth,use)

    $("#PROPERTIESTABLE").append(row);
  }
  
}

  var JSON_OBJECT = Manager.requireJSON('./data/data.json');
  console.log(JSON_OBJECT,"requireJSON");
  JSON_OBJECT = Manager.requireJSON('./data/data.json','Manager');
  console.log(JSON_OBJECT,"requireJSON with a property");

  ObjM.set("JSON_OBJECT",JSON_OBJECT);

  var Obj045 = {};

  Manager.defineIn(["JSON_OBJECT",JSON_OBJECT],Obj045);

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

  console.group("Manager Colours");

    function covertCP(color){
      if(color == "") return;
      var CP = new Manager.cp(color);

      console.log(
        CP.toRgbString(),
        CP.toRgbaString(),
        CP.toHwbString(),
        CP.toHwbStringDecimal(),
        CP.toHwbaString(),
        CP.toHslString(),
        CP.toHslStringDecimal(),
        CP.toHslaString(),
        CP.toCmykString(),
        CP.toCmykStringDecimal(),
        CP.toNcolString(),
        CP.toNcolStringDecimal(),
        CP.toNcolaString(),
        CP.toName(),
        CP.toHexString(),
        CP.toRgb(),
        CP.toHsl(),
        CP.toHwb(),
        CP.toCmyk(),
        CP.toNcol()
      );

      $('#colorPicker').css({
        "background": color,
      });
    }

  console.groupEnd("Manager Colours");

console.groupEnd("Manager Others");







