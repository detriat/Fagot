(function() {
  'use strict';

  angular.module('app').controller('NaklavController', NaklavController);
  NaklavController.$inject = ["$scope", "$rootScope", "$mdDialog", "Sklad"];

  function NaklavController($scope, $rootScope, $mdDialog, Sklad) {

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
      $scope.promise = Sklad.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {
      $scope.naklavs = records;
    }
    getDesserts();

    $scope.add = function(ev) {
      $rootScope.kek = {
        "id": '',
        "date": '',
        "post": '',
        "ingri":'',
        "amount":'',
        "price":''
      }
      $mdDialog.show({
        controller: 'NaklavDialogController',
        templateUrl: 'view/naklav_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.update = function(ka, ev) {
      $rootScope.kek = ka;
      $mdDialog.show({
        controller: 'NaklavDialogController',
        templateUrl: 'view/naklav_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.delete = function(it, ev) {
      var order = new Sklad.in(it);
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить эту накладную?')
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
