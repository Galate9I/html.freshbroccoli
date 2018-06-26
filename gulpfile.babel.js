'use strict';

import gulp                from 'gulp';
import path                from 'path';                      // Создает пути файла простым и организованным способом                   | Creates file's paths in a simple and organized way
import pkg                 from './package.json';            // Связь с package.json                                                   | Package.json connection
import gulpLoadPlugins     from 'gulp-load-plugins';         // Автоматический загрузчик любых gulp плагинов из списка в package.json  | Automatically load any gulp plugins in your package.json
import browser             from 'browser-sync';              // Синхронизация и живая перезагрузка браузеров                           | Live reload & browser syncing
import del                 from 'del';                       // Удаление файлов и папок                                                | Delete files and folders
import fs                  from 'file-system';               // Упрощение API при работе с файлами. Не требует выяснения сущ-ия файлов | This module make file opertaion apis simple, you don't need to care the dir exits.
import makeSassLintConfig  from 'make-sass-lint-config';     // Конвертер .scss-lint.yml => .sass-lint.yml                             | Converter .scss-lint.yml => .sass-lint.yml
import jsyaml              from 'js-yaml';                   // Загрузчик YAML файлов                                                  | YAML loader
import magicImporter       from 'node-sass-magic-importer';  // Пользовательский sass импортер                                         | Custom node-sass importer

/* jshint ignore:start */
import Color               from 'color';                     // Преобразование цвета и манипуляции с поддержкой CSS строки             | Color conversion and manipulation with CSS string support
/* jshint ignore:end */

import spriteSmith         from 'gulp.spritesmith';
import nodeResolve         from 'rollup-plugin-node-resolve-auto';
import rollupPluginReplace from 'rollup-plugin-replace';
import rollupPluginAlias   from 'rollup-plugin-alias';

// gulp.signature = function (date) {
// 	var banner =
// 	'/*!BANNERSTART                                                                 \n'+
// 	'|==============================================================================\n'+
// 	'| Информация о дистрибутиве : <%= pkg.name %>                                  \n'+
// 	'|==============================================================================\n'+
// 	'|                                                                              \n'+
// 	'| Версия:         <%= pkg.version %>                                           \n'+
// 	'| Лицензия:       <%= pkg.license %>                                           \n'+
// 	'| Описание:       <%= pkg.description %>                                       \n'+
// 	'| Компания:       <%= pkg.company.legalName %>                                 \n'+
// 	'| Локация:        <%= pkg.company.location %>                                  \n'+
// 	'| Email:          <%= pkg.company.email %>                                     \n'+
// 	'| Телефон:        <%= pkg.company.phone %>                                     \n'+
// 	'| Файл изменен:   ' + date + '                                                 \n'+
// 	'|                                                                              \n'+
// 	'|------------------------------------------------------------------------------\n'+
// 	'|                                                                              \n'+
// 	'| Автор:    <%= pkg.author.name %>                                             \n'+
// 	'| Локация:  <%= pkg.author.location %>                                         \n'+
// 	'| Email:    <%= pkg.author.email %>                                            \n'+
// 	'| Skype:    <%= pkg.author.skype %>                                            \n'+
// 	'|                                                                              \n'+
// 	'|==============================================================================\n'+
// 	'BANNEREND*/\n\n';
// 	return banner;
// };

/*==============================================================
=            Основые переменные | based on variables           =
==============================================================*/

	var FAVICON_DATA_FILE = 'faviconData.json',                 // Список разположений всех генерируемых файлов - фавиконов | List of the locations of all the generated files - favicon
		configs = {},                                           // Основные настройки                                       | Basic settings
		plugins = gulpLoadPlugins({                             // Вспомогательная переменная для gulpLoadPlugins           | Auxiliary variable for gulpLoadPlugins
		rename: {                                               // Переименование переменных к camel case виду              | Plugins rename to camel case style
			'gulp-uglify-es':           'uglify',
			'gulp-sass-glob':           'sassGlob',
			'gulp-sass-lint':           'sassLint',
			'gulp-htmlhint':            'validateHTML',
			'gulp-util':                'gutil',
			'gulp-real-favicon':        'realFavicon',
			'gulp-jade-find-affected':  'affected',
			'gulp-recolor-svg':         'recolorSvg',
			'gulp-text-simple':         'textSimple',
			'gulp-assign-to-pug':       'pugAssign',
			'gulp-html-beautify':       'htmlBeautify',
			'gulp.spritesmith':         'spriteSmith',
			'gulp-iconfont-css':        'iconfontCss',
			'sass-multi-inheritance':   'sassMultiInheritance'
		},
		pattern: [
			'gulp-*',
			'gulp.'
		]
	}),
	faviconPaths = [],
	faviconTRW = plugins.textSimple(replaceRootTags); // Favicon template replacer wrapper

	var svgSprite = require('gulp-svg-sprites'),
		svgmin = require('gulp-svgmin'),
		cheerio = require('gulp-cheerio'),
		replace = require('gulp-replace');

/*============================================================*/

/*----------  Списки рабочих режимов | Lists of operating modes ----------*/

var devList  = [cleanBase, /*'favicon',*/ templates, htmlBeautify,/*htmlLint,*/ /*'iconFontGroup',*/ 'deploy', 'sassGroup', 'jsGroup', imageMin, 'copy', server, watch, faviconUpdate],
	prodList = [cleanBase, /*'favicon',*/templates, htmlBeautify, htmlLint, /*'iconFontGroup',*/ 'sassGroup', cssMin, 'jsGroup', imageMin, 'copy', banner, server, watch],
	fastList = [cleanBase, templates, /*htmlBeautify, */htmlLint, /*'iconFontGroup',*/ 'sassGroup', 'jsGroup', imageMin, 'copy', server, watch];

