angular.module('app.services', ['app.controllers'])

.service ('NCUOne', ['$http', function ($http) {
  this.lastLink = "";
  this.lastShortLink = "";
  this.shortLink = function (link) {
    if (this.lastLink == link) {
      return 1;
    } else {
      this.lastLink = link;
      $http({
         method: 'POST',
         url: 'https://ncu.one/_/api/',
         data: 'type=short_it&url=' + link
      }).then (function (response) {
        this.lastShortLink = response.data.url;
      }, function (response) {
        console.log (response);
      });
      return this.lastShortLink;
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
