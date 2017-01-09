angular.module('app.services', ['app.controllers'])

.service ('NCUOne', function () {
	this.lastLink = "";
	this.lastShortLink = "";
	this.shortLink = function (link) {
		if (this.lastLink == link) {
			return 1;
		} else {
			this.lastLink = link;
			this.lastShortLink = "https://ncu.one/OAO";
			return this.lastShortLink;
		}
	}
})

.service ('Share', function () {
	this.doShare = function (link) {
		var options = {
			message: null,
			subject: null,
			files: null,
			url: link,
			chooserTitle: '選擇要分享的APP'
		};
		window.plugins.socialsharing.shareWithOptions (options, function (result) {
			console.log (result);
		}, function (msg) {
			console.log(msg);
		});
	}
})

.factory('intent', ['$rootScope', function($rootScope){
	var intent = {data:null};

	intent.setData = function(data){
		intent.data = data;
		console.log (data);
		$rootScope.$broadcast('intent');
	};

	intent.getData = function(){
		return intent.data;
	};

	return intent;
}]);
