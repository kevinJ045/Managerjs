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

  var plugin = { 
    name: 'Manager.js',
    developer: 'Kevin',
    description: 'A javascript library to enhance and manage javascript',
    git_repo: 'https://github.com/kevinj045/manager.js',
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
    others: {
      credits: ['kevinj045','Jeremy Ashkenas and DocumentCloud']
    }
  },fileTypes = {
    html: "application/html",
    css: "stylesheet/css",
    js: "application/javascript",
    xml: "application/xml",
    xquery: "application/xquery",
    php: "application/x-httpd-php",
  },FN = $,
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
  },onRE = /^@|^manager:/,
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
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== null) {
      $.cookie(key, null, options);
      return true;
    }
    return false;
  };

  $("<style></style>").html(`
    manager-include,manager-module,manager-module module{
      width: 100%;
      height: auto;
      clear: both;
    }
  `).appendTo('head');

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
  };

  function OBJManager(name){
    var that = this;
    if(that.constructor(manager).Objs == undefined){
      that.constructor(manager).Objs = {};
    } else {}
    if(that.constructor(manager).Objs[name] == undefined){
      that.constructor(manager).Objs[name] = {};
    } else {}
    

    that.name = name;
    that.Objs = that.constructor(manager).Objs;
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

        var getElementsByAttribute = function (x, att) {
          var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
          l = y.length;
          for (i = -1; i < l; i += 1) {
            if (i == -1) {y[i] = x;}
            if (y[i].getAttribute(z) !== null) {arrCount += 1; arr[arrCount] = y[i];}
          }
          return arr;
        };  

        function displayObject(id, data) {
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
                  if(keyPath.match(/\./)){
                    Obj = data;
                    keyPath = keyPath.match(/\./igm);
                    keyPath.forEach(function(variable1,index){
                      match = substr.split(variable1);
                      match.forEach(function(variable,index){
                        if(index == 0){Obj = data;};
                        if(variable.match(/\[/igm)){
                          match = variable.split('[')[1].split(']')[0];
                          keyPath = variable.replace("["+match+"]",'');
                          Obj = Obj[keyPath];
                          Obj = Obj[match] != undefined ? Obj[match] : Obj;
                        } else {
                          Obj = Obj[variable];
                        }
                        console.log(Obj);
                      });
                    });
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

        displayObject(contr,O_B_J);

      });
    
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
      var that = this;
      that.open(file, function () {
        if (this.readyState == 4 && this.status == 200) {
          func(JSON.parse(this.responseText));
        } else if(this.status == 404){
          errors.err404(file);
        } else {}
      });
    },

    getXml: function (file, func) {
      var that = this;
      that.open(file, function () {
        if (this.readyState == 4 && this.status == 200) {
          func(this.responseXML);
        } else if(this.status == 404){
          errors.err404(file);
        } else {}
      });
    },

    http: XMLHttpRequest,

    ajax: $.ajax,
  }

  $('manager-include[file]').each(function(){
    var $ths = $(this),
        $file = $ths.attr('file'),
        $http = new http(),$content;

    $content = $http.get($file);

    $ths.html($content);
  });

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

  }




  function toColorObject(color) {
    var x, y, typ, arr = [], c = String(color), arrlength, i, opacity, match, a, hue, sat, rgb, colornames = [], colorhexs = [];
    
    c = ColorTrim(c.toLowerCase());
    x = c.substr(0,1).toUpperCase();
    y = c.substr(1);
    a = 1;
    if ((x == "R" || x == "Y" || x == "G" || x == "C" || x == "B" || x == "M" || x == "W") && !isNaN(y)) {
      if (c.length == 6 && c.indexOf(",") == -1) {
      } else {
        c = "ncol(" + c + ")";
      }
    }
    if (c.length != 3 && c.length != 6 && !isNaN(c)) {c = "ncol(" + c + ")";}
    if (c.indexOf(",") > 0 && c.indexOf("(") == -1) {c = "ncol(" + c + ")";}  
    if (c.substr(0, 3) == "rgb" || c.substr(0, 3) == "hsl" || c.substr(0, 3) == "hwb" || c.substr(0, 4) == "ncol" || c.substr(0, 4) == "cmyk") {
      if (c.substr(0, 4) == "ncol") {
        if (c.split(",").length == 4 && c.indexOf("ncola") == -1) {
          c = c.replace("ncol", "ncola");
        }
        typ = "ncol";
        c = c.substr(4);
      } else if (c.substr(0, 4) == "cmyk") {
        typ = "cmyk";
        c = c.substr(4);
      } else {
        typ = c.substr(0, 3);
        c = c.substr(3);
      }
      arrlength = 3;
      opacity = false;
      if (c.substr(0, 1).toLowerCase() == "a") {
        arrlength = 4;
        opacity = true;
        c = c.substr(1);
      } else if (typ == "cmyk") {
        arrlength = 4;
        if (c.split(",").length == 5) {
          arrlength = 5;
          opacity = true;
        }
      }
      c = c.replace("(", "");
      c = c.replace(")", "");
      arr = c.split(",");
      if (typ == "rgb") {
        if (arr.length != arrlength) {
          return emptyObject();
        }
        for (i = 0; i < arrlength; i++) {
          if (arr[i] == "" || arr[i] == " ") {arr[i] = "0"; }
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i] / 100);
            if (i < 3 ) {arr[i] = Math.round(arr[i] * 255);}
          }
          if (isNaN(arr[i])) {return emptyObject(); }
          if (parseInt(arr[i]) > 255) {arr[i] = 255; }
          if (i < 3) {arr[i] = parseInt(arr[i]);}
          if (i == 3 && Number(arr[i]) > 1) {arr[i] = 1;}
        }
        rgb = {r : arr[0], g : arr[1], b : arr[2]};
        if (opacity == true) {a = Number(arr[3]);}
      }
      if (typ == "hsl" || typ == "hwb" || typ == "ncol") {
        while (arr.length < arrlength) {arr.push("0"); }
        if (typ == "hsl" || typ == "hwb") {
          if (parseInt(arr[0]) >= 360) {arr[0] = 0; }
        }
        for (i = 1; i < arrlength; i++) {
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i]);
            if (isNaN(arr[i])) {return emptyObject(); }
            arr[i] = arr[i] / 100;
          } else {
            arr[i] = Number(arr[i]);
          }
          if (Number(arr[i]) > 1) {arr[i] = 1;}
          if (Number(arr[i]) < 0) {arr[i] = 0;}
        }
        if (typ == "hsl") {rgb = hslToRgb(arr[0], arr[1], arr[2]); hue = Number(arr[0]); sat = Number(arr[1]);}
        if (typ == "hwb") {rgb = hwbToRgb(arr[0], arr[1], arr[2]);}
        if (typ == "ncol") {rgb = ncolToRgb(arr[0], arr[1], arr[2]);}
        if (opacity == true) {a = Number(arr[3]);}
      }
      if (typ == "cmyk") {
        while (arr.length < arrlength) {arr.push("0"); }
        for (i = 0; i < arrlength; i++) {
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i]);
            if (isNaN(arr[i])) {return emptyObject(); }
            arr[i] = arr[i] / 100;
          } else {
            arr[i] = Number(arr[i]);
          }
          if (Number(arr[i]) > 1) {arr[i] = 1;}
          if (Number(arr[i]) < 0) {arr[i] = 0;}
        }
        rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
        if (opacity == true) {a = Number(arr[4]);}
      }
    } else if (c.substr(0, 3) == "ncs") {
      rgb = ncsToRgb(c);
    } else {
      match = false;
      colornames = getColorArr('names');
      for (i = 0; i < colornames.length; i++) {
        if (c.toLowerCase() == colornames[i].toLowerCase()) {
          colorhexs = getColorArr('hexs');
          match = true;
          rgb = {
            r : parseInt(colorhexs[i].substr(0,2), 16),
            g : parseInt(colorhexs[i].substr(2,2), 16),
            b : parseInt(colorhexs[i].substr(4,2), 16)
          };
          break;
        }
      }
      if (match == false) {
        c = c.replace("#", "");
        if (c.length == 3) {c = c.substr(0,1) + c.substr(0,1) + c.substr(1,1) + c.substr(1,1) + c.substr(2,1) + c.substr(2,1);}
        for (i = 0; i < c.length; i++) {
          if (!isHex(c.substr(i, 1))) {return emptyObject(); }
        }
        arr[0] = parseInt(c.substr(0,2), 16);
        arr[1] = parseInt(c.substr(2,2), 16);
        arr[2] = parseInt(c.substr(4,2), 16);
        for (i = 0; i < 3; i++) {
          if (isNaN(arr[i])) {return emptyObject(); }
        }
        rgb = {
          r : arr[0],
          g : arr[1],
          b : arr[2]
        };
      }
    }
    return colorObject(rgb, a, hue, sat);
  }
  function colorObject(rgb, a, h, s) {
    var hsl, hwb, cmyk, ncol, color, hue, sat;
    if (!rgb) {return emptyObject();}
    if (!a) {a = 1;}
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    hue = (h || hsl.h);
    sat = (s || hsl.s);   
    ncol = hueToNcol(hue);
    color = {
      red : rgb.r,
      green : rgb.g,
      blue : rgb.b,
      hue : hue,
      sat : sat,
      lightness : hsl.l,
      whiteness : hwb.w,
      blackness : hwb.b,
      cyan : cmyk.c,
      magenta : cmyk.m,
      yellow : cmyk.y,
      black : cmyk.k,
      ncol : ncol,
      opacity : a,
      valid : true
    };
    color = roundDecimals(color);
    return color;
  }
  function emptyObject() {
    return {
      red : 0,
      green : 0,
      blue : 0,
      hue : 0,
      sat : 0,
      lightness : 0,
      whiteness : 0,
      blackness : 0,
      cyan : 0,
      magenta : 0,
      yellow : 0,
      black : 0,
      ncol : "R",
      opacity : 1,
      valid : false
    };
  }
  function getColorArr(x) {
    if (x == "names") {return ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen']; }
    if (x == "hexs") {return ['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32']; }
  }
  function roundDecimals(c) {
    c.red = Number(c.red.toFixed(0));
    c.green = Number(c.green.toFixed(0));
    c.blue = Number(c.blue.toFixed(0));
    c.hue = Number(c.hue.toFixed(0));
    c.sat = Number(c.sat.toFixed(2));
    c.lightness = Number(c.lightness.toFixed(2));
    c.whiteness = Number(c.whiteness.toFixed(2));
    c.blackness = Number(c.blackness.toFixed(2));
    c.cyan = Number(c.cyan.toFixed(2));  
    c.magenta = Number(c.magenta.toFixed(2));
    c.yellow = Number(c.yellow.toFixed(2));
    c.black = Number(c.black.toFixed(2));
    c.ncol = c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1)));
    c.opacity = Number(c.opacity.toFixed(2));
    return c;
  }
  function hslToRgb(hue, sat, light) {
    var t1, t2, r, g, b;
    hue = hue / 60;
    if ( light <= 0.5 ) {
      t2 = light * (sat + 1);
    } else {
      t2 = light + sat - (light * sat);
    }
    t1 = light * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return {r : r, g : g, b : b};
  }
  function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if(hue < 3) return t2;
    else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
  }
  function hwbToRgb(hue, white, black) {
    var i, rgb, rgbArr = [], tot;
    rgb = hslToRgb(hue, 1, 0.50);
    rgbArr[0] = rgb.r / 255;
    rgbArr[1] = rgb.g / 255;
    rgbArr[2] = rgb.b / 255;
    tot = white + black;
    if (tot > 1) {
      white = Number((white / tot).toFixed(2));
      black = Number((black / tot).toFixed(2));
    }
    for (i = 0; i < 3; i++) {
      rgbArr[i] *= (1 - (white) - (black));
      rgbArr[i] += (white);
      rgbArr[i] = Number(rgbArr[i] * 255);
    }
    return {r : rgbArr[0], g : rgbArr[1], b : rgbArr[2] };
  }
  function cmykToRgb(c, m, y, k) {
    var r, g, b;
    r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
    g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
    b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);
    return {r : r, g : g, b : b};
  }
  function ncolToRgb(ncol, white, black) {
    var letter, percent, h, w, b;
    h = ncol;
    if (isNaN(ncol.substr(0,1))) {
      letter = ncol.substr(0,1).toUpperCase();
      percent = ncol.substr(1);
      if (percent == "") {percent = 0;}
      percent = Number(percent);
      if (isNaN(percent)) {return false;}
      if (letter == "R") {h = 0 + (percent * 0.6);}
      if (letter == "Y") {h = 60 + (percent * 0.6);}
      if (letter == "G") {h = 120 + (percent * 0.6);}
      if (letter == "C") {h = 180 + (percent * 0.6);}
      if (letter == "B") {h = 240 + (percent * 0.6);}
      if (letter == "M") {h = 300 + (percent * 0.6);}
      if (letter == "W") {
        h = 0;
        white = 1 - (percent / 100);
        black = (percent / 100);
      }
    }
    return hwbToRgb(h, white, black);
  }
  function hueToNcol(hue) {
    while (hue >= 360) {
      hue = hue - 360;
    }
    if (hue < 60) {return "R" + (hue / 0.6); }
    if (hue < 120) {return "Y" + ((hue - 60) / 0.6); }
    if (hue < 180) {return "G" + ((hue - 120) / 0.6); }
    if (hue < 240) {return "C" + ((hue - 180) / 0.6); }
    if (hue < 300) {return "B" + ((hue - 240) / 0.6); }
    if (hue < 360) {return "M" + ((hue - 300) / 0.6); }
  }
  function ncsToRgb(ncs){
    var black, chroma, bc, percent, black1, chroma1, red1, factor1, blue1, red1, red2, green2, blue2, max, factor2, grey, r, g, b; 
    ncs = ColorTrim(ncs).toUpperCase();
    ncs = ncs.replace("(", "");
    ncs = ncs.replace(")", "");
    ncs = ncs.replace("NCS", "NCS ");
    ncs = ncs.replace(/  /g, " ");  
    if (ncs.indexOf("NCS") == -1) {ncs = "NCS " + ncs;}
    ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);
    if (ncs === null) return false;
    black = parseInt(ncs[1], 10);
    chroma = parseInt(ncs[2], 10);
    bc = ncs[3];
    if (bc != "N" && bc != "Y" && bc != "R" && bc != "B" && bc != "G") {return false;}
    percent = parseInt(ncs[4], 10) || 0;
    if (bc !== 'N') {
      black1 = (1.05 * black - 5.25);
      chroma1 = chroma;
      if (bc === 'Y' && percent <= 60) {
        red1 = 1;
      } else if (( bc === 'Y' && percent > 60) || ( bc === 'R' && percent <= 80)) {
        if (bc === 'Y') {
          factor1 = percent - 60;
        } else {
          factor1 = percent + 40;
        }
        red1 = ((Math.sqrt(14884 - Math.pow(factor1, 2))) - 22) / 100;
      } else if ((bc === 'R' && percent > 80) || (bc === 'B')) {
        red1 = 0;
      } else if (bc === 'G') {
        factor1 = (percent - 170);
        red1 = ((Math.sqrt(33800 - Math.pow(factor1, 2))) - 70) / 100;
      }
      if (bc === 'Y' && percent <= 80) {
        blue1 = 0;
      } else if (( bc === 'Y' && percent > 80) || ( bc === 'R' && percent <= 60)) {
        if (bc ==='Y') {
          factor1 = (percent - 80) + 20.5;
        } else {
          factor1 = (percent + 20) + 20.5;
        }
        blue1 = (104 - (Math.sqrt(11236 - Math.pow(factor1, 2)))) / 100;
      } else if ((bc === 'R' && percent > 60) || ( bc === 'B' && percent <= 80)) {
        if (bc ==='R') {
          factor1 = (percent - 60) - 60;
        } else {
          factor1 = (percent + 40) - 60;
        }
        blue1 = ((Math.sqrt(10000 - Math.pow(factor1, 2))) - 10) / 100;
      } else if (( bc === 'B' && percent > 80) || ( bc === 'G' && percent <= 40)) {
        if (bc === 'B') {
          factor1 = (percent - 80) - 131;
        } else {
          factor1 = (percent + 20) - 131;
        }
        blue1 = (122 - (Math.sqrt(19881 - Math.pow(factor1, 2)))) / 100;
      } else if (bc === 'G' && percent > 40) {
        blue1 = 0;
      }
      if (bc === 'Y') {
        green1 = (85 - 17/20 * percent) / 100;
      } else if (bc === 'R' && percent <= 60) {
        green1 = 0;
      } else if (bc === 'R' && percent > 60) {
        factor1 = (percent - 60) + 35;
        green1 = (67.5 - (Math.sqrt(5776 - Math.pow(factor1, 2)))) / 100;
      } else if (bc === 'B' && percent <= 60) {
        factor1 = (1*percent - 68.5);
        green1 = (6.5 + (Math.sqrt(7044.5 - Math.pow(factor1, 2)))) / 100;
      } else if ((bc === 'B' && percent > 60) || ( bc === 'G' && percent <= 60)) {
        green1 = 0.9;
      } else if (bc === 'G' && percent > 60) {
        factor1 = (percent - 60);
        green1 = (90 - (1/8 * factor1)) / 100;
      }
      factor1 = (red1 + green1 + blue1)/3;
      red2 = ((factor1 - red1) * (100 - chroma1) / 100) + red1;
      green2 = ((factor1 - green1) * (100 - chroma1) / 100) + green1;
      blue2 = ((factor1 - blue1) * (100 - chroma1) / 100) + blue1;
      if (red2 > green2 && red2 > blue2) {
        max = red2;
      } else if (green2 > red2 && green2 > blue2) {
        max = green2;
      } else if (blue2 > red2 && blue2 > green2) {
        max = blue2;
      } else {
        max = (red2 + green2 + blue2) / 3;
      }
      factor2 = 1 / max;
      r = parseInt((red2 * factor2 * (100 - black1) / 100) * 255, 10);
      g = parseInt((green2 * factor2 * (100 - black1) / 100) * 255, 10);
      b = parseInt((blue2 * factor2 * (100 - black1) / 100) * 255, 10);
      if (r > 255) {r = 255;}
      if (g > 255) {g = 255;}
      if (b > 255) {b = 255;}
      if (r < 0) {r = 0;}
      if (g < 0) {g = 0;}
      if (b < 0) {b = 0;}
    } else {
      grey = parseInt((1 - black / 100) * 255, 10);
      if (grey > 255) {grey = 255;}
      if (grey < 0) {grey = 0;}
      r = grey;
      g = grey;
      b = grey;
    }
    return {
      r : r,
      g : g,
      b : b
    };
  }
  function rgbToHsl(r, g, b) {
    var min, max, i, l, s, maxcolor, h, rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
      if (rgb[i + 1] <= min) {min = rgb[i + 1];}
      if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
    }
    if (maxcolor == 0) {
      h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
      h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
      h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {h = 0;}
    h = h * 60;
    if (h < 0) {h = h + 360; }
    l = (min + max) / 2;
    if (min == max) {
      s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
    }
    s = s;
    return {h : h, s : s, l : l};
  }
  function rgbToHwb(r, g, b) {
    var h, w, bl;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    chroma = max - min;
    if (chroma == 0) {
      h = 0;
    } else if (r == max) {
      h = (((g - b) / chroma) % 6) * 360;
    } else if (g == max) {
      h = ((((b - r) / chroma) + 2) % 6) * 360;
    } else {
      h = ((((r - g) / chroma) + 4) % 6) * 360;
    }
    w = min;
    bl = 1 - max;
    return {h : h, w : w, b : bl};
  }

  function rgbToCmyk(r, g, b) {
    var c, m, y, k;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    k = 1 - max;
    if (k == 1) {
      c = 0;
      m = 0;
      y = 0;
    } else {
      c = (1 - r - k) / (1 - k);
      m = (1 - g - k) / (1 - k);
      y = (1 - b - k) / (1 - k);
    }
    return {c : c, m : m, y : y, k : k};
  }
  function toHex(n) {
    var hex = n.toString(16);
    while (hex.length < 2) {hex = "0" + hex; }
    return hex;
  }
  function cl(x) {
    console.log(x);
  }
  function ColorTrim(x) {
    return x.replace(/^\s+|\s+$/g, '');
  }
  function isHex(x) {
    return ('0123456789ABCDEFabcdef'.indexOf(x) > -1);
  }



  function ColorPicker(color){
    var self = this;

    self.colors = {};
    self.attachValues(toColorObject(color));
  }

  ColorPicker.prototype = {
    toRgbString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "rgb(" + color_.red + ", " + color_.green + ", " + color_.blue + ")";
    },
    toRgbaString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "rgba(" + color_.red + ", " + color_.green + ", " + color_.blue + ", " + color_.opacity + ")";
    },
    toHwbString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hwb(" + color_.hue + ", " + Math.round(color_.whiteness * 100) + "%, " + Math.round(color_.blackness * 100) + "%)";
    },
    toHwbStringDecimal : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hwb(" + color_.hue + ", " + color_.whiteness + ", " + color_.blackness + ")";
    },
    toHwbaString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hwba(" + color_.hue + ", " + Math.round(color_.whiteness * 100) + "%, " + Math.round(color_.blackness * 100) + "%, " + color_.opacity + ")";
    },
    toHslString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hsl(" + color_.hue + ", " + Math.round(color_.sat * 100) + "%, " + Math.round(color_.lightness * 100) + "%)";
    },
    toHslStringDecimal : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hsl(" + color_.hue + ", " + color_.sat + ", " + color_.lightness + ")";
    },
    toHslaString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "hsla(" + color_.hue + ", " + Math.round(color_.sat * 100) + "%, " + Math.round(color_.lightness * 100) + "%, " + color_.opacity + ")";
    },
    toCmykString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "cmyk(" + Math.round(color_.cyan * 100) + "%, " + Math.round(color_.magenta * 100) + "%, " + Math.round(color_.yellow * 100) + "%, " + Math.round(color_.black * 100) + "%)";
    },
    toCmykStringDecimal : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return "cmyk(" + color_.cyan + ", " + color_.magenta + ", " + color_.yellow + ", " + color_.black + ")";
    },
    toNcolString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return color_.ncol + ", " + Math.round(color_.whiteness * 100) + "%, " + Math.round(color_.blackness * 100) + "%";
    },
    toNcolStringDecimal : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return color_.ncol + ", " + color_.whiteness + ", " + color_.blackness;
    },
    toNcolaString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return color_.ncol + ", " + Math.round(color_.whiteness * 100) + "%, " + Math.round(color_.blackness * 100) + "%, " + color_.opacity;
    },
    toName : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var r, g, b, colorhexs = getColorArr('hexs');
      for (i = 0; i < colorhexs.length; i++) {
        r = parseInt(colorhexs[i].substr(0,2), 16);
        g = parseInt(colorhexs[i].substr(2,2), 16);
        b = parseInt(colorhexs[i].substr(4,2), 16);
        if (color_.red == r && color_.green == g && color_.blue == b) {
          return getColorArr('names')[i];
        }
      }
      return "";
    },
    toHexString : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var r = toHex(color_.red);
      var g = toHex(color_.green);
      var b = toHex(color_.blue);
      return "#" +  r + g + b;
    },
    toRgb : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return {r : color_.red, g : color_.green, b : color_.blue, a : color_.opacity};
    },
    toHsl : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return {h : color_.hue, s : color_.sat, l : color_.lightness, a : color_.opacity};
    },
    toHwb : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return {h : color_.hue, w : color_.whiteness, b : color_.blackness, a : color_.opacity};
    },
    toCmyk : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return {c : color_.cyan, m : color_.magenta, y : color_.yellow, k : color_.black, a : color_.opacity};
    },
    toNcol : function(color){
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      return {ncol : color_.ncol, w : color_.whiteness, b : color_.blackness, a : color_.opacity};
    },
    isDark : function (n,color) {
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var m = (n || 128);
      return (((color_.red * 299 + color_.green * 587 + color_.blue * 114) / 1000) < m);
    },
    saturate : function (n,color) {
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var x, rgb, color;
      x = (n / 100 || 0.1);
      color_.sat += x;
      if (color_.sat > 1) {color_.sat = 1;}
      rgb = hslToRgb(color_.hue, color_.sat, color_.lightness);
      color = colorObject(rgb, color_.opacity, color_.hue, color_.sat);
      that.attachValues(color);
    },
    desaturate : function (n,color) {
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var x, rgb, color;
      x = (n / 100 || 0.1);
      color_.sat -= x;
      if (color_.sat < 0) {color_.sat = 0;}
      rgb = hslToRgb(color_.hue, color_.sat, color_.lightness);
      color = colorObject(rgb, color_.opacity, color_.hue, color_.sat);
      that.attachValues(color);
    },
    lighter : function (n,color) {
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var x, rgb, color;
      x = (n / 100 || 0.1);
      color_.lightness += x;
      if (color_.lightness > 1) {color_.lightness = 1;}
      rgb = hslToRgb(color_.hue, color_.sat, color_.lightness);
      color = colorObject(rgb, color_.opacity, color_.hue, color_.sat);
      that.attachValues(color);
    },
    darker : function (n,color) {
      var that = this,
          color_;

      if(color){
        color_ = toColorObject(color);
      } else {
        color_ = that.colors;
      }
      var x, rgb, color;
      x = (n / 100 || 0.1);
      color_.lightness -= x;
      if (color_.lightness < 0) {color_.lightness = 0;}
      rgb = hslToRgb(color_.hue, color_.sat, color_.lightness);
      color = colorObject(rgb, color_.opacity, color_.hue, color_.sat);
      that.attachValues(color);
    },
    attachValues : function(color){
      var that = this;

      that.colors.red = color.red;
      that.colors.green = color.green;
      that.colors.blue = color.blue;
      that.colors.hue = color.hue;
      that.colors.sat = color.sat;
      that.colors.lightness = color.lightness;
      that.colors.whiteness = color.whiteness;
      that.colors.blackness = color.blackness;
      that.colors.cyan = color.cyan;
      that.colors.magenta = color.magenta;
      that.colors.yellow = color.yellow;
      that.colors.black = color.black;
      that.colors.ncol = color.ncol;
      that.colors.opacity = color.opacity;
      that.colors.valid = color.valid;
    },
  }












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

    cp: ColorPicker,

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

      that.__proto__[name] = $object;
      if(isObject){
        that.__proto__[name].__proto__.manager_self = that;
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

      if(that.__proto__[name] != undefined && that.__proto__[name].extendedByManager == true){
        fun = that.__proto__[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      fun = args ? fun(args) : fun();


    },

    unExtend: function UnExtend(module){
      var that = this,
          name = module;

      if(that.__proto__[name] != undefined && that.__proto__[name].extendedByManager == true){
        delete that.__proto__[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      return {
        object: that.__proto__[name],
        name: name,
        unextended: that.__proto__[name] == undefined ? true : false,
      }
    },

    exportModule: function ExportModule(module){
      var that = this,
          name = module;

      if(that.__proto__[name] != undefined && that.__proto__[name].extendedByManager == true){
        window[module] = that.__proto__[name];
      } else {
        errors.undefined.module(name);
        return false;
      }

      return {
        object: that.__proto__[name],
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
        if(self.__proto__[item] != undefined){
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

      script.done(none => {
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
            script.done(none => {
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

    fn: FN,

    __proto__: function Manager(){
      var self = this;
          
      return self.__proto__.__proto__.options;
    },

  };

  function manager(){
    var self = this;

    for(var i in self.__proto__){
      self.__proto__[i].__proto__.manager_self = self;
    }

    self.info = plugin;

    self.parent = new function Parent(){
      return {
        opener: navigator,
        root: window,
        doc: document,
        docType: document.doctype,
        title: document.title,
        __proto__: function Parent(){
          return {
            opener: this.opener,
            root: this.root,
            doc: this.doc,
            title: this.title,
          }
        }
      }
    };

    self.__proto__.__proto__.options = {
      "$type": "[Object Manager]",
      "$proto": {
        "type": typeof self,
        "id": "Manager",
        "args": arguments,
      }
    };


  }

  manager.prototype = new function Manager(){
    return ManagerProto;
  }

  const Manager = new manager();

  if(window.angular != undefined){
    var ManagerNG = angular.module('Manager', []);

    ManagerNG.directive('Manager', ['$mngr', function ($mngr) {
      return Manager;
    }]);
  } else {}


  window.__proto__.Manager = Manager;

  return Manager;
}));

/*# sourceMappingURL=lsm.js.map */