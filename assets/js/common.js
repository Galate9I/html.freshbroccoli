'use strict';

var merchandise = [
	"Абрикос",
	"Авокадо",
	"Айва",
	"Алкогольные напитки",
	"Алыча",
	"Ананас",
	"Анчоус",
	"Апельсин",
	"Арахис",
	"Арбуз",
	"Артишок",
	"Баклажан",
	"Бамий",
	"Банан",
	"Баранина",
	"Батат",
	"Безалкогольные напитки",
	"Бекон",
	"Белое вино",
	"Белый (боровик)",
	"Бобы",
	"Бренди",
	"Брокколи",
	"Брусника",
	"Брынза",
	"Брюква",
	"Бузина",
	"Вермишель",
	"Вермут",
	"Ветчина",
	"Вешенки",
	"Виноград",
	"Виноградные листья",
	"Виски",
	"Вишня",
	"Водка",
	"Водоросли",
	"Говядина",
	"Голавль",
	"Голубика",
	"Голубь",
	"Горбуша",
	"Горгонзол",
	"Горох",
	"Гранат",
	"Грейпфрут",
	"Грецкие орехи",
	"Гречка",
	"Грибы",
	"Груздь",
	"Груша",
	"Гусь",
	"Дайкон (редька)",
	"Дикорастущие травы",
	"Дичь",
	"Дорадо",
	"Дыня",
	"Ежевика",
	"Ёрш",
	"Жимолость",
	"Зайчатина",
	"Земляника",
	"Зубатка",
	"Изюм",
	"Икра",
	"Индейка",
	"Индюк",
	"Инжир",
	"Ирга",
	"Йогурт",
	"Кабачок",
	"Какао и шоколад",
	"Калина",
	"Кальмар",
	"Камамбер и бри",
	"Камбала",
	"Каперсы",
	"Капуста белокачанная",
	"Капуста брюссельская",
	"Капуста кольраби",
	"Капуста краснокочанная",
	"Капуста савойская",
	"Капуста цветная",
	"Карась",
	"Карп",
	"Картофель",
	"Каштан",
	"Квас",
	"Кедровые орехи",
	"Кета",
	"Кефаль",
	"Кефир",
	"Кешью",
	"Киви",
	"Кизил",
	"Кисло-молочные продукты",
	"Клубника",
	"Клюква",
	"Кокос",
	"Колбаса и сосиски",
	"Конина",
	"Коньяк",
	"Корюшка",
	"Кофе",
	"Красная смородина",
	"Красное вино",
	"Креветка и краб",
	"Кролик",
	"Крупы",
	"Крыжовник",
	"Кукуруза",
	"Кукурузная крупа",
	"Курага",
	"Курица",
	"Лазанья",
	"Лайм",
	"Лещ",
	"Ликер",
	"Лимон",
	"Лисички",
	"Лобстер (омар) и лангуст",
	"Лосось",
	"Лук репчатый",
	"Лук-порей",
	"Лук-шалот",
	"Луфарь",
	"Мадера",
	"Майонез",
	"Макароны и лапша",
	"Малина",
	"Манго",
	"Мангольд",
	"Мандарин",
	"Манка",
	"Манная крупа",
	"Маргарин",
	"Маскаропоне",
	"Масло сливочное",
	"Маслята",
	"Мед",
	"Мидия и гребешок",
	"Миндаль",
	"Минтай",
	"Можевельник",
	"Мозги",
	"Мойва",
	"Молоко",
	"Молочные продукты",
	"Морепродукты",
	"Морковь",
	"Мороженое",
	"Морошка",
	"Морс",
	"Морская капуста",
	"Морской окунь",
	"Моховик",
	"Моцарелла",
	"Мука и тесто",
	"Мучные продукты",
	"Мясо",
	"Налим",
	"Настой",
	"Нектарины",
	"Облепиха",
	"Овощи",
	"Овсянка",
	"Огурец",
	"Окунь",
	"Оленина",
	"Оливки",
	"Опята",
	"Орехи",
	"Осетр",
	"Острый перец",
	"Осьминог",
	"Палтус",
	"Пармезан",
	"Пастернак",
	"Патиссон",
	"Пекан",
	"Пекорин",
	"Перловая крупа",
	"Персик",
	"Печень",
	"Пиво",
	"Пикша",
	"Плавленый сыр",
	"Плотва",
	"Подберезовик",
	"Подосиновик",
	"Помидор и томатная паста",
	"Портвейн",
	"Почки",
	"Простокваша",
	"Птица",
	"Пшено и пшеница",
	"Рак",
	"Ревень",
	"Редис",
	"Редька",
	"Репа",
	"Рикотт",
	"Рис",
	"Рокфор",
	"Ром",
	"Рубец",
	"Рыба",
	"Рыжики",
	"Рябина",
	"Рябина обыкновенная",
	"Сазан",
	"Салака",
	"Салат",
	"Сало",
	"Сардина",
	"Свекла",
	"Свинина",
	"Сгущенное молоко",
	"Сельдерей",
	"Сельдь",
	"Семга",
	"Сердце",
	"Сиг",
	"Сироп",
	"Скумбрия",
	"Сладкий перец",
	"Слива",
	"Сливки",
	"Сметана",
	"Сморчки и строчки",
	"Сок апельсиновый",
	"Сок фруктовый",
	"Сом",
	"Спаржа",
	"Ставрида",
	"Стерлядь",
	"Субпродукты",
	"Судак",
	"Сыр",
	"Сыроежки",
	"Творог",
	"Телятина",
	"Терн",
	"Топинамбур",
	"Тофу",
	"Трепанг",
	"Треска",
	"Трюфель",
	"Тунец",
	"Турецкий горох (нут)",
	"Тыква",
	"Угорь",
	"Улитки",
	"Урюк",
	"Устрица",
	"Утка",
	"Фасоль",
	"Фейхоа",
	"Фенхель",
	"Фет",
	"Физалис",
	"Финик",
	"Фисташки",
	"Форель",
	"Фрукты",
	"Фундук",
	"Хек",
	"Хлеб",
	"Хрен",
	"Хурма",
	"Цуккини",
	"Чай",
	"Чедр",
	"Черемуха",
	"Черемша",
	"Черешня",
	"Черимойя",
	"Черная смородина",
	"Черника",
	"Черноплодная рябина",
	"Чернослив",
	"Чеснок",
	"Чечевица",
	"Шампанское",
	"Шампиньон",
	"Шиитак",
	"Шиповник",
	"Шпинат",
	"Щавель",
	"Щука",
	"Яблоко",
	"Ягоды",
	"Язык",
	"Язь",
	"Яйца",
	"Ячменная крупа"
];

