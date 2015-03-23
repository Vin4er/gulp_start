$(function(){
	// высота секшн 
	window.setheight();
	//меню
	window.menu();
	// меню на главной
	window.menuIndex();
	// табы
	window.tabs();
		
	// селекты 
	window.selects();
	// Переключить открыть/закрыть
	window.toggler();
	
	// переключатель текст закрыть/открыть 
	window.textToggler()
	window.textHeighteer__calc();

	// слайдеры  
	window.sliders();

	window.colorizeSelect();


	// инпуты сиин
	window.seenIntputs();

	// инпуты сиин
	window.scrollClonroll();


	$('body').on('click', ".header-scrollable a", function(e){
		e.preventDefault();
		var hash = this.hash;
		var r = $(hash).offset().top-60
		$('html, body').animate({'scrollTop': r}, 300);
	}).on('click', ".back-top", function(){
		$(this).parent().find('.tips').click();
	})

});

var PRELOAD = {
	_path: '/assets/img/',
	_imgs: [
		'arrow-bottom-hover.png', 
		'arrow-bottom-gray.png', 
		'arrow-bottom.png', 
		'arrow-right.png', 
		'checkbox.png', 
		"search.png",
		"close.png",
		"home.png",
		"menu.png"
	]
};
window.scrollClonroll = function(){
	var f = function(){$("header")[$(window).scrollTop() == 0 ? 'addClass':'removeClass']('lighter')},
		g = function(){$(".backtokines")[$(window).scrollTop() > $('.accord-wrap').height() ? 'addClass':'removeClass']('lighter')};
	$(window).scroll(function(){
		f(); g();
	});
	$(".backtokines").click(function(){
		$('html, body').animate({'scrollTop': 0}, 300);
	});
};
window.menuIndex = function(){
	$('body').on('click', ".accrod-block-toggler", function(){
		$('.focused').removeClass("focused")
		$(this).addClass("focused")
	})
};

window.seenIntputs = function(){
	$("body").on("change blur", "input, select, textarea", function(){
		$(this).addClass("seen")
	}).on("mousedown", '[type=submit]', function(){
		$(this).closest('form').find( "input, select, textarea").addClass("seen")

	});
};

window.textToggler__calc = function(){
	var _self = this, _delta_h = 75 
	$(".textable-item-text.toggle-texted ").css({height: ''});
	$(".open-text").removeClass("open-text")
	$(".textable-item-text.toggle-texted ").each(function(){
		var b = $(this).height()>_delta_h+20;
		$(this).parent().find(".textable-item-toggler").addClass('open-text')[b?'show':'hide']();
		if (!b)  $(this).toggleClass("open-text");
		else $(this).height(_delta_h);
	});	
};
window.textToggler = function(){
	var _delta_h = 75 
	window.textToggler__calc();
	$("body").on("click",".textable-item-toggler", function(e){
		e.preventDefault();
		var _t =  $(this),  _p = $(this).parent().find(".textable-item-text.toggle-texted ");
		$(_t).add(_p).toggleClass("open-text");
		if( !$(_t).hasClass("open-text") )
			_p.css({height: 'auto'});
		else
			_p.css({height: _delta_h});
	});
};
window.textHeighteer__calc = function(){
	var _self = this, _delta_h = 75 
	$(".textable-item-text:not(.toggle-texted), .news-item p").each(function(){
		var b = $(this).height()>_delta_h+20;
		if (!b)  $(this).toggleClass("open-text");
	});	
};

window.colorizeSelect = function(){
	window.colorize = function(_this){
		var a = $(_this),  d = $(_this).data(), c = a.parents('.slider-container');
		console.log(c.find(".colorize-head-title-title"))
		c.find(".colorize-head-title-title").text(d.title)
		c.find(".colorize-head-title-descrpiption").text(d.description)

	}
	$(".colorize-head input:checked" ).each(function(){
		window.colorize(this)

	})
	$("body").on("change", ".colorize-head input", function(){
		window.colorize(this)
	});
};


window.sliders = function(){
	$('.slider-block').each(function(){
		var _this = $(this);
		var DOM__container = _this.find('.swiper-container')[0],
			DOM__pagination = _this.find('.swiper-pagination')[0],
			swiper = new Swiper(DOM__container, {
				pagination: DOM__pagination,
				paginationClickable: true,
				loop: true
			});
			_this.data({sw: swiper})
	});
	window.scroller_init = function(_this){
		var $_t = $(_this),
	 		_w = $_t.width(),
	 		_s = $_t.scrollLeft(),
	 		a = $_t.find(".scroller-slide"),
	 		w = a.length * a.width(),
	 		__scroller = {
	 			l: _s,
	 			r: w - _w - _s
	 		};
	 		$_t.closest('.slider-container')[__scroller.l == 0?"addClass":"removeClass"]('left-end')[__scroller.r == 0?"addClass":"removeClass"]('right-end')
	}
	$('.scroller-block').each(function(){
		window.scroller_init(this)	 
	}).scroll(function(){
		window.scroller_init(this)	 
	});
	
};
window.setheight = function(){
	var s = $('section'),
		b = $(".body"),
		m = $("#map"),
		mf = $(".map-filte"),
		time_resize,
		set = function(){
			s.css({'min-height': $(window).height() - $("footer").height()})
			if(m .length){
				m.css({height: s.height()-mf.height() + $("footer").height()+20, 'margin-bottom': '-100%'})
				$("footer").hide();
			}else{
				$("footer").show();
			}
		};
	set($(window).height()-$("footer").height());
	$(window).resize(function(){
		clearTimeout(time_resize);
		time_resize = setTimeout(function(){
			var w = window;
			set( $(window).height()-$("footer").height());
			w.textToggler__calc();
			w.textHeighteer__calc();
		}, 300);
	});

}


