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
    var result = NCUOne.shortLink (link);
    // the same source link
    if (result == 1) {
      window.plugins.toast.showShortBottom('縮過了囉');
    } else if (result == 0) {
      window.plugins.toast.showShortBottom('未知異常');
    } else {
      $scope.shortedLink = result;
    }
  }

  $scope.shareLink = function (link) {
    Share.doShare (link);
  }
}]);
