import Utils from "./utils.js";

Utils.init();

const navigateTo = url => {
	history.pushState(null,null,"?path="+url+"&");
	router();
};

if(Manager.__managerProto__.document.name == "index.html"){
	if(location.protocol.match("http")){
		location.assign(location.pathname.replace('index.html',''))
	} else {
		throw new Error('Manager needs http access, you can access it by localhost,'+
		"you can access localhost by npm,");
	}
} else {}

const lsm = new Manager.LSM('MngrJsDocs');

const pathToRegex = path => new RegExp("^"+ path.replace(/\\/g,"\\/")
	.replace(/:\w+/g,"(.+)") +"$");

const getParams = match => {
	const values = match.result.slice(1);
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

	return Object.fromEntries(keys.map((key,i) => {
		return [key,values[0]];
	}));
};

Manager.extends(navigateTo,'navigateTo');

const _ROUTES = [
	{
		path: "/",
		name: "Home",
		view: "./static/views/home.md",
		showdemo: false,
	},
	{
		path: "/LSM",
		name: "Localstorage",
		view: "./static/views/LSM.md"
	},
	{
		path: "/cookies",
		name: "Cookies",
		view: "./static/views/c.md"
	},
	{
		path: "/elements",
		name: "Element Controller",
		view: "./static/views/elements.md"
	},
	{
		path: "/sorting",
		name: "Sorting & Filtering",
		view: "./static/views/sort.md"
	},
	{
		path: "/objs",
		name: "Object Controllers",
		view: "./static/views/objs.md"
	},
	{
		path: "/ajax",
		name: "Ajax",
		view: "./static/views/ajax.md"
	},
	{
		path: "/datetime",
		name: "Time & Date",
		view: "./static/views/datetime.md"
	},
	{
		path: "/modules",
		name: "Modules",
		view: "./static/views/modules.md"
	},
	{
		path: "/modules_1_6",
		name: "Modules",
		view: "./static/views/modules-1.6.md",
		version: "1.1.6.4"
	},
	{
		path: "/templates",
		name: "Templates",
		view: "./static/views/templates.md",
		version: "1.1.6.4"
	},
	{
		path: "/extras",
		name: "Extras",
		view: "./static/views/extras.md",
		version: "1.1.6.4"
	},
	{
		path: "/events",
		name: "Events",
		view: "./static/views/events.md",
		version: "1.1.6.4"
	},
	{
		path: "/randoms",
		name: "Randomness",
		view: "./static/views/randoms.md"
	},
	{
		path: "/browser",
		name: "Browser Info",
		view: "./static/views/browser.md"
	},
	{
		path: "/iframes",
		name: "Iframe Controllers",
		view: "./static/views/iframes.md"
	},
	{
		path: "/component",
		name: "Components",
		view: "./static/views/component.md"
	},
	{
		path: "/includes",
		name: "Includes",
		view: "./static/views/includes.md"
	},
	{
		path: "/scripts",
		name: "Scripts",
		view: "./static/views/scripts.md"
	},
	{
		path: "/proto",
		name: "Proto",
		view: "./static/views/proto.md"
	},
	{
		path: "/editor",
		name: "Editor",
		view: "./static/views/edit.md",
		onInit: function(){
			Manager.Scripts.editor();
		},
		showdemo: false,
	},
	{
		path: "/plugins",
		name: "Plugins",
		view: "./static/views/plugins.md",
		showdemo: false
	},
	{
		path: "/noajax",
		name: "NoAjax",
		view: "./static/views/noajax.md",
		showdemo: false
	},
];

const Scripts = {
	"editor": function Editor(){
		if(lsm.get('EditorContent') == null){
			lsm.set('EditorContent',"Manager.something()");
		} else {}

		if(lsm.get('FirstTime') == null || lsm.get('FirstTime') == false){
			alert("This is Managerjs's editor,"+
				"\nManager is imported to it so you will not need to import it yourself")
			lsm.set('FirstTime',true);
		} else {}

		var edit = $('#editor');
		var editor = CodeMirror(edit[0],{
			mode: "text/javascript",
			lineNumbers: true,
			matchBrckets: true,
			autoCloseTags: true,
      		autoCloseBrackets: true,
      		autoCloseTags: true,
			value: lsm.get('EditorContent'),
			theme: window.CodeMirrorTheme,
		});
		editor.setSize("100%","100%");
		editor.on("change",function(){
			lsm.set('EditorContent',editor.getValue());
		});

		var _eval = function(){
			var $result = editor.getValue();
			Manager.eval($result);
		}

		$("#editor--run").off("click");
		$("#editor--run").on("click",_eval);
	},
}