window.tabs = function(){
	$("body").on("click", ".tabs__head a[href*='#']", function(e){
		var hash = this.hash;
		e.preventDefault();
		$(".tabs-artile, .tabs__head a[href*='#']").removeClass("active");
		$(this).add(hash).addClass("active");
		$('.tabs').trigger("showed");
	});
	$('.t-prod.tabs').on("showed", function(){
		$('html, body').animate({'scrollTop': $(".accord-wrap").height()}, 300);
	});
};

window.menu = function(){
	$('body').on('click', '.header-menu-open', function(){
		$("nav, .body, .header-menu-open, .backdrop-nav").addClass("nav__opened")
		$("nav").addClass("animated bounceInLeft")
		$(".backdrop-nav").addClass("animated fadeIn")
	}).on("click", ".backdrop-nav.nav__opened", function(){
		$("nav, .body, .header-menu-open, .backdrop-nav").removeClass("nav__opened")
		$("nav").removeClass(" bounceInLeft")
	});
};

// Предзагрузка изображений
window.preLoadImg = function(){
 	for(var i = 0; i<PRELOAD._imgs.length; i++){
 		var path = PRELOAD._path+PRELOAD._imgs[i]
   		$("<img />").attr("src", path);
 	}
}();


window.toggler = function(){
	$("body").on("click", ".toggle-hider a.toggle-hider-header", function(e){
		e.preventDefault();
		$(this).toggleClass("active")
		$(".slider-block:visible").each(function(){
			$(this).data('sw').onResize();
		});
	});
	$("body").on("click", ".toggle-hider a.tips", function(e){
		e.preventDefault();
		$(this).toggleClass("active")
		$(".slider-block:visible").each(function(){
			$(this).data('sw').onResize();
		});
	});
};


window.selects = function(){
	var formHTML = function(_this){
		var $_this = $(_this);
		$_this.addClass("js-select");

		var multiple = $_this.attr("multiple") == 'multiple'?'multiple':'',
			wrap = $('<a ' + (multiple?'multiple=multiple':"") + '  href="#"><span>' + ((!multiple&&$_this.find(":selected").length>0)? $_this.find(":selected").text(): $_this.data("placeholder")) + (multiple?'(</span><ins>' + $_this.find(":selected").length + '</ins><span>)</span><b></b></a>' : "<b></b></a>") ),
			drop = $('<div class="js-select-drop"></div>'), 
			_ul = "<ol class=' "+(multiple?'mutipale-checkbox':'none-checkbox')+" '>";
		$_this.find("option").each(function(){
			var _s = $(this),
				_D = _s.data(),
				dataATTR = "";
			for(var jak in _D)
				dataATTR+=  jak!="text"?" data-"+jak+"="+_D[jak]+" ":" "
			if( _s.val() != "" )
				_ul += "<li><div class='js-select-checkbox checkbox'><label><input  name='' data-text='"+_s.text()+"' "+dataATTR+" value='"+_s.val()+"'  type='checkbox'  "+(_s.is(":selected")?"checked='checked'":"")+"><ins></ins><span>"+_s.text()+"</span></label></div></li>"
		});
		_ul += "</ol><a class='btn-blue' style='display:"+(multiple?'block':'none')+";' >Выбрать</a>"
		var m = $('<div  class="js-select"></div>').html(wrap).append(drop.html(_ul));
		$_this.after(m);
	}

	$(".select-wrap select:not(.js-select)").each(function(){
		formHTML(this);
	});
	$("body").on("change", ".js-select-drop input", function(){
		var _value = this.value;
		var p = $(this).closest(".select-wrap");
		// если обычный селект
		if(p.find("a").attr('multiple')==undefined){
			p.find(":checked").prop('checked', false);
			p.find("select option").attr('selected', false);
			var _c = $(this).prop('checked', true);
			p.find("select option[value='"+_value+"']").attr('selected', this.checked);
			p.find("a:not(.btn-blue) span").html(_c.data('text'));
			p.find(".btn-blue").click();
		}else{
			// если мультилеселк селект
			p.find("select option[value='"+_value+"']").attr('selected', this.checked);
			p.find("a ins").html($(this).closest(".js-select-drop").find(":checked").length);
		}
		p.trigger('chango');

	}).on("click", ".js-select-drop [class*=btn-]", function(e){
		e.preventDefault();
		$(".js-select-mask").click();
	}).on("click", ".js-select>a:not(.js-select-opened)", function(e){
		e.preventDefault();
		$(".js-select-mask").remove();
		$("body").append('<div class="js-select-mask"></div>')
		$(this).addClass("js-select-opened");
	}).on("click", ".js-select>a.js-select-opened", function(e){
		e.preventDefault();
		$(".js-select-mask").click();
	}).on("click", ".js-select-mask", function(){
		$(".js-select-mask").remove();
		$(".js-select>a").removeClass("js-select-opened");
	});

};