/*------------------------------------------------------------------------*/

/*----------  Рабочий режим:  ----------*/

var mode = 'dev';   // 'prod' (или | or) 'dev'

/*--------------------------------------*/

/*===========================================
=            Настройки | Configs            =
===========================================*/

configs.prod      = 'prod';
configs.dev       = 'dev';
configs.assets    = 'assets/';
configs.dist      = 'dist/';
configs.prodColor = '#72982d';
configs.devColor  = invertColor(configs.prodColor);
configs.realURL   = 'https://freshbroccoli.ru';
configs.localURL  = 'http://freshbroccoli.local';
configs.server    = {
	// proxy: configs.localURL,
	open: false,
	reloadOnRestart: true,
	notify: true,
	localOnly: false,
	https: false,
	startPath: '/dist',
	browser: [
		'google chrome',
		// 'firefox',
		// 'safari',
		// 'opera',
		// 'internet explorer'
	],
	server: {
		baseDir: './',
		directory: true
	}
};

configs.favicon = {
	assets:     configs.assets  + 'images/favicon/',
	dist:       configs.dist    + 'images/favicon/',
	name:       'favicon',
	prefix:     'master-',
	ext:        'svg',
	separator:  '--',
	prod: {
		color: configs.prodColor
	},
	dev: {
		color: configs.devColor
	},
	settings: {
		scalingAlgorithm: 'Mitchell',
		errorOnImageTooSmall: false
	}
};

configs.favicon.design = {
	ios: {
		pictureAspect: 'noChange',
		assets: {
			ios6AndPriorIcons: true,
			ios7AndLaterIcons: true,
			precomposedIcons: true,
			declareOnlyDefaultIcon: true
		}
	},
	desktopBrowser: {},
	windows: {
		pictureAspect: 'noChange',
		backgroundColor: '#ffffff',
		onConflict: 'override',
		assets: {
			windows80Ie10Tile: false,
			windows10Ie11EdgeTiles: {
				small: false,
				medium: true,
				big: false,
				rectangle: false
			}
		}
	},
	androidChrome: {
		pictureAspect: 'noChange',
		themeColor: '#ffffff',
		manifest: {
			name: 'Freshbroccoli',
			startUrl: configs.realURL,
			display: 'standalone',
			orientation: 'notSet',
			onConflict: 'override',
			declared: true
		},
		assets: {
			legacyIcon: false,
			lowResolutionIcons: false
		}
	},
	safariPinnedTab: {
		pictureAspect: 'silhouette',
		themeColor: configs.favicon['' + mode + ''].color
	}
};

configs.sass = {
	assets: configs.assets  + 'sass/',
	dist:   configs.dist    + 'css/',
	ext:    's+(a|c)ss',
	files: [
		'common',
		'header',
		'main-header',
		'dwarf-menu',
		'navigation',
		'search',
		'autocomplete',
		'menu',
		'footer',
		'media-queries'
	],
	exceptions: [/*'sprite.*', 'configs/**', 'utilities/**'*/],
	options: {
		indentType:     'tab',
		indentWidth:    4,
		outputStyle:    'expanded',
		importer:       magicImporter()
	},
	mapPath: '/',
	autoprefixer: {
		browsers: [
			'> 11%',
			'Chrome >= 10',
			'Explorer >= 6',
			'Opera >= 9',
			'Firefox >= 3.5',
			'Safari >= 4',
			'iOS >= 6'
		],
		remove: true
	},
	debug: {
		title: 'Sass задействовал:'
	},
	cached: {
		name: 'sassCache',
		options: {
			optimizeMemory: true
		}
	}
};

configs.sassLint = {
	assets:     configs.sass.assets,
	ext:        configs.sass.ext,
	exceptions: [
		'sprite.*',
		'configs/**',
		'utilities/**',
		'functions/**'
	],
	SCSSConfigFile: '.scss-lint.yml',
	SASSConfigFile: '.sass-lint.yml',
	debug: {
		title: 'Sass lint задействовал:'
	},
	cached: {
		name: 'sassLintCache',
		options: configs.sass.cached.options
	}
};

configs.cssMin = {
	assets: configs.sass.dist,
	dist: configs.sass.dist,
	ext: 'css',
	exceptions: ['!*.min.css'],
	rename: {
		suffix: '.min'
	},
	map: {
		init: {
			loadMaps: true
		},
		write: {
			path: configs.sass.mapPath,
			options: {}
		}
	},
	debug: {
		title: 'cssMin задействовал:'
	},
	pathReplacer: {
		regexp: /(?:\/{1})\s*$/gmi,
		replaceFor: ''
	}
};

configs.js = {
	assets: configs.assets  + 'js/',
	dist: configs.dist      + 'js/',
	ext: 'js',
	cached: {
		name: 'jsCache',
		options: {
			optimizeMemory: true
		}
	},
	exceptions: []
};

configs.js.copy = {
	cached: {
		name: 'jsCopy',
		options: {
			optimizeMemory: true
		}
	}
};

configs.js.jsbeautify = {
	assets:     configs.js.assets,
	dist:       configs.js.dist,
	ext:        configs.js.ext,
	exceptions: [],
	options: {
		indentSize: 4,
		indentChar: '\t',
		endWithNewline: true
	},
	debug: {
		title: 'jsBeautify задействовал:'
	}
};

configs.js.fixmyjs = {
	assets:     configs.js.dist,
	dist:       configs.js.dist,
	ext:        configs.js.ext,
	exceptions: [],
	options: {
		config: '.jshintrc'
	},
	debug: {
		title: 'fixmyJS задействовал:'
	}
};

