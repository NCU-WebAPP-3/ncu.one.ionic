angular.module ('app.controllers', ['app.services'])

.controller ('MainCtrl', ['$scope', 'NCUOne', 'Share', 'intent', '$ionicPopup', '$rootScope', function ($scope, NCUOne, Share, intent, $ionicPopup, $rootScope) {
  $scope.inputLink = "";
  $scope.shortedLink = "";
  $rootScope.$on('intent', function(event, doShort) {
    $scope.inputLink = intent.getData ();
    $scope.$apply ();
    if (doShort)
      $scope.getShortLink ($scope.inputLink);
  });
  $scope.getShortLink = function (link) {
    console.log (link);
    NCUOne.shortLink(link, function(shorted) {
      if (shorted === 0) {
        window.plugins.toast.showShortBottom('Something went wrong...');
      } else {
        $scope.shortedLink = shorted;
        Share.doShare (shorted);
      }
    });
  }
}]);