jQuery(document).ready(function () {
	jQuery.widget("custom.autocompleteHighlight", jQuery.ui.autocomplete, {
		_renderItem: function (ul, item) {
			var regexp = new RegExp('(' + this.term + ')', 'gi'),
				classString = this.options.highlightClass ? ' class="' + this.options.highlightClass + '"' : '',
				label = item.label.replace(regexp, '<strong' + classString + '>$1</strong>');

			return jQuery('<li><a href="#">' + label + '</a></li>').appendTo(ul);
		}
	});
	jQuery('#search__input').autocompleteHighlight({
		minLength: 2,
		delay: 0,
		source: merchandise,
		appendTo: jQuery('#search'),
		highlightClass: 'search__highliter',
		position: undefined // Пытаемся убрать ненужное JS позиционирование
	});

	var scrollWidth = {
		init: function () {
			this.html = document.getElementsByTagName('html')[0];
			this.set();
			this.watcher();
		},
		set: function () {
			this.html.style.setProperty('--scroll-width', this.swidth() + 'px');
		},
		swidth: function () {
			return window.innerWidth - this.html.clientWidth;
		},
		watcher: function () {
			var sw = this;
			window.onresize = function () {
				sw.set();
			};
		},
		destroyWatcher: function () {
			window.removeEventListener('resize', this.watcher);
		}
	};

	var pointerEvents = {
		init: function () {
			this.body = document.body;
			this.timer = null;
			this.watcher();
		},
		watcher: function () {
			var pe = this;
			window.addEventListener('scroll', function () {
				clearTimeout(pe.timer);
				if (!pe.body.classList.contains('disable-hover')) {
					pe.body.classList.add('disable-hover');
				}

				pe.timer = setTimeout(function () {
					pe.body.classList.remove('disable-hover');
				}, 300);
			}, false);
		},
		destroyWatcher: function () {
			window.removeEventListener('scroll', this.watcher);
		}
	};
	
	/*** tooltip ***/

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});