configs.js.semi = {
	assets:     configs.js.dist,
	dist:       configs.js.dist,
	ext:        configs.js.ext,
	exceptions: [],
	options: {},
	debug: {
		title: 'SemiJS задействовал:'
	}
};

configs.js.uglify = {
	assets:       configs.js.dist,
	dist:         configs.js.dist,
	ext:          configs.js.ext,
	exceptions:   [/*'!*.min.js'*/],
	renameSuffix: '.min',
	options: {
		output: {
			comments: /jshint\s+esversion:\s+\d+'use\sstrict';/ // ~~~~~> /*jshint esversion: 6 */
		}
	},
	debug: {
		title: 'uglify JS задействовал:'
	}
};

configs.js.jshint = {
	assets: configs.js.assets,
	dist: configs.js.dist,
	ext: configs.js.ext,
	exceptions:     [
		'!*.min.js',
		'!transition.js',
		'!dropdown.js',
		'!tooltip.js',
		'!jquery-ui.js'
	]
};

configs.js.rollup = {
	cached: {
		name: 'jsRollup',
		options: {
			optimizeMemory: true
		}
	},
	debug: {
		title: 'rollupJS задействовал:'
	}
};

configs.images = {
	assets: configs.assets  + 'images/',
	dist:   configs.dist    + 'images/',
	ext:    [
		'png',
		'jpg',
		'svg,'
	],
	cached: {
		name: 'images',
		options: {
			optimizeMemory: true
		}
	}
};

configs.images.minify = {
	assets: configs.images.assets,
	dist:   configs.images.dist,
	ext:    '**',
	cached: {
		name: 'imagesMinify',
		options: {
			optimizeMemory: true
		}
	}
};

configs.fonts = {
	assets: configs.assets  + 'fonts/',
	dist:   configs.dist    + 'fonts/',
	ext:    '**'
};

configs.fonts.custom = {
	assets:     configs.images.assets + 'custom-font/',
	dist:       configs.fonts.assets + 'custom-font/',
	ext:        'svg',
	name:       'custom-font',
	formats:    [
		'ttf',
		'eot',
		'woff',
		'woff2',
		'svg'
	]
};

configs.fonts.iconFontCss = {
	options: {
		fontName: 'custom-font',
		path: 'assets/sass/utilities/_font-icons.scss',
		targetPath: '../../sass/utilities/_custom-font.scss',
		fontPath: '../fonts/custom-font/',
		cssClass: 'custom-font'
	}
};

configs.fonts.iconFont = {
	options: {
		fontName: configs.fonts.custom.name,    // Имя шрифта (Обязательный) | Font name (Required)
		prependUnicode: false,                  // Recommended option 
		formats: configs.fonts.custom.formats,  // default, 'woff2' and 'svg' are available 
		// timestamp: gulp.signature(Date()),      // recommended to get consistent builds when watching files 
		appendCodepoints: true,
		appendUnicode: false,
		normalize: true,
		fontHeight: 1000,
		centerHorizontally: true
	}
};

configs.sprite = {
	assets: configs.images.assets + 'sprite/',
	ext:    configs.images.ext
};

configs.images.copy = {};
configs.images.copy.ext = '**';
configs.images.copy.exceptions = [
	'!' + configs.sprite.assets.replace(/(?:\/{1})\s*$/gmi, ''),
	'!' + configs.sprite.assets + configs.images.copy.ext,
	'!' + configs.fonts.custom.assets.replace(/(?:\/{1})\s*$/gmi, ''),
	'!' + configs.fonts.custom.assets + configs.images.copy.ext
];

configs.banner = {
	js: {
		assets: configs.js.dist,
		dist: configs.js.dist,
		ext: configs.js.ext,
		exceptions: [
			'!transition.js',
			'!dropdown.js',
			'!tooltip.js',
			'!jquery-ui.js'
		],
		debug: {
			title: 'Bnr.js задействовал:'
		}
	},
	css: {
		assets: configs.sass.dist,
		dist: configs.sass.dist,
		ext: 'css',
		exceptions: [
			'!sprite',
			'!jquery-ui*'
		],
		debug: {
			title: 'Bnr.css задействовал:'
		}
	},
	cached: {
		name: 'bannerCache',
		options: configs.sass.cached.options
	},
	debug: {
		title: 'Banner задействовал:'
	},
	cleaner: {
		charset: 'utf8',
		debug: {
			title: 'Bnr.Cleaner задействовал:'
		}
	}
};

configs.templates = {
	assets: configs.assets + 'templates/',
	ext:    'pug',
	dist:   'dist/',
	options: {
		pretty: '\t',
		locals:     {
			name:           pkg.name,
			author:         pkg.author,
			description:    pkg.description,
			keywords:       pkg.keywords,
			revisit:        pkg.revisit,
			companyPhone:   pkg.company.phone,

			mode:           mode,

			prod:           configs.prod,
			dev:            configs.dev,
			assets:         configs.assets,
			dist:           configs.dist,
			cssDist:        configs.sass.dist,
			jsDist:         configs.js.dist,
			imgDist:        configs.images.dist
		}
	}
};