Manager.extends(Scripts,"Scripts");

const router = async () => {
	const routes = _ROUTES;
	const matches = routes.map(route => {
		return {
			route: route,
			result: location.search ? location.search
				.split('path=')[1].split('&')[0].match(pathToRegex(route.path)) : '/',
		}
	});

	let match = matches.find(match => match.result != null);

	if(!match){
		match = {
			route: routes[0],
			result: true,
		}
	}

	var route = match.route,
			view = route.view;

	if(typeof view == "function"){
		var _view = new view(getParams(match));
		view = _view;
		console.log(view);
		view = _view.getHtml();
	} else {
		view = new Manager.http();
		view = view.get(route.view);
	}

	if(route.showdemo != null && route.showdemo == false){
		view = view;
	} else {
		view = view + `<br> There is more of this in the <a href="https://mngrjs.netlify.app/">Demo</a>`;
	}

	function Appendtitles(){
		$("#app h2,#app h3,#app h4,#app h5,#app h6").each(function(){
			var $ths = $(this),
				$text = $ths.text(),
				$id = $text.replace(/\ /gmis,'_').replace(/\?/,''),
				$html = `<a href="javascript:void(0)"
				data-href="[scrollwith='${$id}']" class="chip" title="Scroll to ${$text}">${$text}</a>`;

			$ths.attr('scrollwith',$id);

			$("#app #headerContainer .chipContainer").append($html)

		});
	}

	var show = function show(){
		$("#app").html(view);
		$("#app").fadeIn(500);
		$("#app h1").first().append(`
			<div class="progress-container" id="progress-indicator-parent">
			    <div class="progress-bar" id="progress-indicator"></div>
			</div>
		`)
		$("#app h1").first()[0].insertAdjacentHTML('afterEnd',`
			<div id="headerContainer">
				<span class="topics">Topics:</span> <span class="chipContainer"></span>
			</div>
		`);
		Appendtitles();
		Highlight();
		OnClick();
		var onInit = route.onInit ? route.onInit : function(path,view,name){};
		onInit(route.path,route.view,route.name);
	}

	$("#app").fadeOut(500);
	setTimeout(show, 500);



	var title = route.name;
	title = title == "Home" ? "Managerjs || Docs" : "Mngr || Docs/" + title;

	document.title = title;

	var filter = new Manager.filter('#SearchInput','#navBar');
	Manager.sortList('#navBar');

	$("#navBar a").removeClass("active");
	if($("#navBar a[data-href=\""+route.path+"\"]").length){
		$("#navBar a[data-href=\""+route.path+"\"]").addClass("active");
	} else {
		$("#navBar a[data-href=\"/\"]").addClass("active");
	}
}

$(document).ready(function(){
	router();
});

window.addEventListener('popstate',router);
//$("#app").click(router);

for (var i = 0; i < _ROUTES.length; i++) {
	var route = _ROUTES[i],name = route.name,
			link = route.path;
	if(route.isVisible != null && route.isVisible == false){
		continue;
	}

	if(route.isVisible != null && typeof route.isVisible == "string"){
		link = route.isVisible;
	}

	if(route.version){
		name += "<br><small>only available in V"+route.version+"</small>";
	}

	$("#navBar").append(`
		<li><a href="javascript:void(0)" data-href="${link}" class="nav__link">
			${name}
		</a></li>
	`);
}

const OnClick = function(){
	$(".nav__link").off('click');
	$(".nav__link").on('click',function(e){
		var $ths = $(this),
			$url = $ths.data('href');

		e.preventDefault();

		navigateTo($url);
	});

	$('.chip').off('click');
	$('.chip').on('click',function(e){
		var $ths = $(this),
			$url = $ths.data('href'),
			$el = $($url);

		e.preventDefault();

		$("body,html").animate({
			scrollTop: $el.offset().top - 200
		},900);
	});
}

OnClick();


