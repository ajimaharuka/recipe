
var request = require('request');
exports.index = function(req, res){

	url = 'http://www.api.ajimaharuka.com/';
	request(url, function (err, response, body) {
		if (!err && res.statusCode == 200) {

			var data = JSON.parse(body),
				len = data.length,
				recipe = [],
				i;

			for (i = 0; i < len; i++) {

				var entry = data[i];

				if(entry){
					var title = entry.title;
					var link = entry.link;
					var content = entry.content;
					content.replace(/[\n\r\t\s]/g,"");

					if (content) {
						var imgUrl = content.match(/src="http:\/\/[\w\d\/%#$&?()~_.=+-]+/i);
						if (imgUrl) {
							imgUrl = imgUrl[0].substring(5);
						}
						var des = content.match(/<div class="description">[\s\S]*?<\/div>/g);
						if (des) {
							des = des[0].replace('<div class="description">','');
							des = des.replace('</div>','');
						}
						var ing = content.match(/<ul class="ingredients">[\s\S]*?<\/ul>/g);
						if (ing) {
							ing[0] = ing[0].replace(/、/g,'');
							ing = ing[0].match(/<li>.*?<\/li>/g);
							for (var j = 0; j < ing.length; j++) {
								ing[j] = ing[j].replace(/<li>/g,'');
								ing[j] = ing[j].replace(/<\/li>/g,'');
							}
						}
					}
					var cat = entry.tags;
					var time = '';
					for (var j = 0; j < cat.length; j++) {
						var _time = cat[j].match(/[\d]*?分/g);
						if (_time){
							delete cat[j];
							time = _time[0];
						}
					}
				}

				recipe[i] = {
					'title' : title,
					'link' : link,
					'imgUrl' : imgUrl,
					'description' : des, 
					'categories' : cat,
					'ingradients' : ing,
					'time': time
				};
			}

			var json = JSON.stringify(recipe);
			res.send(json, { 'Content-Type': 'text/plain' }, 200);
			res.end();
		} else {
			console.log('error: '+ res.statusCode);
		}
	});
};