configs.html = {
	assets: configs.templates.dist,
	dist: configs.templates.dist,
	ext: 'html',
	beautify: {
		debug: {
			title: 'HTML Beautify задействовал:'
		},
		exceptions: [
			'favicon.html'
		],
		options: {
			indent_size: 4,
			indent_char: '\t',
			indent_with_tabs: true,
			// eol: '\n',
			end_with_newline: true,
			// indent_level: 0,
			// preserve_newlines: true,
			max_preserve_newlines: 1,
			// space_in_paren: false,
			// space_in_empty_paren: false,
			// jslint_happy: false,
			// space_after_anon_function: false,
			brace_style: 'expand',
			// space_in_paren: false,
			// space_in_empty_paren: false,
			// unindent_chained_methods: false,
			// break_chained_methods: false,
			// keep_array_indentation: false,
			// unescape_strings: false,
			// wrap_line_length: 0,
			// e4x: false,
			// comma_first: false,
			// operator_position: 'before-newline'
		}
	},
	lint: {
		exceptions: [
			'!favicon.html'
		],
		debug: {
			title: 'HTML Lint задействовал:'
		},
		options: {
			rules: { // https://github.com/htmllint/htmllint/wiki/Options
				'class-style': 'bem',
				'id-class-style': 'bem',
				'line-end-style': false,
				'attr-name-style': false,
				'attr-req-value': false,
				'space-tab-mixed-disabled': false
			}
		}
	},
	cached: {
		name: 'htmlCache',
		options: {
			optimizeMemory: true
		}
	}
};

configs.favicon.injectFile = {
	assets: configs.templates.assets,
	name:   configs.favicon.name,
	ext:    configs.templates.ext,
	dist:   configs.templates.assets
};

configs.sprite = {
	assets: configs.images.assets + 'sprite/',
	dist: configs.images.dist + 'sprite/',
	ext: [
		'png',
		'jpg'
	],
	debug: {
		title: 'Sprite задействовал:'
	}
};

configs.sprite.options = {
	imgName: 'sprite.png',
	cssName: 'sprite.sass',
	cssVarMap: function (item) {
		if (item.name.indexOf('--hover') !== -1) {
			item.name = 'sprite-smith:hover .icon-' + item.name.replace('--hover', '');
		}
		else if (item.name.indexOf('--active') !== -1) {
			item.name = 'sprite-smith:active .icon-' + item.name.replace('--active', '') + ',' + '\n' + 'sprite-smith.active .icon-' + item.name.replace('--active', '');
		}
		else if (item.name.indexOf('--focus') !== -1) {
			item.name = 'sprite-smith:focus .icon-' + item.name.replace('--focus', '');
		}
		else if (item.name.indexOf('.active') !== -1) {
			item.name = 'sprite-smith-active .icon-' + item.name.replace('.active', '');
		}
		else {
			item.name = 'sprite-smith .icon-' + item.name;
		}
		return item;
	}
};

configs.tests = {
	assets: 'tests/',
	ext: ['js'],
	exceptions: [],
	options: {
		browsers: [
			// 'chrome:emulation:device=iphone 4',
			// 'chrome:emulation:device=iphone 5',
			// 'chrome:emulation:device=iphone 6',
			'chrome',
			'firefox',
			// 'opera'
		],
		skipJsErrors: true
	}
};

configs.bootstrap = {
	assets: 'node_modules/bootstrap/scss/',
	dist: 'assets/sass/configs/',
	ext: 'scss',
	files: [
		// '_variables.scss',
		'bootstrap.scss',
		'_tables.scss',
		'_functions.scss',
		'_custom.scss'
	],
	postfix: 'BAK',
	copy: {
		exceptions: [
			'_custom.scss',
			'_tables.scss',
			'_functions.scss',
			'bootstrap'
		]
	},
	rename: {
		exceptions: [
			'_custom.scss'
		]
	},
	symlink: {
		exceptions: [
			'_custom.scss',
			'_tables.scss',
			'_functions.scss'
		]
	}
};

configs.sprite.options.imgPath = '/' + configs.sprite.dist + configs.sprite.options.imgName;

/*=========================================*/

/*==============================================================
=            Рабочий интерфейс | Operating interface           =
==============================================================*/

gulp.task('copy',
	gulp.series(copyFonts, copyImages/*, copyJS*/, copyPluginJS));

gulp.task('sassGroup', (function () {
	sassGlobalWatch();
	return gulp.series(/*sassConfig,/* sassLint,*/ sprite, sass);
})());

gulp.task('jsGroup', (function () {
return gulp.series(jshint, rollupJS, /*fixmyJS, semiJS,*/ jsbeautify, uglify);
})());

gulp.task('iconFontGroup', (function () {
	sassGlobalWatch();
	return gulp.series(/*iconFontFile, */iconFont);
})());

gulp.task('favicon',
	gulp.series(/*recolorFavicon, recolorFaviconRenamer, */faviconFile, faviconGenerate, faviconInject, faviconClean));

gulp.task(configs.dev, function () {
	mode = configs.dev;
	configs.templates.options.locals.mode = mode;
	return gulp.series(devList)();
});

gulp.task(configs.prod, function () {
	mode = configs.prod;
	configs.templates.options.locals.mode = mode;
	return gulp.series(prodList)();
});

gulp.task('fast', (function () {
	return gulp.series(fastList);
})());

gulp.task('deploy', (function() {
	(function () {
		clean((function () {
			var arr = [];
			configs.bootstrap.files.forEach(function(element) {
				arr.push(configs.sass.assets + element);
			});
			arr = filterExceptions(arr, configs.bootstrap.copy.exceptions);
			console.log('DEPLOY - ПОСЛЕ ФИЛЬТРАЦИИ: ', arr);
			return arr;
		})());
		return void(0);
	})();
	return gulp.series(bootstrapConfigs);
}()));

gulp.task('test',
	gulp.series(test));

gulp.task('default',
	gulp.series(mode));


var sftp = require('gulp-sftp');

gulp.task('sftp', function () {
	return gulp.src('dist/**/*')
		.pipe(sftp({
			host: 'github.com',
			user: 'Galate9I',
			pass: '123123Cc',
			port: '22',
			remotePath: 'Galate9I/html.freshbroccoli.git'
		}));
});

