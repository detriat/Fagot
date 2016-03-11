(function(){
  'use strict';
  angular.module('app').controller('KoktDialogController', KoktDialogController);

  KoktDialogController.$inject = ["$scope", "$rootScope", "$mdDialog"];
  function KoktDialogController($scope, $rootScope, $mdDialog){
    $scope.cancel = function () {
      $mdDialog.hide();
    }

  


  }


})();
