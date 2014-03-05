(function(win){
	
	var Recipe = function(arg){

		this.init.call(this, arg);
	};

	Recipe.prototype = {

		init : function(){

			var self = this;

			this.$entry = $('#entry');

			this.$entry.show();
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
					this.$entry.append(self.renderLoading());
				}

				$('.recipeNum').append('<div><span>' + len + '</span> 品公開中</p>').show();

				var item = $('.list_item');
				for (i = 0; i < len; i++){
					$(item[i]).find('.dish').remove();
					$(item[i]).html(self.renderItem(json[i]));

					$(item[i]).find('.img_wrapper').imagesLoaded( function(){
						this.find('img').animate({"opacity":1}, 1000);
					})
				}

			});

		},

		renderLoading : function() {

			return '<li class="list_item">' +
						'<div class="dish">' +
							'<div class="img_wrapper">' +
								'<div class="loading"></div>' +
							'</div>' +
						'</div>' +
					'</li>';

		},

		renderItem : function(data) {

			var link = data.link || '',
				img = data.imgUrl || 'http://59.157.7.186/wordpress/wp-content/uploads/r000.jpg',
				title = data.title || '',
				des = data.description || '',
				cat = data.categories || '',
				ing = data.ingradients || '',
				time = data.time || '',
				date = new Date().getTime();

			cls = this.getMetaClass(cat, ing, time);
			cat = this.renderMeta('category', cat);
			ing = this.renderMeta('ingradient', ing);
			if (time) time = '<div class="time"><p><i></i>' + time + '</p></div>';

			return  '<a href="'+ link +'">' +
						'<div class="dish">' +
							'<div class="img_wrapper"><img src="'+ img + "?=" + date + '"/></div>' +
							'<div class="titles">' +
								'<h2>' + title + '</h2>' +
								'<p class="description">' + des + '</p>' +
							'</div>' +
							'<div class="meta ' + cls + '">' + cat + ing + time + '</div>' +
						'</div>' +
					'</a>';

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

			var self = this,
				$btn = $('.button');

			$('#toList').on('click',function(){
				$btn.removeClass('active');
				$(this).addClass('active');
				self.$entry.removeClass('grid').addClass('list');
			});

			$('#toGrid').on('click',function(){
				$btn.removeClass('active');
				$(this).addClass('active');
				self.$entry.removeClass('list').addClass('grid');
			});

		}

	}

	win.Recipe = Recipe;

})(window);