gulp.task('svg', function () {
	return gulp.src(configs.assets + 'images/svg/svg_assets/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({mode: "symbols"
			// mode: {
			// 	symbol: {
			// 		// sprite: '../sprite.svg',
			// 		// render: {
			// 		//  scss: {
			// 		// 	dest: configs.assets + 'sass/_sprite.scss'
			// 		//  }
			// 		// }
			// 	}
			// }
		}))
		.pipe(gulp.dest(configs.assets + 'images/svg/'));
});

// gulp.task('svgSprite', ['svgSpriteBuild', 'svgSpriteSass']);

/*============================================================*/

function test() {
	return gulp
		.src((srcCollection)(configs.tests.ext, configs.tests.exceptions, '*.'), {
			cwd: configs.tests.assets
		})
		.pipe(plugins.testcafe(configs.tests.options));
}

function sprite() {
	return gulp
		.src((srcCollection)(configs.sprite.ext, '', '*.'), {
			cwd: configs.sprite.assets
		})
		.pipe(plugins.debug(configs.sprite.debug))
		.pipe(spriteSmith(configs.sprite.options))

		.pipe(plugins.if((srcCollection)(configs.sprite.ext, '', '*.'), gulp.dest(configs.sprite.dist)))
		.pipe(plugins.if(['*.css', '*.' + configs.sass.ext], gulp.dest(configs.sass.assets)));
}

function srcCollection(ext, exceptions, regexp) {
	var array = [];
	if (Array.isArray(ext)) {
		ext.forEach(function (element) {
			array.push(regexp + element);
		});
	}
	else {
		array.push(regexp + ext);
	}
	if (exceptions.length) {
		var concated = array.concat(exceptions);
		console.log(concated);
		return concated;
	}
	console.log(array);
	return array;
}

function bootstrapConfigs() {
	var cp = gulp,
		renm = gulp,
		sym = gulp;

	// --------- Copy ---------

	cp.src((function () {
		var arr = [];
		configs.bootstrap.files.forEach(function (element) {
			arr.push(element);
		});
		arr = filterExceptions(arr, configs.bootstrap.copy.exceptions);
		arr = arr.map(function (element) {
			return configs.bootstrap.dist + element;
		});
		console.log('COPY BOOTSTRAP - ПОСЛЕ ФИЛЬТРАЦИИ И КОНКАТЕНАЦИИ: ', arr);
		return arr;
	})())
		.pipe(gulp.dest(configs.bootstrap.dist));

	// ------------------------

	// --------- Rename ---------

	renm.src((function () {
		var arr = [];
		configs.bootstrap.files.forEach(function (element) {
			arr.push(element);
		});
		arr = filterExceptions(arr, configs.bootstrap.rename.exceptions);
		console.log('RENAME BOOTSTRAP - ПОСЛЕ ФИЛЬТРАЦИИ: ', arr);
		return arr;
	})(), {
			cwd: configs.bootstrap.assets
		})
		.pipe(plugins.rename(function (o) {
			o.extname = o.extname.replace(configs.bootstrap.ext, configs.bootstrap.postfix + '.' + configs.bootstrap.ext);
		}))
		.pipe(gulp.dest(configs.bootstrap.assets));

	// --------------------------

	// --------- Symlink ---------

	sym.src((function () {
		var arr = [];
		configs.bootstrap.files.forEach(function (element) {
			arr.push(element);
		});
		arr = filterExceptions(arr, configs.bootstrap.symlink.exceptions);
		console.log('SYMLINK BOOTSTRAP - ПОСЛЕ ФИЛЬТРАЦИИ: ', arr);
		return arr;
	})(), {
			cwd: configs.bootstrap.dist
		})
		.pipe(plugins.sym(function (source) {
			return path.join(configs.bootstrap.assets, source.relative.split(path.sep)[0]);
		}, {
				force: true
			}));

	// ---------------------------

	return Promise.all([/*cp, */renm, sym]);
}

function filterExceptions(arr, exeptions) {
	if (Array.isArray(arr) && arr.length && Array.isArray(exeptions) && exeptions.length) {
		arr = arr.filter(function (file) {
			return exeptions.some(function (exception) {
				return !file.match(new RegExp(exception, 'igm'));
			});
		});
	}
	return arr;
}

function banner() {
	var css = gulp
		.src((srcCollection)(configs.banner.css.ext, configs.banner.css.exceptions, '*.'), {
			cwd: configs.banner.css.dist
		})
		.pipe(plugins.newer('../' + configs.banner.css.dist))
		.pipe(plugins.debug(configs.banner.css.debug))
		// .pipe(plugins.banner((gulp.signature)(Date()), { pkg: pkg }))
		.pipe(gulp.dest(configs.banner.css.dist));

	var js = gulp
		.src((srcCollection)(configs.banner.js.ext, configs.banner.js.exceptions, '*.'), {
			cwd: configs.banner.js.dist
		})
		.pipe(plugins.cached(configs.banner.cached.name, configs.banner.cached.options))
		.pipe(plugins.debug(configs.banner.js.debug))
		// .pipe(plugins.banner((gulp.signature)(Date()), { pkg: pkg }))
		.pipe(gulp.dest(configs.banner.js.dist));

	return Promise.all([js, css]);
}

function invertColor(hexTripletColor) {
	var color = hexTripletColor;
	color = color.substring(1);             // remove #
	color = parseInt(color, 16);            // convert to integer
	color = 0xFFFFFF ^ color;               // invert three bytes
	color = color.toString(16);             // convert to hex
	color = ("000000" + color).slice(-6);   // pad with leading zeros
	color = "#" + color;                    // prepend #
	return color;
}

