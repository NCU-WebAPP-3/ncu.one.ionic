angular.module ('app.controllers', ['app.services'])

.controller ('MainCtrl', ['$scope', 'NCUOne', 'Share', 'intent', '$ionicPopup', '$rootScope', function ($scope, NCUOne, Share, intent, $ionicPopup, $rootScope) {
  $scope.inputLink = "";
  $scope.shortedLink = "";
  $rootScope.$on('intent', function() {
    $scope.inputLink = intent.getData ();
    $scope.$apply ();
  });
  $scope.getShortLink = function (link) {
    console.log (link);
    NCUOne.shortLink(link, function(shorted) {
			// the same source link
			if (shorted == 0) {
				window.plugins.toast.showShortBottom('未知異常');
			} else {
				$scope.shortedLink = shorted;
			}
		});
  }

  $scope.shareLink = function (link) {
    Share.doShare (link);
  }
}]);
