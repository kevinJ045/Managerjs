var year = new $.m.TM().time.fullYear;

$("#year").html(year);

$(window).on('scroll',function(){
	var top = $(this).scrollTop(),
		$height = $("#app").height();

	scrollIndicator();

	if(top > 100){
		if($height < screen.availHeight){
			return false;
		}
		$("#app h1").first().addClass('topped');

		$("#progress-indicator-parent").addClass('active');

		$(".scrollTop").addClass('show');

		$("#headerContainer").addClass('activeHeader');

		$('#app h2,#app h3,#app h4,#app h5,#app h6').each(function(index){
			var $ths = $(this),
				$thsTop = $ths.offset().top,
				$tops = $("#headerContainer").height() - $("#app h1").first().height();
			if(top >= $thsTop - $tops){
				$("#headerContainer .chipContainer").children('.chip').removeClass('active');
				$("#headerContainer .chipContainer").children('.chip').eq(index).addClass('active');
			}
		});

	} else {
		$("#app h1").first().removeClass('topped');	
		$('#headerContainer').removeClass('activeHeader');
		$("#progress-indicator-parent").removeClass('active');
		$(".scrollTop").removeClass('show');
		$("#headerContainer .chipContainer").children('.chip').removeClass('active');
	}
});

function scrollIndicator(){
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  	var scrolled = (winScroll / height) * 100;
  	$("#progress-indicator").css("width",scrolled + "%");
}

$(".navBarToggle").click(function(){
	$(".navBar").toggleClass('active');
	$(this).toggleClass('active');
});

$("#app").click(function(){
	if($(".navBar,.navBarToggle").hasClass('active')){
		$(".navBar,.navBarToggle").removeClass('active')
	} else {

	}
});

$(".scrollTop").click(function(){
	$("body,html").animate({
		scrollTop: 0
	},900);
});