function clean(array) {
	return del(array, {
		dryRun: true,
		force: true
	}).then(paths => {
		console.log('Удалены следующие файлы и папки | Deleted files and folders:\n', paths.join('\n'));
	});
}

function cleanBase() {
	return clean([configs.dist, configs.templates.assets + configs.favicon.injectFile.name + '.' + configs.templates.ext]);
		// return gulp.src(configs.dist, {read: false})
		// 	.pipe(clean());
}

function templates() {
	return gulp
		.src([
			'*.' + configs.templates.ext,
			'!' + configs.favicon.injectFile.name + '.' + configs.favicon.injectFile.ext
		], {
			cwd: configs.templates.assets
		})
		.pipe(plugins.affected())
		.pipe(plugins.pug(configs.templates.options))
		.pipe(gulp.dest(configs.templates.dist));
}

function htmllintReporter(filepath, issues) {
	if (issues.length > 0) {
		issues.forEach(function (issue) {
			plugins.gutil.log(plugins.gutil.colors.cyan('[gulp-htmllint] ') + plugins.gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + plugins.gutil.colors.red('(' + issue.code + ') ' + issue.msg));
		});

		process.exitCode = 1;
	}
}

function replaceRootTags(string) {
	return string.replace(/(?:<\/?(?:html|head|body)>)/igm, '');
}

function faviconClean() {
	return gulp
		.src(configs.favicon.injectFile.assets + configs.favicon.injectFile.name + '.' + configs.favicon.injectFile.ext)
		.pipe(faviconTRW())
		.pipe(gulp.dest(configs.templates.assets));
}

function htmlLint() {
	return gulp
		.src((srcCollection)(configs.html.ext, configs.html.lint.exceptions, '*.'), {
			cwd: configs.html.dist
		})
		.pipe(plugins.newer('../' + configs.html.dist))
		.pipe(plugins.debug(configs.html.lint.debug))
		.pipe(plugins.htmllint(configs.html.lint.options, htmllintReporter));
}

function htmlBeautify() {
	return gulp
		.src([configs.html.assets + '*.' + configs.html.ext, '!' + configs.html.assets + '*.' + configs.html.beautify.exceptions])
		.pipe(plugins.debug(configs.html.beautify.debug))
		.pipe(plugins.htmlBeautify(configs.html.beautify.options))
		.pipe(gulp.dest(configs.html.dist));
}

function faviconFile() {
	var str = '';
	return plugins.file(configs.favicon.injectFile.name + '.' + configs.templates.ext, str, {
		src: true
	})
		.pipe(gulp.dest(configs.favicon.injectFile.dist));
}

/*----------  Генератор фавиконов | Favicon generator  ----------*/

function faviconGenerate(done) {
	console.log('Используем: ' + configs.favicon.assets + configs.favicon.name + configs.favicon.separator + configs[mode] + '.' + configs.favicon.ext);
	plugins.realFavicon.generateFavicon({
		masterPicture: configs.favicon.assets + configs.favicon.name + configs.favicon.separator + configs[mode] + '.' + configs.favicon.ext,
		dest: configs.favicon.assets,
		iconsPath: '/../' + configs.favicon.dist,
		design: configs.favicon.design,
		settings: configs.favicon.settings,
		markupFile: FAVICON_DATA_FILE
	}, function () {
		done();
		clean(faviconPaths);
	});
}
/*---------------------------------------------------------------*/

/*----------  HTML Инжектор фавиконов - Favicons html injector  ----------*/

function faviconInject() {
	return gulp
		.src([configs.favicon.injectFile.assets + configs.favicon.injectFile.name + '.' + configs.templates.ext])
		.pipe(plugins.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest(configs.templates.assets));
}

/*------------------------------------------------------------------------*/

/*----------  Проверка обновлений для плагина | Check for updates on RealFaviconGenerator  ----------*/

function faviconUpdate() {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	plugins.realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
}

/*---------------------------------------------------------------------------------------------------*/
/* jshint ignore:start */
function recolorFavicon() {
	return gulp
		.src(configs.favicon.assets + configs.favicon.prefix + configs.favicon.name + '.' + configs.favicon.ext)
		.pipe(plugins.recolorSvg.GenerateVariants(
			[
				plugins.recolorSvg.ColorMatcher(configs.prodColor, 1)
			],
			[
				{
					suffix: configs.favicon.separator + configs.prod, colors: [Color(configs.prodColor)]
				},
				{
					suffix: configs.favicon.separator + configs.dev, colors: [Color(configs.devColor)]
				}
			]
		))
		.pipe(gulp.dest(configs.favicon.assets));
}

function recolorFaviconRenamer() {
	return gulp
		.src((function () {
			var modes = [configs.prod, configs.dev],
				paths = [],
				string = '';
			modes.forEach(function (_mode) {
				string = configs.favicon.assets + configs.favicon.prefix + configs.favicon.name + configs.favicon.separator + _mode + '.' + configs.favicon.ext;
				paths.push(string);
			});
			faviconPaths = paths;
			return paths;
		})())
		.pipe(plugins.rename(function (path) {
			path.basename = path.basename.replace(configs.favicon.prefix, '');
		}))
		.pipe(gulp.dest(configs.favicon.assets));
}
/* jshint ignore:end */
function sassConfig() {
	var scssLintConfigYaml = fs.readFileSync(configs.sassLint.SCSSConfigFile, 'utf8'),
		scssLintConfig = jsyaml.safeLoad(scssLintConfigYaml);

	makeSassLintConfig.convert(scssLintConfig);
	var string = makeSassLintConfig.convertYaml(scssLintConfigYaml);    // Convert a YAML file and get YAML output

	return plugins.file(configs.sassLint.SASSConfigFile, string, { src: true }).pipe(gulp.dest('./'));
}

