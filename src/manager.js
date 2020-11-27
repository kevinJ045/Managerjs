/*

 * Manager
 * @author KevinJ045 - http://nextspot.rf.gd
 * @version 1.0.4.3                 

               ██╗   █████████╗     ██══╗
           ██████║   ╚══██╔═══╝     ████╚═╗
         ████████║      ██║         ██████╚═╗
       ██████████║      ██║         ████████╚═╗
     ████████████║      ██║         ██████████╚═╗ 
   ██████████████║      ██║         ████████████╚═╗
 ████████████████║   █████████╗     ██████████████║
 ╚═══════════════╝   ╚════════╝     ╚═════════════╝
 
████████╗██╗  ██╗███████╗███╗   ███╗███████╗███████╗
╚══██╔══╝██║  ██║██╔════╝████╗ ████║██╔════╝██╔════╝
   ██║   ███████║█████╗  ██╔████╔██║█████╗  ███████╗
   ██║   ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══╝  ╚════██║
   ██║   ██║  ██║███████╗██║ ╚═╝ ██║███████╗███████║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝╚══════╝
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global.Manager, global.jQuery));
}(this, function (exports, $) { 'use strict';

  if(window.jQuery == null || window.jQuery == undefined
    || window.jQuery == undefined || window.jQuery == null){
    window.Manager = {};
    window.$m = {};
    stop();
    throw new Error('\n ERROR, jquery is not defined, Manager requires jquery to work perfectly');
    return "ERROR, jquery is not defined";
  } else if(!XMLHttpRequest && !window.ActiveXObject){
    window.Manager = {};
    window.$m = {};
    stop();
    throw new Error('\n ERROR, XMLHttpRequest is not defined, Manager requires XMLHttpRequest to work perfectly');
    return "ERROR, XMLHttpRequest is not defined";
  } else {};



  var plugin = { 
    name: 'Manager.js',
    developer: 'Kevin',
    description: 'A javascript library to enhance and manage javascript',
    git_repo: 'https://github.com/kevinj045/Managerjs',
    version: "1.0.4.3",
    LSM: {
      version: '1.0.5.01.2',
      credits: ['kevinj045',"Paul Jones"],
    },
    OBJManager: {
      version: '2.10',
      credits: ['kevinj045',"w3Schools"],
    },
    cookieManager: {
      version: '3.54.12',
      credits: ['kevinj045',"Tantau Horia"],
    },
    browserInfo: {
      version: "1.0.0", // Unknown
      credits: ['kevinj045',"akinari tsugo"]
    },
    others: {
      credits: ['kevinj045','Jeremy Ashkenas and DocumentCloud']
    },
    get info(){return this},
  },currentScript = document.currentScript,
  fileTypes = {
    html: "application/html",
    css: "stylesheet/css",
    js: "application/javascript",
    xml: "application/xml",
    xquery: "application/xquery",
    php: "application/x-httpd-php",
  },FN = jQuery,
  testNameCase = function(name){
    name = /\./img.test(name) ? name.replace(/\./img,'_') : name;
    name = /\#/img.test(name) ? name.replace(/\#/img,'3_') : name;
    name = /\[/img.test(name) ? name.replace(/\[/img,'C_') : name;
    name = /\]/img.test(name) ? name.replace(/\]/img,'_3') : name;
    name = /\=/img.test(name) ? name.replace(/\=/img,'___') : name;
    name = /\"/img.test(name) ? name.replace(/\"/img,'_1') : name;
    name = /\'/img.test(name) ? name.replace(/\'/img,'_2') : name;
    name = /\:/img.test(name) ? name.replace(/\:/img,'_22') : name;
    name = /\{/img.test(name) ? name.replace(/\{/img,'5_') : name;
    name = /\}/img.test(name) ? name.replace(/\}/img,'_6') : name;
    name = /\@/img.test(name) ? name.replace(/\@/img,'2_') : name;
    name = /\,/img.test(name) ? name.replace(/\,/img,'_9_') : name;
    name = /\*/img.test(name) ? name.replace(/\*/img,'8_') : name;

    return name;
  },
  wordToNum = function(word){
    var wrd = word,
    index = -1,
    numbers = {
      zero: /zero/img,
      one: /one/img,
      two: /two/img,
      three: /three/img,
      four: /four/img,
      five: /five/img,
      six: /six/img,
      seven: /seven/img,
      eight: /eight/img,
      nine: /nine/img,
      ten: /ten/img,
      eleven: /eleven/img,
      twelve: /twelve/img,
    };
    for(var number in numbers){
      index++;
      var cnum = numbers[number];
      wrd = cnum.test(wrd) ? wrd.replace(cnum,index) : wrd;
    }

    wrd = /teen/img.test(wrd) ? wrd.replace(/teen/img,'') : wrd;

    return wrd;
  },
  str = function(text) {
    return new String(text.toString())
  },JT = function(text) {
    return JSON.stringify(text);
  },JP = function(text) {
    return JSON.parse(text);
  },toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  },toArray2 = function(list){
    return list.length > 1 ? list : toArray(list[0]);
  },randFrom = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },pickRandom = function(...words){
    if(typeof words != 'object'){
      errors.errNotObject('words',typeof words);
      return false;
    }
    var randomWord = toArray2(words);
    var rand = Math.floor(Math.random() * randomWord.length);
    return randomWord[rand];
  },giveKeyPath = function(keyPath){
    return `<script>
      document.writeln(${keyPath});
    </script>`;
  },
  onRE = /^@|^manager:/,
  max,min,chroma,
  ct__ = "{{",
  ce__ = "}}",
  symbols = [["“","”"],["{{","}}"],["${|","|}"],["¶"],["…"]],
  ctrlStart = new RegExp(ct__,'g'),
  ctrlEnd = new RegExp(ce__,'g'),
  moduleStart = '$module{',
  moduleEnd = '}$module',
  moduleFunStart = 'function{',
  moduleFunEnd = '}function',
  fileStart = 'start([',
  fileEnd = '])end',
  pluses = /\+/g,
    raw = function(s){
    return s;
  },decoded = function(s) {
    return decodeURIComponent(s.replace(pluses, ' '))
  },config = $.cookie = function (key, value, options) {

    // write
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);

      if (value === null) {
        options.expires = -1;
      }

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
        encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // read
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split('; ');
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      if (decode(parts.shift()) === key) {
        var cookie = decode(parts.join('='));
        return config.json ? JSON.parse(cookie) : cookie;
      }
    }

    return null;
  },_get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } },
  _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(),
  _possibleConstructorReturn = function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; },
  _inherits = function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; },
  _classCallCheck = function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== null) {
      $.cookie(key, null, options);
      return true;
    }
    return false;
  };

  $("<style></style>").html(`
    manager-include,manager-module,manager-module module,manager-script{
      width: 100%;
      height: auto;
      clear: both;
    }
    manager-script{
      display: none;
      visiblity: hidden;
      width: 0px;
      height 0px;
      position: absolute;
      top: -12882772px;
      left: -4747494949px;
      opacity: 0;
    }
  `).appendTo('head');

  class ManagerModule extends HTMLElement{
    constructor(){
      super();
    }

    displayObject(Contrs,contr,O_B_J){
      var $that = $(this);
      var getElementsByAttribute = function (x, att) {
        var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
        l = y.length;
        for (i = -1; i < l; i += 1) {
          if (i == -1) {y[i] = x;}
          if (y[i].getAttribute(z) !== null) {arrCount += 1; arr[arrCount] = y[i];}
        }
        return arr;
      };  

      function _displayObject(id, data) {
        var htmlObj, htmlTemplate, html, arr = [], a, l, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";
        htmlObj = $that[0];
        htmlTemplate = init_template(id, htmlObj);
        html = htmlTemplate.cloneNode(true);
        arr = getElementsByAttribute(html, "repeat");
        l = arr.length;
        for (j = (l - 1); j >= 0; j -= 1) {
          cc = arr[j].getAttribute("repeat").split(" ");
          if (cc.length == 1) {
            repeat = cc[0];
          } else {
            repeatX = cc[0];
            repeat = cc[2];
          }
          arr[j].removeAttribute("repeat");
          repeatObj = data[repeat];
          if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
            i = 0;
            for (x in repeatObj) {
              i += 1;
              rowClone = arr[j];
              rowClone = replaceCurly(rowClone, "element", repeatX, repeatObj[x]);
              a = rowClone.attributes;
              for (ii = 0; ii < a.length; ii += 1) {
                a[ii].value = replaceCurly(a[ii], "attribute", repeatX, repeatObj[x]).value;
              }
              (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) : arr[j].parentNode.insertBefore(rowClone, arr[j]);
            }
          } else {
            console.log("repeat must be an array. " + repeat + " is not an array.");
            continue;
          }
        }
        html = replaceCurly(html, "element");
        htmlObj.parentNode.replaceChild(html, htmlObj);
        function init_template(id, obj) {
          var template;
          template = obj.cloneNode(true);
          if (Contrs.hasOwnProperty(id)) {return Contrs[id];}
          Contrs[id] = template;
          return template;
        }
        function replaceCurly(elmnt, typ, repeatX, x) {
          var value, substr, match, Obj = data, keyPath, rowClone, pos1, pos2, originalHTML, lookFor, lookForARR = [], i, cc, r;
          rowClone = elmnt.cloneNode(true);
          pos1 = 0;
          while (pos1 > -1) {
            originalHTML = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
            pos1 = originalHTML.indexOf(ct__, pos1);
            if (pos1 === -1) {break;}
            pos2 = originalHTML.indexOf(ce__, pos1 + 1);
            lookFor = originalHTML.substring(pos1 + 2, pos2);
            lookForARR = lookFor.split("||");
            value = undefined;
            Obj = data;
            for (i = 0; i < lookForARR.length; i += 1) {
              Obj = data;
              lookForARR[i] = lookForARR[i].replace(/^\s+|\s+$/gm, ''); //trim
              if (x) {value = x[lookForARR[i]];}
              if (value == undefined && data) {value = data[lookForARR[i]];}
              if (value == undefined) {
                Obj = data;
                keyPath = lookForARR[i];
                substr = keyPath;

                if(keyPath.match(/\./) || keyPath.match(/\[/igm)){
                  Obj = data;

                  function getWithDot(variable1){
                    match = substr.split(variable1);
                    match.forEach(function(variable,index){
                      if(index == 0){Obj = data;};
                      if(variable.match(/\[/igm)){
                        getWithBrack(variable);
                      } else {
                        Obj = Obj[variable];
                      }
                    });
                  }

                  function getWithBrack(variable1){
                    match = variable1.split('[')[1].split(']')[0];
                    keyPath = variable1.replace("["+match+"]",'');
                    if(keyPath.indexOf(/\[/igm) >= 0){
                      match = substr.split(variable1);
                      match.forEach(function(variable,index){
                        if(index == 0){Obj = data;};
                        getWithBrack(variable);
                      });
                    } else {
                      match = match.replace(/\"/igm,"");
                      Obj = Obj[keyPath];
                      Obj = Obj[match] != undefined ? Obj[match] : Obj;
                    }
                  }

                  if(keyPath.match(/\./)){
                    keyPath = keyPath.match(/\./igm);
                    keyPath.forEach(function(variable1,index){
                      getWithDot(variable1);
                    });
                  } else if(keyPath.match(/\[/igm)){
                    keyPath = keyPath.split("[");
                    keyPath.forEach(function(variable,index){
                      getWithBrack(variable);
                    });
                  } else {}
                 
                  keyPath = Obj;
                  value = keyPath;
                  substr = null;
                  Obj = data;
                } else {}
              }
              if (value == undefined) {
                if (lookForARR[i] == repeatX) {value = x;}
              }
              if (value == undefined) {
                if (lookForARR[i].substr(0, 1) == '"') {
                  value = lookForARR[i].replace(/"/g, "");
                } else if (lookForARR[i].substr(0,1) == "'") {
                  value = lookForARR[i].replace(/'/g, "");
                }
              }
              if (value != undefined) {break;}
            }
            if (value != undefined) {
              r = ct__ + lookFor + ce__;
              if (typ == "attribute") {
                rowClone.value = rowClone.value.replace(r, value);
              } else {
                replaceHtml(rowClone, r, value);
              }
            }
            pos1 = pos1 + 1;
            Obj = data;
          }
          Obj = data;
          return rowClone;
        }
        function replaceHtml(a, r, result) {
          var b, l, i, a, x, j;
          if (a.hasAttributes()) {
            b = a.attributes;
            l = b.length;
            for (i = 0; i < l; i += 1) {
              if (b[i].value.indexOf(r) > -1) {b[i].value = b[i].value.replace(r, result);}
            }
          }
          x = a.getElementsByTagName("*");
          l = x.length;
          a.innerHTML = a.innerHTML.replace(r, typeof result == "object" ? JT(result) : result);
        }
      };

      _displayObject(contr,O_B_J);
    }

    connectedCallback(){
      
    }
  }
  customElements.define('manager-module',ManagerModule);

  // +++
  // + Error Handlers
  // +++

  class errors{
    static undefined = {
      module: function(name){
        throw new Error('\n' + name + " Is not extended or is not defined, cannot get the property \"" + name + "\" in Manager, try importing it by using Manager.extends() function.");
      }
    };

    static exists = function(name){
      throw new Error('\n' + name + " Already is extended, make Manager.extends(name,function,true) to update existing object.");
    }

    static limitEx = function(){
      throw new Error('\nLimit Exceeded in Manager.LSM, try making: new Manager.LSM().limit(Infinity).');
    }

    static err404 = function(fname){
      throw new Error('\nError 404, GET ' + fname + ", responded with status of 404");
    }

    static err = function(msg){
      throw new Error('\n'+ msg);
    }

    static errNotObject = function(vari,type){
      this.typeErr('The type of the Array '+ vari +' is not an object, it is ' + type);
    }

    static typeErr = function(msg){
      throw new TypeError('\n'+ msg);
    }

    static warn = function(msg){
      console.warn('\n'+ msg);
    }
  }

  document.currentScript.noModule = false;

  if(currentScript == null){
    errors.err("The currentScript is null,"+
      " it must be an Object to let manager work\n"+
      " You will need to declare the type of the"+
      " script by adding the type attribute and making it " + fileTypes.js);
  } else if(currentScript.type != fileTypes.js){
    errors.err("The type of the script is not " + fileTypes.js +
    " It is "+ currentScript.type +". It must be " + fileTypes.js + 
    " to make Manager work well," + "please make it " + fileTypes.js +
    " ny using the attribute type,");
  } else {}


  // +++
  // + Modules
  // +++

  function LSM(name,op){
    var self = this;

    var defaults = {
      'onset': function(name = name,id,val){},
    };

    var options = $.extend({},defaults, op);

    self.name = name ? name : (document.title ? document.title : 'LSMjs_'+randFrom(1000,9999));
    self.options = options;
    self.default.self = self;
    self.session.self = self;
    self.cookie.self = self;

    self.init();

  }

  LSM.prototype = {

    init: function(){
      var that = this,
          options = that.options,
          Methods,name,Settings = options;

      function getLocalStorage(){
        that.LS = JP(JT(localStorage));

        //that.LS = that.LS.sort();

        return that.LS
      }

      getLocalStorage();

      name = that.name;

      that.__proto__.reload = function(){
        that.init(options);
      }

      that.__proto__.LSG = localStorage.__proto__;
      that.__proto__.SSG = sessionStorage.__proto__;

      localStorage.__proto__['LSM_'+name] = that;
      sessionStorage.__proto__['LSM_'+name] = that;

      that.__proto__._lsm_ = {
        LS: localStorage.__proto__['LSM_'+name],
        SS: sessionStorage.__proto__['LSM_'+name],
        s: [Storage.__proto__,Storage],
      };

    },

    defineLSG: function(){
      var that = this,
        name = that.name;

      if(localStorage.getItem(name) == null){
        var newLSMObject = JP(JT({name:name}));
        localStorage.setItem(name,JT(newLSMObject));
      }
    },

    new: function(res,val){
      var that = this,
        name = that.name;

      that.defineLSG();

      //localStorage[name].unshift(res);

      var updateLSMObject = JSON.parse(localStorage.getItem(name));

      //console.log(updateLSMObject)

      //updateLSMObject = updateLSMObject.filter(el => JT(el) != JT(res));

      //console.log(updateLSMObject);

      //updateLSMObject.unshift(res);

      updateLSMObject[res] = val;

      localStorage.setItem(name,JT(updateLSMObject));

      that.options.onset(name,res,JT(val));

    },

    set: function(res,val){
      var that = this;

          that.new(res,val);
    },

    get: function(res,...values){
      var that = this,
        name = that.name,ret,_ret;

      that.defineLSG();

      //localStorage[name].unshift(res);

      var getFromLSMObject = JSON.parse(localStorage.getItem(name));

      that.__proto__.getAll = function(){
        return getFromLSMObject
      }

      //if(!res && !index) return getFromLSMObject;

      if(res !== null){
        ret = getFromLSMObject[res];
      } else{}

      if(values != null){
        _ret = values.length == 1 ? values : toArray2(values);
        _ret.forEach(function(prop){
          ret = ret[prop];
        });
      }
      
      return ret;
    },

    remove: function(res){
      var that = this,
        name = that.name;

      that.defineLSG();

      //localStorage[name].unshift(res);

      var updateLSMObject = JSON.parse(localStorage.getItem(name));

      //console.log(updateLSMObject)

      //updateLSMObject = updateLSMObject.filter(el => JT(el) != JT(res));

      //console.log(updateLSMObject);

      delete updateLSMObject[res];

      localStorage.setItem(name,JT(updateLSMObject));
    },

    delete: function(item){
      var that = this;
      that.remove(item)
    },

    clone: function(item1,item2){
      var that = this,
        name = that.name;

      var itVal = that.get(item1);

      //console.log(itVal)

      that.set(item2,itVal);

    },

    rename: function(item1,item2){
      var that = this,
        name = that.name;

      that.clone(item1,item2);
      that.remove(item1);

    },

    default: {

      get: function(item){
        var getFromDefaultLsmObject = JSON.parse(localStorage.getItem(item));

        if(getFromDefaultLsmObject == null){
          getFromDefaultLsmObject = localStorage.getItem(item)
        }

        return getFromDefaultLsmObject
      },

      set: function(item,val){
        var that = this,
            onset = that.self.options.onset;
        var value = JT(val);

        localStorage.setItem(item,value);
        onset("DEFAULT(Storage)",item,value);
      },

      remove: function(item){
        localStorage.removeItem(item);
      },

      delete: function(item){
        var that = this;
        that.remove(item)
      },

      clone: function(item1,item2){
        var that = this;

        var gotLSMObject = that.get(item1);

        that.set(item2,gotLSMObject);

      },

      rename: function(item1,item2){
        var that = this;

        that.clone(item1,item2);
        that.delete(item1);

      }

    },

    session: {

      get: function(item){
        var getFromDefaultLsmObject = JSON.parse(sessionStorage.getItem(item));

        if(getFromDefaultLsmObject == null){
          getFromDefaultLsmObject = sessionStorage.getItem(item)
        }

        return getFromDefaultLsmObject
      },

      set: function(item,val){
        var that = this,
            onset = that.self.options.onset;

        var value = JT(val);

        sessionStorage.setItem(item,value);
        onset("DEFAULT(Storage.Session)",item,value);
      },

      remove: function(item){
        sessionStorage.removeItem(item);
      },

      delete: function(item){
        var that = this;
        that.remove(item)
      },

      clone: function(item1,item2){
        var that = this;

        var gotLSMObject = that.get(item1);

        that.set(item2,gotLSMObject);

      },

      rename: function(item1,item2){
        var that = this;

        that.clone(item1,item2);

        that.remove(item1);

      }

    },

    saveForm: function(el,options){
      var that = this,
          that_name = that.name + '_form',
          $el = $(el),
          defaults = {
            exclude: ':password, input[type="hidden"], :file, .disable_save',
            include: null,
            formName: that_name,
            addPathToName: false,
            addPathLength: -255,
            loadInputs: true,
            sameNameSeparator: '___',
            resetOnSubmit: true
          },
          settings = $.extend({},defaults, options);

        var _elementList = [];
        var _loadingList = {};
        var _formName = '';

        var $plugin = that.saveForm;

        $plugin.setFormName = function() {
          var $form = $el;
          _formName =
              settings.formName !== undefined
                  ? settings.formName
                  : $form.attr('id') !== undefined
                  ? $form.attr('id')
                  : $form.attr('name') !== undefined
                  ? $form.attr('name')
                  : undefined;
          if (_formName == undefined) {
              var formIndex = $('form').index($form);
              if (formIndex !== -1) {
                  _formName =
                      window.location.pathname +
                      '_formindex_' +
                      formIndex;
              } else {
                  return false;
              }
          }
          if (settings.addPathToName === true) {
              _formName =
                  _formName +
                  '___' +
                  window.location.pathname.slice(
                      settings.addPathLength
                  );
          }
          return true;
      };

      $plugin.setFormName();

      var $5 = 'SaveForm_'+_formName;

      if(that.get($5) == undefined){
        that.set($5,{})
      } else {}

      $plugin.set = function(name,val){

        var EJ = that.get($5);

        EJ[name] = val;

        that.set($5,EJ);

      };

      $plugin.get = function(name){

        var TOBJ = that.get($5);

        TOBJ = TOBJ[name];

        return TOBJ

      };

      $plugin.remove = function(name){

        var TOBJ = that.get($5);

        delete TOBJp[name];

      };

      $plugin.addElement = function(element) {
          var $element = $(element);
          if ($element.is(settings.exclude)) {
              return;
          }
          if (
              settings.include !== null &&
              !$element.is(settings.include)
          ) {
              return;
          }
              var name = $plugin.getName(element),
              callbackMatch = undefined;
          if($plugin.callbacks.length > 0) {
              $.each($plugin.callbacks, function(index, callback) {
                  if(callback.match(element)) {
                      callbackMatch = callback;
                      return false;
                  }
              });
          }
          if (name) {
              $element
                  .on('input',function(e) {
                      $plugin.storeElement(e);
                  })
                  .keyup(
                      debounce(function(e) {
                          $plugin.storeElement(e);
                      }, 500)
                  );

              if (_loadingList[name] === undefined) {
                  _loadingList[name] = 0;
              } else {
                  // If another element is found with the same name that isn't a radio group,
                  // add multiple data to differentiate the field
                  if (!$element.is(':radio')) {
                      _loadingList[name]++;

                      $.data(
                          element,
                          'multiple',
                          _loadingList[name]
                      );
                      name =
                          name +
                          settings.sameNameSeparator +
                          _loadingList[name];
                  }
              }
              if (_elementList.indexOf(name) === -1) {
                  _elementList.push(name);
              }
              if (settings.loadInputs === true) {
                  if (callbackMatch && callbackMatch.loadElement) {
                      callbackMatch.loadElement(element, $plugin);
                  } else {
                      $plugin.loadElement(element);
                  }
              }
          }
      };

      $plugin.loadElement = function(element) {
        var $element = $(element),
            name = this.getName(element),
            value = $plugin.get(name);
        if (value !== null) {
            value = value;
            if ($element.is(':checkbox')) {
                $element.prop('checked', value).change();
            } else if ($element.is(':radio')) {
                if (value == $element.val()) {
                    $element.prop('checked', true).change();
                }
            } else {
                $element.val(value).change();
            }
        }
      };

      $plugin.storeElement= function(event) {
          var name = $plugin.getName(event.target),
              $element = $(event.target),
              value;
          if ($(event.target).is(':checkbox')) {
              value = $element.prop('checked');
          } else {
              value = $element.val();
          }
          $plugin.set(name,value);
      };

      $plugin.storeElementList= function() {
          $plugin.set(
              'elementList_' + _formName,
              _elementList
          );
      };

      $plugin.clearElementList= function() {
          $plugin.remove('elementList_' + _formName);
      };

      $plugin.getName= function(element) {
          var $element = $(element);
          // Set by name first to allow radio groups to function, then id
          var elName =
              $element.attr('name') !== undefined
                  ? $element.attr('name')
                  : $element.attr('id') !== undefined
                  ? $element.attr('id')
                  : undefined;
          if (elName === undefined) {
              return undefined;
          }
          return (
              _formName +
              '_' +
              elName +
              ($.data(element, 'multiple') !== undefined
                  ? settings.sameNameSeparator +
                    $.data(element, 'multiple')
                  : '')
          );
      }

      $plugin.callbacks = [];

      $plugin.addCallback = function(callback) {
        $plugin.callbacks.push(callback);
      };

      $plugin.getElementList = function(savedFormName) {
        return (
                  $plugin.get('elementList_' + savedFormName)
              || []
          );
      };

      $plugin.clearStorage = function(savedFormName) {
          var elements = $plugin.getElementList(savedFormName);
          if (elements.length > 0) {
              $.each(elements, function(key, value) {
                  $plugin.remove(value);
              });
              return true;
          }
      }


      if (!$plugin.setFormName()) {
          return;
      }
      _elementList = $plugin.getElementList(_formName);
      $el.find(':input')
          .each(function() {
              $plugin.addElement(this);
          });
      $plugin.storeElementList();
      if (settings.resetOnSubmit === true) {
          $el.submit(function() {
              $plugin.clearStorage($plugin._formName);
          });
      }

      function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        if (null == wait) wait = 100;

        function later() {
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        }

        var debounced = function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };

        debounced.clear = function() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };

        debounced.flush = function() {
            if (timeout) {
                result = func.apply(context, args);
                context = args = null;

                clearTimeout(timeout);
                timeout = null;
            }
        };

        return debounced;
      }

    },

    cookie: {
      outputmethod: function(output){
        console.log(output);
      },
      options: {
        expires: 7,
        path: "/"
      },
      new: function(name,values,config){
        var that = this,
            self = that.self,
            globalOptions = that.options;

        var options = $.extend({}, globalOptions, config);
        $.cookie( name, JSON.stringify(values), options );

      },

      check: function(name){
        var that = this,
            self = that.self,
            globalOptions = that.options;

        if ( name !== null && name !== undefined ) {
          var get_mc = $.cookie(name);
          if ( get_mc === null ) {
            that.outputmethod('No cookie.');
            return false;
          };
          return true;
        } else {
          that.outputmethod('No cookie selected.');
          return false; 
        };

      },

      verify: function(name){
        var that = this,
            self = that.self,
            globalOptions = that.options;

        if ( name !== null && name !== undefined ) {
          var get_mc = $.cookie(name);
          if ( get_mc === null ) {
            that.outputmethod('No cookie.');
            return false;
          };
          if ( jQuery.isEmptyObject(get_mc) ) {
            that.outputmethod('Invalid values.');
            return false;
          }
          try{
            JSON.parse(get_mc);
          } catch (e) {
            that.outputmethod('Not JSON.');
            return false;
          }
          return true;
        } else {
          that.outputmethod('No cookie selected.');
          return false; 
        };
      },

      check_index: function (name, index_s) {
        var get_mc = this.read_JSON(name);
        var check = null;
        $.each( get_mc, function(index,value){
          if ( index_s === index ) {
            check = "ok";
          };
        });
        if ( check === null ) {
          return false;
        } else {
          return true;
        };
      },

      read_values: function (name) {
        if ( !this.verify(name) ) {
          return false;
        } else {
          return $.cookie(name);
        };
      },
      
      read_indexes: function (name) {
        var get_mc = this.read_JSON(name);
        var check = [];
        $.each( get_mc, function(index,value){
          check.push( index );
        });
        return check;
      },
    
      read_JSON: function (name) {
        if ( !this.verify(name) ) {
          return false;
        } else {
          return JSON.parse($.cookie(name));
        
        };
      },
      
      read_value: function (name, index_s) {
        var get_mc = this.read_JSON(name);
        var check = null;
        $.each( get_mc, function(index,value){
          if ( index_s == index ) {
            check = value;
          };
        });
        if ( check === null ) {
          return false;
        } else {
          return check;
        };
      },
      
      replace_value: function (name, index_s, new_value, config) {
        var get_mc = this.read_JSON(name),field;
        var check = [];
        $.each( get_mc, function(index,value){
          field = "\"" + index + "\": \"" + value + "\"";
          if ( index_s === index ) {
            field = "\"" + index + "\": \"" + new_value + "\"";
            check.push( field );
          } else {
            check.push( field );
          };
        });
        check = "{" + check.join(", ") + "}";
        var ocheck = {};
        ocheck = JSON.stringify(check);
        var options = $.extend({}, this.options, config);
        $.removeCookie(name);
        $.cookie( name, JSON.parse(ocheck), options );
      },
      
      add_value: function (name, new_index, new_value, config) {
        var get_mc = this.read_JSON(name),field;
        var check = [];
        $.each( get_mc, function(index,value){
          field = "\"" + index + "\": \"" + value + "\"";
          check.push( field );
        });
        check.push("\"" + new_index + "\": \"" + new_value + "\"");
        check = "{" + check.join(", ") + "}";
        var ocheck = {};
        ocheck = JSON.stringify(check);
        var options = $.extend({}, this.options, config);
        $.removeCookie(name);
        $.cookie( name, JSON.parse(ocheck), options );
      },
      
      remove_value: function (name, remove_index, config) {
        var get_mc = this.read_JSON(name),field;
        var check = [];
        $.each( get_mc, function(index,value){
          field = "\"" + index + "\": \"" + value + "\"";
          if ( remove_index !== index ) {
            check.push( field );
          };
        });
        check = "{" + check.join(", ") + "}";
        var ocheck = {};
        ocheck = JSON.stringify(check);
        var options = $.extend({}, this.options, config);
        $.removeCookie(name);
        $.cookie( name, JSON.parse(ocheck), options );
      }

    },
    
    __proto__: {
      get _get(){

      },
      set _set(___){

      },
    },
  }

  function TM(options){
    var self = this,
        defaults = {},
        options = $.extend({},defaults, options);

    var Day_1 = new Date().getDay(),
      Day_2 = Day_1 + 1,
      Day_3 = Day_2 + 1,
      Day_4 = Day_3 + 1,
      Day_5 = Day_4 + 1,
      Day_6 = Day_5 + 1,
      Day_7 = Day_6 + 1;

    self.options = options;
    self.time = {
      date : new Date().getDate(),
      day : new Date().getDay(),
      fullYear : new Date().getFullYear(),
      year : new Date().getYear(),
      hours : new Date().getHours(),
      miSecs : new Date().getMilliseconds(),
      min : new Date().getMinutes(),
      mon : new Date().getMonth(),
      sec : new Date().getSeconds(),
      time : new Date().getTime(),
      ds : new Date().toDateString(),
      loc : new Date().toLocaleTimeString(),
      locD : new Date().toLocaleDateString(),
      gmt : new Date().toGMTString(),
      iso : new Date().toISOString(),
      json : new Date().toJSON(),
      locS: new Date().toLocaleString(),
      str: new Date().toString(),
      tiS: new Date().toTimeString(),
      today: Day_1,
      tomorrow: Day_2,
      Day_3: Day_3,
      Day_4: Day_4,
      Day_5: Day_5,
      Day_6: Day_6,
      Day_7: Day_7,
      now: new Date().now,
      // UTC : Universal Time C..
      Udate : new Date().getUTCDate(),
      Uday : new Date().getUTCDay(),
      UfullYear : new Date().getUTCFullYear(),
      Uhours : new Date().getUTCHours(),
      UmiSecs : new Date().getUTCMilliseconds(),
      Umin : new Date().getUTCMinutes(),
      Umon : new Date().getUTCMonth(),
      Usec : new Date().getUTCSeconds(),
      uStr: new Date().toUTCString(),
      TimeFun : function(time) {
        return new Date()[time]();
      },
      TimeFun2: function(time) {
        return new Date(time);
      },
      'D': function(){
        return new Date()
      },
    }
  }

  TM.prototype = {
    timeData: {},
    getDayName: function(caseNum_){
      var caseNum = caseNum_;
      if(caseNum > 6){
        caseNum = 0;
      }
      switch (caseNum) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";            
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
      };
    },
    countDown: function(time,func){
      var that = this,
          timeNum = time,
          timeToReturn = 0;

      if(typeof time == "number"){
        func(timeNum);
        that._CountDown_ = setInterval(function(){
          timeNum--;
          timeToReturn++;

          if(timeNum == 0){
            clearInterval(that._CountDown_);
          }

          func(timeNum);
        },1000);
      } else {}

      return {timeNum,timeToReturn};
    },
    countUp: function(time,func){
      var that = this,
          timeNum = 0,
          timeToReturn = 0;

      if(typeof time == "number"){
        func(timeNum);
        that._CountUp_ = setInterval(function(){
          timeNum++;
          timeToReturn--;

          if(timeNum == time){
            clearInterval(that._CountUp_);
          }
          
          func(timeNum);
        },1000);
      } else {}

      return {timeNum,timeToReturn};
    },
    stopCounts: function(){
      var that = this;
      if(that._CountDown_ != undefined){
        clearInterval(that._CountDown_);
      }

      if(that._CountUp_ != undefined){
        clearInterval(that._CountUp_);
      }
    },
    toStr: function(time,stringify = true){
      if(stringify == false){
        return Math.floor(time);
      } else {
         var nSec = Math.floor(time / 1000),
              hh = Math.floor(nSec / 3600),
              min = Math.floor(nSec / 60) - Math.floor(hh * 60),
              sec = Math.floor(nSec - (hh * 3600) - (min * 60));
        // Empty Line
        return (stringify ? ((hh ? hh + ':' : '') + (hh && min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)) : { min: min, sec: sec });
      }
    },
    delay: function(time,functions,name_ = null){
      var that = this,
      name = name_ != null ? name_ : '';
      that.timeData["DelayTimeOut" + "_" + name] = setTimeout(functions,time);
    },
    int: function(time,functions,name_ = null){
      var that = this,
      name = name_ != null ? name_ : '';
      that.timeData["IntervaTime" + "_" + name] = setInterval(functions,time);
    },
    removeDelay: function(name_ = null){
      var that = this,
      name = name_ != null ? name_ : '';
      clearTimeout(that.timeData["DelayTimeOut" + "_" + name])
    },
    removeInt: function(name_ = null){
      var that = this,
      name = name_ != null ? name_ : '';
      clearInterval(that.timeData["IntervaTime" + "_" + name])
    },
    
  }

  function filter__($input,$el,options = {}){
      //var clr = $clr ? $($clr) : $('none.none#none[none]');
      this.init($($el),$($input),options ? options : {});
  }

  filter__.prototype = {
    init: function (el,$filter,options = {}) {
        var clearlink, match, filter, filtertext, that = this;
        that.el = el;

        $.expr[':'].icontains = function (obj, index, meta, stack) {
            return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
        };

        that.settings = $.extend({
            'alternate': null,
            'alternateclass': 'alternate',
            'nofilter': 'nofilter',
            'callback': null,
            'count': null,
            'emptymessage': null,
            'submit': null,
            'clearlink': null
        }, options);

        that.items = el.find('div, li, tr');
        that.el = el;

        if ($filter) {
            filter = $filter;
        } else {
            filter = $('<input></input>', {
                type: "text"
            }).prependTo(el);
        }

        that.filter = filter;

        if (that.settings.clearlink == 'auto') {
            clearlink = $('<a>Clear</a>').insertAfter(filter);
        } else {
            clearlink = that.settings.clearlink ? that.settings.clearlink : $('none.none#none[none]');
        }

        if (that.settings.alternate) {
            that.items.filter(':odd').addClass(that.settings.alternateclass);
        }

        if (that.settings.count) {
            that.settings.count.text(that.items.length);
        }

        if(that.settings.submit){
          that.settings.submit.click(function(){
            that.filterFun();
          });
        } else {
          filter
              .change(function () {
                  that.filterFun();
              }).on('keyup', function () {
                  filter.change();
              }).on('search', function () {
                  filter.change();
              });
        }

        clearlink.on('click', function () {
            filter.val('').change();
        });
        return el;
      },
      filterFun: function(){
        var that = this,
        el = that.el,
        filter = that.filter,
        match,filtertext;

        el.find('.searchbar---EmptyMessage').remove();

        filtertext = filter.val();

        that.items.hide();

        if (that.settings.alternate) {
            that.items.removeClass(that.settings.alternateclass);
        }

        if (filtertext.length < 1) {
            match = that.items;
        } else {
            match = that.items.filter('.' + that.settings.nofilter + ', :icontains(' + filtertext + ')');
            if (that.settings.emptymessage) {
                match = match.not(that.settings.emptymessage);
            }
        }

        if (that.settings.alternate) {
            match.filter(':odd').addClass(that.settings.alternateclass);
        }

        match.show();

        if (that.settings.count) {
            that.settings.count.text(match.length);
        }

        if (that.settings.emptymessage) {
          el.find('.searchbar---EmptyMessage').remove();
            if (match.length === 0) {
                el.append('<div class="searchbar---EmptyMessage">'+
                  that.settings.emptymessage
                +'</div>')
            } else {
              el.find('.searchbar---EmptyMessage').remove();
            }
        }

        if (that.settings.callback) {
            that.settings.callback();
        }
      },
      refresh: function () {
          // Get a reference to the items in the list
          var that = this, filtertext, filter, match;
          that.items = that.el.find('div, li, tr');

          // If alternate is set, remove the alternate class from all the items and reapply it as appropriate
          if (that.settings.alternate) {
              that.items.removeClass(that.settings.alternateclass);

              // If filter is not empty, allow for that
              filter = that.settings.filter;
              filtertext = filter.val();
              if (filtertext.length > 0) {
                  match = that.items.filter('.' + that.settings.nofilter + ', :icontains(' + filtertext + ')');
                  match.filter(':odd').addClass(that.settings.alternateclass);
              } else {
                  that.items.filter(':odd').addClass(that.settings.alternateclass);
              }
          }
      },
      __proto__: function(){
        return this;
      }
  };

  function OBJManager(name){
    var that = this;
    if(that.constructor(manager).Objs == undefined){
      _createClass(that.constructor(manager),null,[
        {
          key: "Objs",
          value: {},
        }
      ]);
    } else {}

    if(that.constructor(manager).Objs[name] == undefined){
      _createClass(that.constructor(manager).Objs,null,[
        {
          key: name,
          value: {},
        }
      ]);
    } else {}
    

    that.name = name;
    that.Objs = that.constructor(manager).Objs;

    that.__proto__.arrays = Array;
    that.__proto__.objects = Object;
  }

  OBJManager.prototype = {
    set: function(id,val){
      var that = this;
      var Obj = that.Objs[that.name];

      Obj[id] = val;
    },
    get: function(id){
      var that = this,ret;

      ret = that.Objs[that.name][id];

      return ret;
    },
    remove: function(id){
      var that = this;
      delete that.Objs[that.name][id];
    },
    _get: function(id){
      var that = this;
      return that.Objs[that.name];
    },
    concat: function(name){
      var that = this,
          objToConcat = that.Objs[name];

      for(var item in objToConcat){
        that.Objs[that.name][item] = objToConcat[item];
      }
    },
    controller: function(contr,fun,{extends:extends_ = null}){
      var self = this,
          contrs = {},
          Contrs = {},
          objs = self.Objs,
          O_B_J;

      if(extends_ == null || extends_ == false){
        O_B_J = objs;
      } else {
        O_B_J = objs[extends_];
      }

      contrs[contr] = O_B_J;
      fun(O_B_J);

      function OutPutController(){

        $('manager-module[module="'+contr+'"],[manager-module="'+contr+'"]').each(function(e,index){
          var $that = $(this),value,elemId = 'manager-module_'+contr+"_"+e;

          $that.attr('id',elemId);

          $that.find('module').each(function(){
            var $ths = $(this);

                    

            if($ths.attr('name')){
              if($ths.attr('value')){
                value = $ths.attr('value');
                O_B_J[$ths.attr('name')] = value;
              }

              value = O_B_J[$ths.attr('name')];

              if(value != undefined){
                if($ths.attr('prints')){
                  if(typeof O_B_J[$ths.attr('name')] == "object") value = JT(O_B_J[$ths.attr('name')]);
                  if($ths.attr('prints') == "value"){
                    $ths.html(value);
                  } else {
                    $ths.html($ths.attr('name') + " = " +value);
                  }
                } else {}
              } else {
                errors.err($ths.attr('name') + " Is not defined.");
              } 
            } else {

            }

          });
          
          $that[0].displayObject(Contrs,contr,O_B_J);

        });

      }

      OutPutController();

      function getController(ctrl){
        var __proto = {
          controller: ctrl,
          reload: function(){
            OutPutController();
          },
          el: $('manager-module[module="'+ctrl+'"],[manager-module="'+ctrl+'"]'),
          object: O_B_J,
          parentObject: objs,
          parentController: self,
          self: self.__proto__,
        },__proto_real = function ManagerController(){
          for (var i in __proto){
            this[i] = __proto[i];
          }
        };

        return new __proto_real();
      }

      self.__proto__.getController = getController;

      return {
        objs: O_B_J,
        reload: OutPutController
      }
    },
    
  }


  function http(file){
    if(file){
      this.get(file);
    } 
  }

  http.prototype = {
    get: function(file){
      var that = this,returned;
      that.open(file,function(){
        if (this.readyState == 4) {
          if (this.status == 200) {returned =  this.responseText;}
          if (this.status == 404) {returned =  "File not found.";errors.err404(file);}
        }
      });

      return returned;
    },

    open: function(target, readyfunc, xml, method){
      var that = this;
      var httpObj;
      if (!method) {method = "GET"; }
      if (window.XMLHttpRequest) {
        httpObj = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        httpObj = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (httpObj) {
        if (readyfunc) {httpObj.onreadystatechange = readyfunc;}
        httpObj.open(method, target, false);
        httpObj.send(xml);
      }
    },

    getJson: function (file, func) {
      var that = this,JsonObject;
      that.open(file, function () {
        if (this.readyState == 4 && this.status == 200) {
          func(JSON.parse(this.responseText));
          JsonObject = JSON.parse(this.responseText);
        } else if(this.status == 404){
          errors.err404(file);
        } else {}
      });
      return JsonObject;
    },

    getXml: function (file, func) {
      var that = this,XMLDoc;
      that.open(file, function () {
        if (this.readyState == 4 && this.status == 200) {
          func(this.responseXML);
          XMLDoc = this.responseXML;
        } else if(this.status == 404){
          errors.err404(file);
        } else {}
      });

      return XMLDoc;
    },

    http: XMLHttpRequest,

    ajax: $.ajax,
  }

  /*
 * May 2015
 * scrollDetection 1.0.0
 * @author Mario Vidov, With the help of Kevin Jhonson
  */

  function scrollDetection($el,options){
    var settings = $.extend({
        scrollDown: function() {},
        scrollUp: function() {}
    }, options),el = $el != null ? $el : window;

    $(el).scroll(function () {
        var cursorPosition = $(this).scrollTop();
        if (cursorPosition > scrollPosition) {
            settings.scrollDown();
        }
        else if (cursorPosition < scrollPosition) {
            settings.scrollUp();
        }
        scrollPosition = cursorPosition;
    });
  }

  $.fn.extend({
    scrollDetection: function(options){
      var that = this;
      scrollDetection(that,options);
    },
  });

  function browserWindow(onpageshow,onpagehide){
    var hidden = "hidden";
    var self = this;

    self.onpageshow = onpageshow;
    self.onpagehide = onpagehide;

    if (hidden in document){
      document.addEventListener("visibilitychange", onchange);
    } else if ((hidden = "mozHidden") in document){
      document.addEventListener("mozvisibilitychange", onchange);
    } else if ((hidden = "webkitHidden") in document){ 
      document.addEventListener("webkitvisibilitychange", onchange);
    } else if ((hidden = "msHidden") in document){
      document.addEventListener("msvisibilitychange", onchange);
    } else if ("onfocusin" in document){
      document.onfocusin = document.onfocusout = onchange;
    } else{
      window.onpageshow = window.onpagehide
        = window.onfocus = window.onblur = onchange;
    }

    function onchange (evt) {
      var v = "visible", h = "hidden",
        evtMap = {   
          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

      evt = evt || window.event;
      if (evt.type in evtMap) { 
        if($.isFunction(onpageshow)){
          onpageshow();
        }
      }
      else {
        if($.isFunction(onpagehide)){
          onpagehide();
        }
      }
    }

    if( document[hidden] !== undefined ){
      onchange({type: document[hidden] ? "blur" : "focus"});
    }

  }

  browserWindow.prototype = {
    onpageshow: function(){},
    onpagehide: function(){},
    
  }

  function claculator(){

  }

  claculator.prototype = {
    calc: function(statement){
      if(isNaN(statement)){
        errors.typeErr("Statement " + statement + " is not a number, it's a " + typeof statement);
      } else {
        return Number(statement);
      }
    },
    format: function(num){
      if(num == " "){
        return "";
      }
      if(isNaN(num)){
        errors.typeErr("The Parameter given must be a number, " + num + ", it's a " + typeof num)
      } else {
        var Num = Number(num);
        
        var formatted = Num.toLocaleString();
        return formatted
      }
    },
    toNumber: function(num){
      /*if(typeof num != "number" || typeof num != "string"){
        errors.typeErr("The Parameter given must be a number or a string, " + num + ", it's a " + typeof num);
        return false;
      } else {*/
        var numbered = Number(num.replace(/,/g,''));
      //}
      
      if(isNaN(numbered)){
        errors.typeErr("The Result for the Parameter given must be a number, " + numbered + ", it's a " + typeof numbered);
        return false;
      } else {
        return numbered
      }
    },
    
  }

  function ifrCtrl(el,url){
    var self = this;

    self.el = $(el);
    self.url = url;

    self.create();
  }

  ifrCtrl.prototype = {
    create: function(){
      var self = this,
          $el = self.el,
          el = self.el[0],
          url = self.url,
          ID;
          
      var ifr = document.createElement("iframe"),
      ifrContent = new http().get(url); 

      self.iframeEl = ifr;

      ID = el.id ? el.id + "_iframe" : url+"_iframe";

      function setIframe(){
        ifr.style = el.style;
        ifr.height = el.height;
        ifr.width = el.width;
        ifr.setAttribute("src", url);
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("height", el.height);
        ifr.setAttribute("width", el.width ? el.width : "100%");
        
        ifr.id = ID;
      }

      setIframe();

      el.innerHTML = "";
      el.appendChild(ifr);
      var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
      

      if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
        ifrw.document.body.contentEditable = true;
        ifrw.document.body.contentEditable = false;
      }

      ifrw.document.open();
        ifrw.document.write(ifrContent);
        self.iframe = ifrw;
      ifrw.document.close();

      self.__proto__.reloadIframe = function(){
        self.iframe.location.reload();
      };
      self.__proto__.reload = function(){
        self.destroy();
        self.create();
      };
    },
    destroy: function(){
      var self = this,
          $el = self.el;

      $el.empty();    
    },
    getIframe: function(){
      var self = this,
          ifr = self.iframeEl,
          ifrw = self.iframe;

      return {
        window: ifrw,
        document: ifrw.document,
        content: $(ifrw.document),
        body: $(ifrw.document).find('body'),
        ifr: $(ifr),
        id: ifr.id,
      };

    },
    height: function(height){
      var self = this,
          $el = self.el,
          el = self.el[0],
          ifrw = self.iframeEl;

      if(!height){
        return Number(ifrw.height);
      } else {
        $el.height(height);
        ifrw.height = height;
        ifrw.setAttribute("height", height);
        return Number(ifrw.height);
      }
    },
    width: function(width){
      var self = this,
          $el = self.el,
          el = self.el[0],
          ifrw = self.iframeEl;

      if(!width){
        return Number(ifrw.width);
      } else {
        $el.width(width);
        ifrw.width = width;
        ifrw.setAttribute("width", width);
        return Number(ifrw.width);
      }
    },
    __proto__: function IframeController(){
      return this;
    }
  }



  function component(el){
      var self = this;

      self.el = $(el);

      self.Fullscreen.self = self;
  }

  component.prototype = {
    getHeader: function getHeader(headEl){
      var self = this,
          $el = self.el,
          $hEl = $(headEl);

      var HeaderContent = new http().get('./header.html');
      if(headEl != null){
        $el.find(headEl).html(HeaderContent);
      } else {
        $el.prepend(HeaderContent);
      }
    },
    getFooter: function getFooter(footEl){
      var self = this,
          $el = self.el,
          $hEl = $(footEl);

      var FooterContent = new http().get('./footer.html');

      if(footEl != null){
        $el.find(footEl).html(FooterContent);
      } else {
        $el.prepend(FooterContent);
      }
    },

    Fullscreen: {
      isOpen: false,
      open: function openFullscreen(){
        var self = this,
            elem = self.self.el[0];
        

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }

        self.isOpen = true;
      },
      close: function closeFullscreen() {
        var self = this,
            elem = self.self.el[0];
        
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }

        self.isOpen = false;
      }
    },

    nel: function newElement(el){
      var self = this,
          $el = self.el,
          element = $(`<${el}></${el}>`);

      element.output = function Output(){
        element.appendTo($el);
      };

      element.outputTo = function OutputTo($el_){
        element.appendTo($el_);
      };
      
      return element;
    },

    tableRow: function NewTableRow(...rows){
      var self = this,
          rows_ = toArray2(rows),
          tr = $('<tr></tr>'),item_,item__,attrs_ = [],
          attrs__ = "",Row_ = "";

      rows_.forEach(function(item,index){

        if(typeof item == "string"){
          item_ = item;
          attrs_ = [];
        } else if(typeof item == "object"){
          item_ = item.html;
          if(item.attrs){
            attrs_ = item.attrs;
          }
        } else {
          item_ = "";
          attrs_ = [];
        }

        if(typeof attrs_ == "object"){
          for(var attr in attrs_){
            attrs__ += attr+"=\""+attrs_[attr]+"\"";
          }
        } else {
          attrs__ += "";
        }

        item__ = item_;

        Row_ = $(`<td ${attrs__}>${item__}</td>`);

        tr.append(Row_);

        item_ = "";
        item__ = "";
        attrs_ = [];
        attrs__ = "";
        Row_ = "";
      });

      return tr;
    },
    fileChooser: function(onchange,readAs,options){

      var settings = $.extend({
        name: null,
        multiple: false,
        accepts: false
      },options),_readAs;

      if(!onchange) return false;
      if(!readAs) return false;

      if(readAs == "text"){
        _readAs = "readAsText";
      } else if(readAs == "data"){
        _readAs = "readAsDataURL";
      } else if(readAs == "arrayBuffer"){
        _readAs = "readAsArrayBuffer";
      } else {
        errors.err(readAs + " is not defined. try: text,data or arrayBuffer");
        return false;
      }

      var fileChooser = $("<input />",{
        'type': "file",
      });

      if(settings.multiple == true){
        fileChooser.attr("multiple","true");
      } else {}
      if(settings.accepts != null && settings.accepts != false){
        fileChooser.attr("accept",accepts);
      } else {}

      fileChooser.on("change",function(event){
        let files = event.target.files;
        if (!files || !files.length) {
          return false;
        }

        files = toArray(files);

        files.forEach(function(file,index){
          let reader = new FileReader()
          reader.onload = (evt) => {
            try {
              onchange(evt,event,fileChooser);
            } catch (e) {
              errors.err(e);
            }
          }
          reader[_readAs](file)
        });
      });

      fileChooser.click();

      return fileChooser;
    },
    __proto__: function ManagerComponent(){
      return this;
    }
  }




  function Version (version) {
      this.original = null;
      this.major = null;
      this.minor = null;
      this.build = null;
      this.revision = null;
      this.initialize(version);
  };
  Version.prototype.initialize = function (version) {
    var arr = version.split('.');
    this.original = version;
    this.major = (arr && arr[0]) ? parseInt(arr[0], 10) : null;
    this.minor = (arr && arr[1]) ? parseInt(arr[1], 10) : null;
    this.build = (arr && arr[2]) ? parseInt(arr[2], 10) : null;
    this.revision = (arr && arr[3]) ? parseInt(arr[3], 10) : null;
  };
  Version.prototype.isEqual = function (major, minor, build, revision) {
    if (typeof major !== 'number') {
        return false;
    }
    if (typeof minor !== 'number') {
        return (this.major === major);
    }
    if (typeof build !== 'number') {
        return (this.major === major && this.minor === minor);
    }
    if (typeof revision !== 'number') {
        return (this.major === major && this.minor === minor && this.build === build);
    }
    return (this.major === major && this.minor === minor &&
            this.build === build && this.revision === revision);
  };
  Version.prototype.isOrLess = function (major, minor, build, revision) {
    if (typeof major !== 'number') {
        return false;
    }
    if (this.major !== major) {
        return (this.major < major);
    }
    if (typeof minor !== 'number') {
        return true;
    }
    if (this.minor !== minor) {
        return (this.minor < minor);
    }
    if (typeof build !== 'number') {
        return true;
    }
    if (this.build !== build) {
        return (this.build < build);
    }
    if (typeof revision !== 'number') {
        return true;
    }
    if (this.revision !== revision) {
        return (this.revision < revision);
    }
    return true;
  };
  Version.prototype.isLessThan = function (major, minor, build, revision) {
    if (typeof major !== 'number') {
        return false;
    }
    if (this.major !== major) {
        return (this.major < major);
    }
    if (typeof minor !== 'number') {
        return false;
    }
    if (this.minor !== minor) {
        return (this.minor < minor);
    }
    if (typeof build !== 'number') {
        return false;
    }
    if (this.build !== build) {
        return (this.build < build);
    }
    if (typeof revision !== 'number') {
        return false;
    }
    if (this.revision !== revision) {
        return (this.revision < revision);
    }
    return false;
  };
  Version.prototype.isOrMore = function (major, minor, build, revision) {
    if (typeof major !== 'number') {
        return false;
    }
    if (this.major !== major) {
        return (this.major > major);
    }
    if (typeof minor !== 'number') {
        return true;
    }
    if (this.minor !== minor) {
        return (this.minor > minor);
    }
    if (typeof build !== 'number') {
        return true;
    }
    if (this.build !== build) {
        return (this.build > build);
    }
    if (typeof revision !== 'number') {
        return true;
    }
    if (this.revision !== revision) {
        return (this.revision > revision);
    }
    return true;
  };
  Version.prototype.isMoreThan = function (major, minor, build, revision) {
    if (typeof major !== 'number') {
        return false;
    }
    if (this.major !== major) {
        return (this.major > major);
    }
    if (typeof minor !== 'number') {
        return false;
    }
    if (this.minor !== minor) {
        return (this.minor > minor);
    }
    if (typeof build !== 'number') {
        return false;
    }
    if (this.build !== build) {
        return (this.build > build);
    }
    if (typeof revision !== 'number') {
        return false;
    }
    if (this.revision !== revision) {
        return (this.revision > revision);
    }
    return false;
  };
  Version.prototype.toString = function () {
      return this.original;
  };
  function BrowserInfo(){
    this.original = '';
    this.version = null;
    this.initialize(window.navigator.userAgent);

  };
  BrowserInfo.prototype.initialize = function (userAgent) {
    var array;
    var browser = '';
    var engine = '';
    var architecture = '';
    var version = null;
    userAgent = userAgent.toLowerCase();

    if (userAgent.indexOf('opera') >= 0 || userAgent.lastIndexOf('opr') >= 0) {
        if (userAgent.indexOf('opera mini') >= 0) {
            browser = 'operamini';
            array = /opera mini\/([\d\.]+)/.exec(userAgent);
            version = (array) ? array[1] : '';
        } else if (userAgent.indexOf('opera mobi') >= 0) {
            browser = 'operamobile';
            array = /version\/([\d\.]+)/.exec(userAgent);
            version = (array) ? array[1] : '';
        } else {
            browser = 'opera';
            array = /version\/([\d\.]+)/.exec(userAgent);
            if (array) {
                version = array[1];
            } else{
                array = /(?:opera|opr)[\s\/]+([\d\.]+)/.exec(userAgent);
                version = (array) ? array[1] : '';
            }
        }
    } else if (userAgent.indexOf('edge') >= 0 || userAgent.indexOf('edg') >= 0) {
        browser = 'edge';
        array = /(edge|edg)\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[2] : '';
    } else if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('trident') >= 0) {
        browser = 'msie';
        array = /(msie|rv:?)\s?([\d\.]+)/.exec(userAgent);
        version = (array) ? array[2] : '';
    } else if (userAgent.indexOf('firefox') >= 0) {
        browser = 'firefox';
        array = /firefox\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else if (userAgent.indexOf('chrome') >= 0 || userAgent.indexOf('crios') >= 0) {
        browser = 'chrome';
        array = /[chrome|crios]\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else if (userAgent.indexOf('android') >= 0) {
        browser = 'browser';
        array = /version\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else if (userAgent.indexOf('silk') >= 0) {
        browser = 'silk';
        array = /silk\/([\d\.]*)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else if (userAgent.indexOf('mercury') >= 0) {
        browser = 'mercury';
        array = /mercury\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else if (userAgent.indexOf('safari') >= 0) {
        browser = 'safari';
        array = /version\/([\d\.]+)/.exec(userAgent);
        version = (array) ? array[1] : '';
    } else {
        browser = 'unknown';
        version = '';
    }

    if (userAgent.indexOf('edge') >= 0) {
        engine = 'edge';
    } else if (userAgent.indexOf('webkit') >= 0) {
        engine = 'webkit';
    } else  if (userAgent.indexOf('trident') >= 0) {
        engine = 'trident';
    } else if (userAgent.indexOf('presto') >= 0) {
        engine = 'presto';
    } else if (userAgent.indexOf('khtml') >= 0) {
        engine = 'khtml';
    } else if (userAgent.indexOf('gecko') >= 0) {
        engine = 'gecko';
    } else {
        engine = 'unknown';
    }

    if (userAgent.indexOf('arm') >= 0) {
        architecture = 'arm';
    } else if (userAgent.indexOf('win64') >= 0) {
        if (userAgent.indexOf('ia64') >= 0) {
            architecture = 'ia64';
        } else {
            architecture = 'x64';
        }
    } else {
        architecture = 'x86';
    }

    this.original = browser;
    this[browser] = true;
    this[engine] = true;
    this[architecture] = true;
    this.version = (!window.__BACKWARD_COMPATIBILITY_ENABLED) ? new Version(version) : version;

  };

  BrowserInfo.prototype.is = function (type) {

      return (typeof type === 'string') && (type.toLowerCase() === this.original);

  };

  function PlatformInfo() {
    this.original = '';
    this.initialize(window.navigator.userAgent);

  };

  PlatformInfo.prototype.initialize = function (userAgent) {
    var type = '';
    var platform = '';
    var architecture = '';
    var version = '';
    var result = null;
    var mobile = /iphone|ipod|ipad|android|windows phone|silk|blackberry|symbian|mobile/;
    var pc = /windows|mac|linux/;
    var array;
    userAgent = userAgent.toLowerCase();

    result = mobile.exec(userAgent);
    if (result) {
        if (userAgent.indexOf('silk') >= 0) {
            type = 'tablet';
            platform = 'android';
        } else {
            if ((userAgent.indexOf('android') >= 0 && userAgent.indexOf('mobile') < 0) ||
                (userAgent.indexOf('ipad') >= 0)) {
                type = 'tablet';
            } else {
              type = 'mobile';
            }
            platform = result[0].replace(' ', '');
        }
    } else {
        if (userAgent.indexOf('windows') >= 0) {
            type = 'pc';
            platform = 'windows';
            array = /windows nt ([\d\.]+)/.exec(userAgent);
            version = (array) ? array[1] : '';
            if (userAgent.indexOf('arm') >= 0) {
                architecture = 'arm';
            } else if (userAgent.indexOf('win64') >= 0) {
                if (userAgent.indexOf('ia64') >= 0) {
                    architecture = 'ia64';
                } else {
                    architecture = 'x64';
                }
            } else if (userAgent.indexOf('wow64') >= 0) {
                architecture = 'x64';
            } else {
                architecture = 'x86';
            }
        } else if (userAgent.indexOf('mac') >= 0) {
            type = 'pc';
            platform = 'mac';
            architecture = 'unknown';
        } else if (userAgent.indexOf('linux') >= 0) {
            type = 'pc';
            platform = 'linux';
            architecture = 'unknown';
        } else {
            type = 'unknown';
            platform = 'unknown';
            architecture = 'unknown';
        }
    }
    this.type = type;
    this.original = platform;
    this[type] = true;
    this[platform] = true;
    this[architecture] = true;
    this.version = new Version(version);
  };

  PlatformInfo.prototype.is = function (name) {
    if (typeof name === 'string') {
        name = name.toLowerCase();
        return ((name === this.original) || (name === this.type));
    } else {
        return false;
    }
  };









  function browserInfo(){
    var Browser = new BrowserInfo(),
    Platform = new PlatformInfo();

    return{
      browser: Browser.original,
      version: Browser.version.original,
      build: Browser.version.build,
      platform: Platform.original,
      isBrowser: Browser.is,
      isPlatform: Platform.is,
      isVersion: Browser.version,
      __proto__: BrowserInfo,
    }
  }

  function ManagerOn(el){
    var $el = $(el),
        elem = $el[0],
    Props =  {
      "hold": function (callback,options){
        var settings = $.extend({
          time:5000,
          click:'all'
        },options);
        
        return $el.each(function(){
          var $this = $(this);
          $this.onHold_callback = callback;
          $this.data('onHold_selected',false);
          $this.mousedown(function(ev){
            var valid = false;
            switch(settings.click)
            {
            case 'left':
              if(ev.button == 0) valid = true;
              break;
            case 'right':
              if(ev.button == 2) valid = true;
              break;
            case 'middle':
              if(ev.button == 1) valid = true;
              break;
            case 'left_right':
              if(ev.button == 0 || ev.button == 2) valid = true;
              break;
            case 'all':
              valid = true;
              break;
            }
            
            if(valid)
            {
              $this.data('onHold_selected',true);
              
              setTimeout(function(){
                  if($this.data('onHold_selected')){
                    $this.onHold_callback(ev);
                  }},settings.time);

              $this.mouseup(function(ev){
                $this.data('onHold_selected',false);
              });
            }
          });
        }); 

        return Props;
      },

    }
    return Props;
  };

















  /*

  ||=====}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  ||===== ( Starting "manager" function and prototype);
  ||=====}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

  */

  

  // +++
  // + Manager
  // +++

  let ManagerProto = {

    LSM: LSM,
    TM: TM,
    sortTable: function($table,method = 'a-z'){
      var table, rows, switching, i, x, y, shouldSwitch,G;
        table = $($table)[0];

      var Mth = method ? method : 'a-z';

      switching = true;
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 0; i < (rows.length - 1);i++) {

          shouldSwitch = false;

          x = rows[i].getElementsByTagName("TD")[0];
          y = rows[i + 1].getElementsByTagName("TD")[0];

          var thatCase = Mth == 'z-a' ? x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() : x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase();

          if (thatCase) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }

      return {
        method: method,
      };
    },

    sortList: function($list,method = 'a-z'){
      var list, i, switching, b, shouldSwitch;

      list = $($list)[0];
      switching = true;

      var Mth = method ? method : 'a-z';

      while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        
        for (i = 0; i < (b.length - 1); i++) {
          
          shouldSwitch = false;
          
          var __sorting__ = Mth == 'z-a' ? (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) : (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase());

          if (__sorting__) {
            shouldSwitch = true;
            break;
          }
        }
        //console.log(b[i].parentNode.__proto__);
        if (shouldSwitch) {
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
        }
      }

      return {
        method: method,
      };
    },

    filter: filter__,

    OBJM: OBJManager,

    http: http,

    scrollDetection: scrollDetection,

    pickRandom: pickRandom,
    randFrom: randFrom,

    browserWindow: browserWindow,

    claculator: claculator,

    ifrCtrl: ifrCtrl,

    component: component,

    browser: browserInfo(),

    on: ManagerOn,

    fetch: async function Fetch(url,functions,options){
      var _fetch = new http(),fetched,fetchedData,
          fetchedJson,fetchedXml,fetchedDatas;

      fetched = _fetch.get(url);
      fetchedData = _fetch.get(url);
      fetchedJson = _fetch.getJson(url,function(){});
      fetchedXml = _fetch.getXml(url,function(){});

      fetchedDatas = {
        text: function(){
          return fetched;
        },
        data: function(){
          return fetchedData
        },
        json: function(){
          return fetchedJson
        },
        xml: function(){
          return fetchedXml;
        },
      }

      functions(fetchedDatas)

      return fetchedDatas;
    },

    animate: function(el,keyframes,count,time){
      var self = this,
          $el = $(el),
          time = time ? time : 1000,
          animation = "",
          keyFrame_s = "",
          name = el;

      name = testNameCase(name);

      self.animate.$animate = $.fn.animate;
          

      animation = "manager__animation__"+randFrom(1111,9999)+"__"+name;

      for(var keyframe in keyframes){
        var _keyframe = keyframes[keyframe];
        keyFrame_s += `
            ${keyframe}{`
        for(var prop in _keyframe){
          keyFrame_s += `${prop}:${_keyframe[prop]};`;
        }
        keyFrame_s += `}
        `;
        console.log(keyframe);
      }

      keyFrame_s = `
        <style>
          @keyframes ${animation}{
            ${keyFrame_s}
          }
        </style>
      `;

      animation = time+"ms " + (count ? count : "1") + " "+animation;

      console.log(keyFrame_s,animation);
      $el.css({
        'animation': animation,
      });
      $('head').append(keyFrame_s);
    },

    asLongAs: function aslongas(condition,functions,failClallBack){
      if(condition){
        while(condition){
          if($.isFunction(functions)){
            functions(condition);
          }
        }
        return true;
      } else {
        if($.isFunction(failClallBack)){
          failClallBack(condition);
        }
        return false
      }
    },

    extends: function Extend($object,$name,isUpdate = false){
      var that = this,
      name = $name != null? $name : ($object.name ? $object.name : ($object.__proto__.name ? $object.__proto__.name : null)),
      isObject = typeof $object != "string" && typeof $object != "number";

      if(name == null){
        if(typeof $object == "string" || typeof $object == "number"){
          name = $object;
        } else {
          errors.err($object + "'s name is not defined. Maybe you should put the name yourself");
        }
      } else {}

      if(isObject){
        if($object.extendedByManager && $object.extendedByManager == true && isUpdate == false){
          errors.exists(name);
          return false;
        };
      }

      _createClass($object.__proto__, null, [{
        key: "__mangerProto__",
        value: that.__mangerProto__
      }]);

      _createClass(that, null, [{
        key: name,
        value: $object,
      }]);

      if(isObject){
        $object.extendedByManager = true;
      }

      return {
        object: $object,
        name: name,
      }
    },
    extendsFunction: function ExtendFunction(module,fun,isUpdate = false){
      var that = this,
          name = module,fun_;

      fun_ = typeof fun == "function" ? fun : Function(fun);

      return that.extends(fun_,name,isUpdate);
    },

    eval: function(functions){
      eval(functions);
    },

    exec: function(module,...args){
      var that = this,
          name = module,
          fun;

      if(that[name] != undefined && that[name].extendedByManager == true){
        fun = that[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      fun = args ? fun(args) : fun();


    },

    unExtend: function UnExtend(module){
      var that = this,
          name = module;

      if(that[name] != undefined && that[name].extendedByManager == true){
        delete that[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      return {
        object: that[name],
        name: name,
        unextended: that[name] == undefined ? true : false,
      }
    },

    exportModule: function ExportModule(module){
      var that = this,
          name = module;

      if(that[name] != undefined && that[name].extendedByManager == true){
        window[module] = that[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      return {
        object: that[name],
        extendedTo: true,
      }
    },

    define: function Define(name,dependencies,module,options){
      var self = this,deps,allAreFound = true,unFound = "",name,
      settings = {
        caseIns: true,
      };

      settings = $.extend({},settings, options);

      if(!dependencies || typeof dependencies != "object"){
        deps = [];
      } else {
        deps = dependencies;
      }

      deps.forEach(function(item){
        if(self[item] != undefined){
          allAreFound = true;
        } else {
          allAreFound = false;
          unFound = item;
        }
      });

      function extend(){
        if(name != null){
          self.extends(module,name,true);
        } else {
          self.extends(module,null,true);
        }
      }

      if(allAreFound == true){
        extend()
      } else {
        if(settings.caseIns == false){
          extend()
        } else {}
        errors.warn(unFound + " is not defined in Manager, you still can extend " + unFound + ".");
      }

      return {
        __proto__: {
          defineIn: function(object){

            if(object){
              self.defineIn([name,module],object);
            } else {
              errors.err("Cannot import " + name + " to undefined");
            }

          }
        }
      }
    },

    defineIn: function DefineIn([name,module],module2){
      var self = this,
      name_ = name ? name : "anonymous";
      if(module2){
        if(module && name){

          module2[name_] = module;

        } else {
          errors.err("Cannot import " + name_ + ", " + name_ + " is not defined");
        }
      } else {
        errors.err("Cannot import " + name_ + " to undefined");
      }

      return {
        __proto__: {
          extends: function(name){
            if(name){
              self.extends(module,name,true);
            } else {
              self.extends(module,name_,true);
            }
          },
        },
      }
    },

    require: function Require(file,options){
      var self = this,callback,script,status,
      settings = {
        "as": null,
        "callback": null,
        "extends": false,
      },script_;

      settings = $.extend({},settings, options);

      if($.isFunction(settings.callback)){
        callback = settings.callback;
      } else {
        callback = function(){}
      }

      script = $.getScript(file,callback);
      script_ = new http().get(file);

      script.done(() => {
        script_ = script.responseText;
      });

      status = script.statusCode();

      if(status == 404){
        errors.err404(file);
      } else {
        if(settings.extends != false){
          extend(settings.as);
        } else {}
      }

      function extend(name){
        if(name != null){
          if(script_){
            self.extendsFunction(name,script_,true);
          } else {}
        } else {
          self.extendsFunction(file.replace(/\./img,'_'),script_,true);
        }
      }

      return {
        script: script_,
        file: file,
        __proto__: {
          extends: function(name){
            var name_ = name ? name : (settings.as ? settings.as : file.replace(/\./img,'_'));
            extend(name_);
          },
          ready: function(func){
            script.done(() => {
              func({
                script: script_,
                file: file,
              });
            });
          },
          appendTo: function(elem){
            if(elem){
              $("<script></script>").attr("src",file).appendTo(elem);
            } else {
              errors.err("Can't append <script> to undefined");
            }
          }
        }
      }

    },

    requireJSON: function(json,res){
      var self = this,
        JsonObject = {},
        JsonObjectHttp = new http().getJson(json,function(response){
          JsonObject = response;
        });

      if(res){
        JsonObject = JsonObject[res];
      } else {}

      return JsonObject;
    },

    getScript: function(file){
      var self = this,_file;

      if(!file) return;

      _file = file+'.manager';

      var script_ = new http().get(_file); 
      var _moduleInfo = script_.split(moduleStart)[1].split(moduleEnd)[0],
      _moduleName = _moduleInfo.split('name:')[1].split(',')[0],
      _moduleVersion = _moduleInfo.split('version:')[1].split(',')[0],
      _moduleFunctionName = _moduleInfo.split('moduleFunction:')[1].split(',')[0];

      _moduleVersion = _moduleVersion.split('/')[1].split('/')[0];

      var _moduleFunction = script_.split(moduleFunStart)[1]
          .split(moduleFunEnd)[0];

      _moduleFunction+= "Manager.extends("+_moduleFunctionName+",\""+_moduleName+"\")";

      self.eval(_moduleFunction);

      if(!self[_moduleName] || self[_moduleName] == null) return;

      _createClass(self[_moduleName],null,[{
        key: "Manager."+_moduleName,
        value: _moduleFunction,
      }]);
    },

    fn: FN,

  };

  let _Manager__Proto = {
    info: new function Info(){return plugin},
    __mangerProto__: {
      self: window,
      m: new function Manager(){return this},
      document: {
        doc: document,
        title: document.title,
        pathInfo: location,
        history: history,
        type: document.doctype,
        script: currentScript,
        search: location.search,
        hash: location.hash,
        name: function GetFileName(){
          var loc = location.pathname ? location.pathname : location.href,
              _loc = loc.split("/"),
              name = "";

          name = _loc[_loc.length - 1];

          name = name == "" ? _loc[_loc.length - 2] : name;

          return name;
        }(),
      },
      root: navigator,
      __proto__: class ManagerProto{
        ManagerProto(){
          return ManagerProto;
        }
      },
    },
  };

  for(var proto in ManagerProto){
    _Manager__Proto.__mangerProto__.__proto__.__defineGetter__(proto,function(){
      return ManagerProto[proto];
    });
    _Manager__Proto.__mangerProto__.__proto__.__defineSetter__(proto,function(arg){
      return ManagerProto[proto];
    });
  }

  class manager{
    constructor(){
      var self = this;

      for(var proto in _Manager__Proto){
        self[proto] = _Manager__Proto[proto];
      }

      _createClass(self,null,[{
        key: "__mangerProto__",
        value: _Manager__Proto["__mangerProto__"],
      }]);

      self.info.__proto__ = function info(){
        return this;
      };
    }
  }

  const Manager = new manager();

  for(var _module in ManagerProto){
    ManagerProto["$constructor"] = Manager;
    _createClass(ManagerProto[_module].__proto__, null, [{
      key: "__mangerProto__",
      value: ManagerProto.__mangerProto__}
    ]);
    _createClass(Manager, null, [{
      key: _module,
      value: ManagerProto[_module],
    }]);
  }

  Manager.__proto__ = manager;

  _createClass(window, null, [{
    key: "Manager",
    value: Manager,
  }]);

  $.extend({
    "m": Manager,
  });

  $(document).ready(function(){

    class ManagerInclude extends HTMLElement{
      constructor(){
        super();
      }

      connectedCallback(){
        var $ths = $(this),
          $file = $ths.attr('file'),
          $http = new http(),$content;

        $content = $http.get($file);

        $ths.html($content);
      }
    }
    customElements.define('manager-include',ManagerInclude);

    class ManagerScript extends HTMLElement{
      constructor(){
        super();
      }

      render(){
        var $ths = $(this),
          $src = $ths.attr('src'),
          $script = $ths.text();

        $ths.prop('hidden','true');

        if($src){
          Manager.require($src);
          return false;
        } else {
          Manager.eval($script);
        }
      }

      connectedCallback(){
        this.render();
      }

      attributeChangedCallback(name,oldVal,newVal){
        this.render();
      }

    }
    customElements.define('manager-script',ManagerScript);
  });

  return Manager;
}));

/*# sourceMappingURL=manager.js.map */
