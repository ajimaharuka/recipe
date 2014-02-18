(function(win){
	
	var Recipe = function(arg){

		this.init.call(this, arg);
	};

	Recipe.prototype = {

		init : function(){

			var self = this;

			$('#entry').show();
			$('#nav').show();

			win.addEventListener('load', self.getData(), self.addEvt());

		},

		getData : function() {

			var self = this;

			$.get('/recipe', function(res){
				var json = JSON.parse(res),
					len = json.length,
					i;

				for (i = 0; i < len; i++){
					self.renderLoading();
				}

				$('.recipeNum').append($('<div><span>' + len + '</span> 品公開中</p>')).show();

				var item = $('.list_item');
				for (i = 0; i < len; i++){
					self.renderItem(item[i], json[i]);
				}

			});

		},

		renderLoading : function() {

			var el = $('<li class="list_item"><div class="loading"><div class="img_wrapper"></div></div></li>');
			$('#entry').append(el);

		},

		renderItem : function(item, data) {

			$(item).find('.loading').remove();

			var link = data.link || '',
				img = data.imgUrl || 'http://59.157.7.186/wordpress/wp-content/uploads/r000.jpg',
				title = data.title || '',
				des = data.description || '',
				cat = data.categories || '',
				ing = data.ingradients || '',
				time = data.time || '',
				el = '';

			cls = this.getMetaClass(cat, ing, time);
			cat = this.renderMeta('category', cat);
			ing = this.renderMeta('ingradient', ing);
			if (time) time = '<div class="time"><p><i></i>' + time + '</p></div>';

			el += '<a href="'+ link +'"><div class="dish">' +
				'<div class="img_wrapper"><img src="'+ img + '"/></div>' +
				'<div class="titles"><h2>' + title + '</h2>' +
				'<p class="description">' + des + '</p></div>' +
				'<div class="meta ' + cls + '">' + cat + ing + time
				'</div>' +
				'</div></a>';

			$(item).html(el);

		},

		getMetaClass : function (cat, ing, time) {

			var arr = [];

			arr = cat.concat(ing);
			arr.push(time);

			var len = arr.length,
				i,
				cls = '';

			for (i = 0; i < len; i++) {
				if (arr[i]) cls += arr[i] + ' ';
			}

			return cls;

		},

		renderMeta : function(cls, data) {

			if (!data) return '';

			var len = data.length,
				i,
				el = '';

			for (i = 0; i < len; i++) {
				if (data[i]) {
					if ( i < 5 ) {
						el += '<li>' + data[i] + '</li>';
					} else if (i === 5) {
						el += '<li class="etc">' + '･･･' + '</li>';
					}
				}
			}

			return '<div class="' + cls + '"><ul><span></span>' + el + '</ul></div>';

		},

		addEvt : function () {

			$('#toList').on('click',function(){
				$('.button').removeClass('active');
				$(this).addClass('active');
				$('#entry').removeClass('grid').addClass('list');
			});

			$('#toGrid').on('click',function(){
				$('.button').removeClass('active');
				$(this).addClass('active');
				$('#entry').removeClass('list').addClass('grid');
			});

		}

	}

	win.Recipe = Recipe;

})(window);