function sassSRC(mode) {
	var arr = [];
	if (mode === 'sass' && configs[mode].files.length) {
		configs[mode].files.forEach(function (element) {
			arr.push(configs[mode].assets + element + '*.' + configs[mode].ext);
		});
	}
	else {
		arr = [
			configs[mode].assets + '*.' + configs[mode].ext,
			configs[mode].assets + '**/' + '*.' + configs[mode].ext
		];
	}
	if (configs[mode].exceptions.length) {
		var concated = [];
		configs[mode].exceptions.forEach(function (element) {
			concated.push('!' + configs[mode].assets + element);
			concated.push('!' + configs[mode].assets + '**/' + element);
		});
		concated = arr.concat(concated);
		console.log('CONCATED ' + mode + ': ', concated);
		return concated;
	}
	return arr;
}

function sassLint() {
	return gulp
		.src((function () {
			return sassSRC('sassLint');
		})())
		.pipe(plugins.cached(configs.sassLint.cached.name, configs.sassLint.cached.options))
		.pipe(plugins.debug(configs.sassLint.debug))
		.pipe(plugins.sassLint({
			configFile: configs.sassLint.SASSConfigFile
		}))
		.pipe(plugins.sassLint.format())
		.pipe(plugins.sassLint.failOnError());
}

function sass() {
	return gulp
		.src((function () {
			return sassSRC('sass');
		})())
		// .pipe(plugins.if(global.isWatching, plugins.cached(configs.sass.cached.name, configs.sass.cached.options)))
		// .pipe(plugins.cached(configs.sass.cached.name, configs.sass.cached.options))
		.pipe(plugins.sassMultiInheritance({dir: configs.sass.assets}))
		.pipe(plugins.debug(configs.sass.debug))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass(configs.sass.options).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer(configs.sass.autoprefixer))
		.pipe(plugins.sourcemaps.write(configs.sass.mapPath))
		.pipe(gulp.dest(configs.sass.dist));
}

function sassGlobalWatch() {
	global.isWatching = true;
}

function cssMin() {
	return gulp
		.src((srcCollection)(configs.cssMin.ext, configs.cssMin.exceptions, '*.'), {
			cwd: configs.cssMin.assets
		})
		.pipe(plugins.newer('../' + configs.cssMin.dist))
		.pipe(plugins.debug(configs.cssMin.debug))
		.pipe(plugins.sourcemaps.init(configs.cssMin.map.init))
		.pipe(plugins.cssmin())
		.pipe(plugins.rename(configs.cssMin.rename))
		.pipe(plugins.sourcemaps.write(configs.cssMin.map.write.path))
		.pipe(gulp.dest(configs.cssMin.dist));
}

function jsbeautify() {
	return gulp
		.src((srcCollection)(configs.js.jsbeautify.ext, configs.js.jsbeautify.exceptions, '*.'), {
			cwd: configs.js.jsbeautify.dist
		})
		.pipe(plugins.newer('../' + configs.js.jsbeautify.dist))
		.pipe(plugins.debug(configs.js.jsbeautify.debug))
		.pipe(plugins.jsbeautify(configs.js.jsbeautify.options))
		.pipe(gulp.dest(configs.js.jsbeautify.dist));
}

function fixmyJS() {
	return gulp
		.src((srcCollection)(configs.js.fixmyjs.ext, configs.js.fixmyjs.exceptions, '*.'), {
			cwd: configs.js.fixmyjs.assets
		})
		.pipe(plugins.newer('../' + configs.js.fixmyjs.dist))
		.pipe(plugins.debug(configs.js.fixmyjs.debug))
		.pipe(plugins.if(mode === configs.prod, plugins.fixmyjs(configs.js.fixmyjs.options)))
		.pipe(gulp.dest(configs.js.fixmyjs.dist));
}

function semiJS() {
	return gulp
		.src((srcCollection)(configs.js.semi.ext, configs.js.semi.exceptions, '*.'), {
			cwd: configs.js.semi.assets
		})
		.pipe(plugins.newer('../' + configs.js.semi.dist))
		.pipe(plugins.debug(configs.js.semi.debug))
		.pipe(plugins.semi.add(configs.js.semi.options))
		.pipe(gulp.dest(configs.js.semi.dist));
}

function rollupJS() {
	return gulp
		.src((function(){
			var arr = [];
			(srcCollection)(configs.js.ext, configs.js.exceptions, '*.').forEach(function (element) {
				arr.push(configs.js.assets + element);
			});
			return arr;
		})())
		.pipe(plugins.cached(configs.js.rollup.cached.name, configs.js.rollup.cached.options))
		.pipe(plugins.debug(configs.js.rollup.debug))
		// .pipe(plugins.sourcemaps.init())
		.pipe(plugins.rollup({
			// any option supported by Rollup can be set here. 
			allowRealFiles: true,
			entry: ['assets/js/common.js'],
			banner: '/*jshint esversion: 6*/\n\'use strict\';',
			plugins: [
				rollupPluginReplace({
					'process.env.NODE_ENV': JSON.stringify(mode === configs.prod ? 'production' : 'development')
				}),
				rollupPluginAlias({
					'vue': 'node_modules/vue/dist/vue.esm.js'
				}),
				nodeResolve({
					// If you set this to true, then modules will be built in "browser" mode 
					// based on the presence of the "browser" field in package.json 
					browser: false,  // Default: false 

					// not all files you want to resolve are .js or .json files 
					// if you want to support .json, you'll also need rollup-plugin-json 
					extensions: ['.js', '.json']  // Default: ['.js'] 
				})
			]
		}))
		// .pipe(plugins.sourcemaps.write('/'))
		.pipe(gulp.dest(configs.js.dist));
}

