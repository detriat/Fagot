(function(){
  'use strict';
  angular.module('app').controller('SpravinControllerDialog', SpravinControllerDialog);

  SpravinControllerDialog.$inject = ["$scope", "$rootScope", "$mdDialog", 'Ingridients', 'Categories'];
  function SpravinControllerDialog($scope, $rootScope, $mdDialog, Ingridients, Categories){
    $scope.cancel = function () {
      $mdDialog.hide();
    }
    $scope.categories = Categories.query({});

    $scope.save = function () {
        var ingri = new Ingridients($scope.ingridient);
        ingri.$save().then(function (newIngri) {
          $scope.close();
        });
    };


  }


})();
