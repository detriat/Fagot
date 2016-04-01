(function() {
  'use strict';

  var app = angular.module('app').controller('SkladController', SkladController);
  SkladController.$inject = ["$scope", "Sklad", "$mdDialog", '$rootScope'];

  function SkladController($scope, Sklad, $mdDialog, $rootScope) {

    $scope.query = {
      order: "name",
      limit: 10,
      page: 1
    };

    $scope.reOrder = function(order) {
      getDesserts(angular.extend({}, $scope.query, {
        order: order
      }));
    }

    $scope.onPaginate = function(page, limit) {
      getDesserts(angular.extend({}, $scope.query, {
        page: page,
        limit: limit
      }));
    };

    function getDesserts(query) {
      $scope.promise = Sklad.ostat.get(query || $scope.query, success).$promise;
    }

    function success(records) {
      $scope.sklads = records;
      $scope.sklads.data.forEach(function(item){
        var koef = item.amount/item.ingri.size;
        if (koef.toFixed() == 0) {item.ostatok = koef*1000 + " мл";}else{
          item.ostatok = koef.toFixed() + " бут." + " (" + item.ingri.size+")";
          if (koef - koef.toFixed() != 0) item.ostatok+= " + " + ((koef - koef.toFixed()) * 1000).toFixed() + " мл";
        }

      })
    }
    getDesserts();

    $scope.ingri = "";


    $scope.delete = function(it, ev) {
      var order = new Sklad.in(it);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить этот ингредиент?')
        .textContent('Это действите не может быть отменено')
        .ariaLabel('Удалить')
        .targetEvent(ev)
        .ok('Да')
        .cancel('Нет');
      $mdDialog.show(confirm).then(function() {
        order.$remove().then(function() {
          getDesserts();
        });
      });
    };


  }

})();