function uglify() {
	var ugf = gulp;
	ugf.src((srcCollection)(configs.js.uglify.ext, configs.js.uglify.exceptions, '*.'), {
			cwd: configs.js.uglify.assets
		})
		.pipe(plugins.newer('../' + configs.js.uglify.dist))
		.pipe(plugins.debug(configs.js.uglify.debug))
		.pipe(plugins.if(mode === 'prod',
			plugins.uglify.default(configs.js.uglify.options),
		))
		.pipe(plugins.if(mode === 'prod',
			plugins.rename({
				suffix: configs.js.uglify.renameSuffix
			})
		))
		.pipe(gulp.dest(configs.js.uglify.dist));

	return Promise.all([ugf]);
}

function jshint() {
	return gulp
		.src((srcCollection)(configs.js.jshint.ext, configs.js.jshint.exceptions, '*.'), {
			cwd: configs.js.jshint.assets
		})
		.pipe(plugins.newer('../' + configs.js.jshint.dist))
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
}

function copyFonts() {
	return gulp
		.src(configs.fonts.ext, {
			cwd: configs.fonts.assets
		})
		.pipe(gulp.dest(configs.fonts.dist));
}

function imageMin() {
	var src = configs.images.copy.exceptions;
	src.unshift(configs.images.assets + configs.images.copy.ext);
	return gulp
		.src(src)
		.pipe(plugins.cached(configs.images.minify.cached.name, configs.images.minify.cached.options))
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(configs.images.minify.dist));
}

function copyImages() {
	var src = configs.images.copy.exceptions;
	src.unshift(configs.images.assets + configs.images.copy.ext);
	return gulp
		.src(src)
		.pipe(plugins.cached(configs.images.cached.name, configs.images.cached.options))
		.pipe(gulp.dest(configs.images.dist));
}
/* jshint ignore:start */
function iconFontFile() {
	var str = '';
	return plugins.file(configs.fonts.custom.name + '.scss', str, {
		src: true
	})
		.pipe(gulp.dest(configs.sass.assets));
}
/* jshint ignore:end */

function iconFont() {
	return gulp
		.src(configs.fonts.custom.assets + '*.' + configs.fonts.custom.ext)
		.pipe(plugins.iconfontCss(configs.fonts.iconFontCss.options))
		.pipe(plugins.iconfont(configs.fonts.iconFont.options))
		.pipe(gulp.dest(configs.fonts.custom.dist));
}
/* jshint ignore:start */
function copyJS() {
	return gulp
		.src(['*.' + configs.js.ext/*, '!*.min' + configs.js.ext*/], {
			cwd: configs.js.assets
		})
		.pipe(plugins.cached(configs.js.copy.cached.name, configs.js.copy.cached.options))
		.pipe(gulp.dest(configs.js.dist));
}

function copyPluginJS() {
	return gulp
		.src([configs.js.assets + 'plugins/jquery.min.js', configs.js.assets + 'plugins/bootstrap.min.js', configs.js.assets + 'plugins/popper.min.js', configs.js.assets + 'plugins/slick.min.js'])
		.pipe(gulp.dest(configs.js.dist));
}
/* jshint ignore:end */

function server(done) {
	browser.init((function () {
		var options = configs.server;
		options.localOnly = (function () {
			return mode === configs.prod;
		})();
		console.log(options);
		return options;
	})());
	done();
}

function watch() {
	var extImages = (function () {
		var obj = '{';
		configs.images.ext.forEach(function (element, index, array) {
			obj += element;
			if (index < array.length - 1) {
				obj += ',';
			}
		});
		obj += '}';
		obj = obj.replace(',}', '}');
		console.log(obj, obj.replace(',svg', ''));
		return obj;
	})();

	gulp.watch(configs.sassLint.SCSSConfigFile)
		.on('all', (function () {
			if (mode === configs.prod) {
				return gulp.series(sassConfig, sassLint, sass, cssMin, banner, browser.reload);
			}
			return gulp.series(sassConfig, sassLint, sass, banner, browser.reload);
		})());

	gulp.watch([configs.sass.assets + '*.' + configs.sass.ext, configs.sass.assets + '/**/*.' + configs.sass.ext, configs.bootstrap.dist + '*.' + configs.bootstrap.ext])
		.on('all', (function () {
			if (mode === configs.prod) {
				return gulp.series(sassLint, sass, cssMin, banner, browser.reload);
			}
			return gulp.series(sassLint, sass, banner, browser.reload);
		})());

	gulp.watch(configs.templates.assets + '*.' + configs.templates.ext)
		.on('all', gulp.series(templates, htmlBeautify, htmlLint, browser.reload));

	gulp.watch( 'assets/blocks/*.pug')
		.on('all', gulp.series(templates, htmlBeautify, htmlLint, browser.reload));

	gulp.watch(configs.js.assets + '*.' + configs.js.ext)
		.on('all', gulp.series('jsGroup', /*copyJS, */banner, browser.reload));

	gulp.watch(configs.fonts.assets + configs.fonts.ext)
		.on('all', gulp.series(copyFonts, browser.reload));

	gulp.watch([configs.images.assets + '*.' + extImages, configs.sprite.assets + '*.' + extImages.replace(',svg', '')])
		.on('all', gulp.series(sprite, imageMin, copyImages, 'iconFontGroup', browser.reload));
}
