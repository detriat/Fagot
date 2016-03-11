(function(){
    'use strict';

    angular.module('app').controller('KasaController', KasaController);
    KasaController.$inject = ["$scope", "Ingridients", "Items"];



    function KasaController ($scope, Ingridients, Items) {
      $scope.query = {
        order: "name"         
      };

      function getDesserts(query) {
        $scope.promise = Ingridients.list.get(query || $scope.query, success).$promise;
      }

      function success(records) {
        $scope.ingridients = records;
      }

      getDesserts();

      function getDesserts1(query) {
        $scope.promise = Items.list.get(query || $scope.query, success1).$promise;
      }

      function success1(records) {
        $scope.kokts = records;
      }

      getDesserts1();
    }

})();
