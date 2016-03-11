(function(){
    'use strict';

    angular.module('app').controller('KasaController', KasaController);
    KasaController.$inject = ["$scope", "Ingridients", "Items"];



    function KasaController ($scope, Ingridients, Items) {
      $scope.query = {
        order: "name"
      };
      $scope.buys = [];
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


      $scope.querySearch = function(query) {
        return Items.auto.get({
          "search": query
        }).$promise.then(function(result) {
          return result.data;
        });
      }


      $scope.new = function () {
        $scope.zakaz = {
          id: "",
        }
      }

      $scope.buy = function(kok) {
        console.log(kok);
        $scope.buys.push(kok);
      }
      $scope.delete_buy = function(kok) {
        var index = $scope.kok.indexOf(kok);
        $scope.kok.splice(index, 1);
      }

    }

})();
