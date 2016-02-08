(function() {
  'use strict';

  var app = angular.module('app').controller('PostController', PostController);
  PostController.$inject = ["$scope", "Post", "$mdDialog", '$rootScope'];

  function PostController($scope, Post, $mdDialog, $rootScope) {

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
      $scope.promise = Post.list.get(query || $scope.query, success).$promise;
    }

    function success(records) {
      $scope.posts = records;
    }
    getDesserts();

    $scope.ingri = "";

$scope.add = function(ev) {
      $rootScope.ig = {};
      $mdDialog.show({
        controller: 'PostDialogController',
        templateUrl: 'view/post_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      }).then(getDesserts);
    };

    $scope.delete = function(it, ev) {
      var order = new Post.in(it);
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