/*****************************************/
/**** left_sidebar menu ****/

	var menuSidebar = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},
		watcher: function () {
			var $title = $('.dropblock .dropdown');
			var $block = $title.next($('.dropwrap'));

			$('.dropdown.toggle').on('click', function() {
				var $h = $(this).next().children().innerHeight();
				console.log($h + '---387');
				if ($(this).hasClass('open')) {
					$(this).next().height($h + 'px');
					$(this).removeClass('open');
					$(this).next().height(0);
					$title.removeClass('open');
				} else {
					$(this).addClass('open');
					$(this).next().height($h + 'px');
				}
			});



			$title.on('click', function() {
				$block.height(0);

				if ($(this).hasClass('open')) {
					console.log('yes');
					$title.removeClass('open');
				} else {
					console.log('no');
					$title.removeClass('open');
					$(this).addClass('open');
					var $height = $(this).next().children().innerHeight();

					if ($height > 32) {
						$(this).next().height($height + 'px');
					} else {
						$title.removeClass('open');
					}
				}
			});
		}
	};


/*****************************************/
/**** DROPDOWN ****/

	var dropdown = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},
		watcher: function () {
			/*$('select').parents('label').append('<div class="new-select"></div>');
			$('.new-select').on('click', function() {
				var $label = $(this).parents('label');
				if ($label.hasClass('open')) {
					console.log('click come');
					$label.removeClass('open');

				} else {
					console.log('click open');
					$label.addClass('open');
					$(this).prev('select').attr('selected', 'selected');
					$(this).prev('select').trigger("click");
				};
			});*/
		}
	};


/*****************************************/
/**** BoxShow ****/


	var boxShow = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},
		watcher: function () {
			$('.boxShow').on('click', function() {
				var $id = $(this).attr('id'),
					$box = $('.boxShow-content[aria-boxShow="'+ $id +'"]');
				if ($box.hasClass('open')) {
					$box.removeClass('open')
				} else {
					$('.boxShow-content').removeClass('open')
					$box.toggleClass('open')
				}
			});
		}
	};

/*****************************************/
/**** SELECT ****/

	var selectShow = {
		init: function () {
			this.body = document.body;
			this.selectNew();
			this.selectOpen();
			this.selectOption();
		},
		selectNew: function () {

			$('select').each(function() {
				var $this = $(this),
					$option = $this.children('option'),
					$optionLength = $option.length;

				$this.wrap('<div class="select-wrap"></div>');
				$this.after('<div class="new-select target" rel="0"></div>');

				var $newSelect = $this.next('div.new-select');
				$newSelect.text($option.eq(0).text());
				var $list = $('<ul />', {'class': 'new-options'}).insertAfter($newSelect);

				for (var i = 0; i < $optionLength; i++){
					$('<li />', {
						text: $option.eq(i).text(),
						rel: $option.eq(i).attr('data-id')
					}).appendTo($list);
				}
			});

		},
		selectOpen: function () {

			$('.new-select').on('mouseup', function() {
				var $this = $(this);
				if ($this.hasClass('open')) {
					$this.removeClass('open');
				} else {
					$('.new-select').removeClass('open');
					$this.addClass('open');
				}
			});
		},

		selectOption: function () {

			$('.new-options > li').on('click', function() {
				var $this = $(this),
					$title = $this.text(),
					$rel = ($this.attr('rel') !== undefined) ? $this.attr('rel') : '0';
				console.log($title + ' + ' + $rel);
				$this.parents('.new-options').prev('.new-select').text(''+ $title +'').attr('rel', ''+ $rel +'');
			});
		}

	};


