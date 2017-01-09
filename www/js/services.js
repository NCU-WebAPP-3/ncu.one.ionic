angular.module('app.services', ['app.controllers'])

.service ('NCUOne', ['$http', function ($http) {
	var lastLink = "";
	var lastShortLink = "";
	this.shortLink = function (link, callback) {
		if (lastLink == link) {
			callback(lastShortLink);
		} else {
      lastLink = link;
      $http({
         method: 'POST',
         url: 'https://ncu.one/_/api/',
         data: 'type=short_it&url=' + link,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then (function (response) {
        callback(lastShortLink = response.data.url);
      }, function (response) {
        console.log (response);
        callback(0);
      });
		}
	}
}])

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

	intent.setData = function(data, doShort){
	  if (typeof doShort === 'undefined')
	    doShort = true;
		intent.data = data;
		console.log (data);
		$rootScope.$broadcast('intent', doShort);
	};

	intent.getData = function(){
		return intent.data;
	};

	return intent;
}]);
