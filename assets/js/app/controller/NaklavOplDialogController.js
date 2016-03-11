(function(){
  'use strict';
  angular.module('app').controller('NaklavOplDialogController', NaklavOplDialogController);

  NaklavOplDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", 'Naklavs'];
  function NaklavOplDialogController($scope, $rootScope, $mdDialog, Naklavs){

    $scope.nakl = {
      id: $rootScope.kok.id
    }

    $scope.opl = {};
    $scope.oplatas = $rootScope.kok.balance;
    if ($rootScope.kok.balance.length == 0) $scope.oplatas = [];

    $scope.cancel = function () {
      $mdDialog.hide();
    }

    $scope.save = function () {
      $scope.nakl.balance = $scope.oplatas;
      console.log($scope.nakl);
        var opl = new Naklavs.in($scope.nakl);
        opl.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
    };

    $scope.opl = function() {
      $scope.oplatas.push($scope.opl);
      $scope.opl = {};
    }

      $scope.opl.date = new Date();

  }


})();