/*****************************************/
/**** TARGET FOR BLOCK ****/

	var targetNot = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			$(document).mouseup(function (e) {
				var target = $('.target');
				if (!target.is(e.target) && target.has(e.target).length === 0) {
					$('.target').removeClass('open');
				}
			});
		}

	};

/*****************************************/
/**** TAG FILTER ****/

	var tagFilter = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		itemFilter: function () {
			$('.catalog__head-tags li.active').each(function() {
				var aa = $(this).find('a').attr('data-tag');
				$('.catalog__items-list').find('li[data-tags="'+ aa +'"]').show();
			});
		},

		watcher: function () {
			$('.catalog__head-tags li').on('click', function() {
				$('.catalog__items-list').find('li').show();
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$('.catalog__items-list').find('li').hide();

					if ($('.catalog__head-tags li').hasClass('active')) {
						tagFilter.itemFilter();
					} else {
						$('.catalog__items-list').find('li').show();
					}
				} else {
					$(this).addClass('active');
					$('.catalog__items-list').find('li').hide();
					tagFilter.itemFilter();
				}
			});
		}

	};

/*****************************************/
/**** Item gallery ****/

	var itemGallery = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			$('.item__cart-thumbnail').on('click', function() {
				var a = $(this).attr('src');
				$('.item__cart-image').attr('src', ''+ a +'');
			});
		}

	};

/*****************************************/
/**** Img Square, добавить родителю img .img-square ****/

	var imgSquare = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			$('.img-square img').each(function() {
				var $width = $(this).width();
				$(this).height($width);
			});
		}

	};

/*****************************************/
/**** ****/

	function windowSize() {
		if (jQuery(window).width() <= '720') {
			jQuery('.catalog-list').addClass('collapse');
			return;
		} else {
			jQuery('.catalog-list').removeClass('collapse');
		}
	}
		jQuery(document).ready(windowSize);


/*****************************************/
/**** Resize Window, вставлять скрипты при изменении окна ****/

	var resizeWindow = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			$(window).resize(function(){
				imgSquare.watcher();
				windowSize();
			});
		}

	};


/*****************************************/
/**** ползунок ****/

	var range = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			console.log('4454544');
			$( "#slider-range" ).slider({
				range: true,
				min: 18,
				max: 5000,
				values: [ 18, 5000 ],
				slide: function( event, ui ) {
					$( "#price" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
					$( ".filter__range-min" ).val( ui.values[ 0 ]);
					$( ".filter__range-max" ).val( ui.values[ 1 ]);
				}
			});
			$( "#price" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
				" - $" + $( "#slider-range" ).slider( "values", 1 ) );
		}

	};

// выпадающее меню

	var menuDrop = {
		init: function () {
			this.body = document.body;
			this.watcher();
		},

		watcher: function () {
			console.log('y');
			if (jQuery(window).width() <= '600') {
				console.log('<600');
				$('.menu__item.default').on('click', function(){
					if ($(this).hasClass('active')) {
						$(this).removeClass("active");
						$('.menu__item').show();
					} else {
						console.log('1');
						console.log('fgdfgdfg');
						$(this).addClass("active");
						$('.menu__group-container > .menu__item').hide();
						$('.menu__item.active').show();
					}
				});
			}

			else {
				console.log('>600');
				$('.menu__item').hover(
					function(){
						$(this).addClass("active");
						var $h = $('navigation__item-content').innerWidth();
						console.log(+ $h + ' 111');
					},
					function(){
						$(this).removeClass("active");
					}
				);
			}
		}

	};

// фильтр тегов в каталоге

	var checkedBtn = $('.tags__sort .btn.checked');

	if (checkedBtn) {
		checkedBtn.children(".arrow").html('&uarr;');
	}

	$('.tags__sort .btn').bind('click', function(){
		$( this ).toggleClass('checked').children(".arrow").html('&uarr;');

		if (! $(this).hasClass('checked')) {
			$(this).children(".arrow").html('&darr;');
		}
	});

	// стрелка на кнопке в аккордионе

	$('.accordion__header').bind('click', function() {
		$(this).find('.icon-down-arrow').toggleClass('turn');
	});

	scrollWidth.init();
	pointerEvents.init();
	menuSidebar.init();
	dropdown.init();
	selectShow.init();
	targetNot.init();
	boxShow.init();
	tagFilter.init();
	itemGallery.init();
	imgSquare.init();
	resizeWindow.init();
	range.init();
	menuDrop.init();

/*****************************************/
/**** Slick slider ****/

	$('.specials__list').slick({
		prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
		nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
		swipe: false,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		centerMode: true,
		variableWidth: true,
		slidesToShow: 7,
		slidesToScroll: 3,
		responsive: [
			{
			  breakpoint: 992,
			  settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 4,
				swipe: true,
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 2,
				slidesToScroll: 1,
				swipe: true,
			  }
			}]

	});

	// $('.advantages__list').slick({
	// 	prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
	// 	nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
	// 	centralMode: true,
	// 	slidesToShow: 8,
	// 	slidesToScroll: 1,
	// 	responsive: [{
	// 		breakpoint: 1140,
	// 		settings: {
	// 			prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
	// 			nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
	// 			infinite: true,
	// 			swipe: false,
	// 			autoplay: true,
	// 			autoplaySpeed: 5000,
	// 			arrows: true,
	// 			centerMode: true,
	// 			slidesToShow: 5,
	// 			slidesToScroll: 3
	// 		 }
	// 	},
	// 	{
	// 		breakpoint: 994,
	// 		settings: {
	// 			slidesToShow: 4,
	// 			slidesToScroll: 1,
	// 			swipe: true
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 760,
	// 		settings: {
	// 			slidesToShow: 3,
	// 			slidesToScroll: 1
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 480,
	// 		settings: {
	// 			slidesToShow: 2,
	// 			slidesToScroll: 1
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 400,
	// 		settings: {
	// 			slidesToShow: 1,
	// 			slidesToScroll: 1
	// 		}
	// 	}]
	// });

	$('.slider__items .catalog__items-list').slick({
		prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
		nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
		slidesToShow: 7,
		arrows: true,
		appendArrows: $('.slider__title'),
		slidesToScroll: 3,
		//autoplay: true,
		autoplaySpeed: 5000,
		responsive: [{
			breakpoint: 1560,
			settings: {
				// prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
				// nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
				//autoplay: true,
				autoplaySpeed: 5000,
				// arrows: true,
				slidesToShow: 6,
				slidesToScroll: 3
			 }
		},
		{
			breakpoint: 1120,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 2,
				swipe: true
			}
		},
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				swipe: true
			}
		},
		{
			breakpoint: 850,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 690,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 450,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		}]
	});

	$('.news').slick({
		prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
		nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
		slidesToShow: 7,
		variableWidth: true,
		centerMode: true,
		arrows: true,
		appendArrows: $('.home-title--news'),
		slidesToScroll: 3,
		responsive: [{
			breakpoint: 1560,
			settings: {
				// centerMode: true,
				slidesToShow: 6,
				slidesToScroll: 3
			 }
		},
		{
			breakpoint: 1120,
			settings: {
				centerMode: true,
				slidesToShow: 5,
				slidesToScroll: 2,
				swipe: true
			}
		},
		{
			breakpoint: 960,
			settings: {
				centerMode: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				swipe: true
			}
		},
		{
			breakpoint: 850,
			settings: {
				centerMode: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				swipe: true
			}
		},
		{
			breakpoint: 690,
			settings: {
				centerMode: true,
				slidesToShow: 2,
				slidesToScroll: 1,
				swipe: true
			}
		},
		{
			breakpoint: 450,
			settings: {
				centerMode: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				swipe: true
			}
		}]
	});

	$('.review__block-list').slick({
		prevArrow: '<button type="button" class="slider__items-arrow arrow-left"></button>',
		nextArrow: '<button type="button" class="slider__items-arrow arrow-right"></button>',
		slidesToShow: 4,
		// variableWidth: false,
		arrows: true,
		slidesToScroll: 1,
		//autoplay: true,
		responsive: [
			{
				breakpoint: 1330,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					swipe: true
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					swipe: true
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 540,
				settings: {
					centerMode: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});



});

