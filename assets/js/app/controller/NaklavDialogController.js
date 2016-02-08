(function(){
    'use strict';

    angular.module('app').controller('NaklavDialogController', NaklavDialogController);
    NaklavDialogController.$inject = ["$scope", "$rootScope", "$mdDialog", "Ingridients","Post", "Sklad"];
    function NaklavDialogController ($scope, $rootScope, $mdDialog, Ingridients,Post, Sklad) {
      $scope.cancel = function () {
        $mdDialog.hide();
      }


      $scope.querySearch = function(query) {
        return Ingridients.auto.get({
          "search": query
        }).$promise.then(function(result) {
          return result.data;
        });
      }

      $scope.recalc = function () {
        $scope.suma = $scope.naklav.amount * $scope.naklav.price;
      }

      $scope.ingri_change = function() {
        if ($scope.naklav.ingri == null) { $scope.naklav.price=""; return; }
        $scope.naklav.price = $scope.naklav.ingri.price_zak;
      }

      $scope.querySearch1 = function(query) {
        return Post.auto.get({
          "search": query
        }).$promise.then(function(result) {
          return result.data;
        });
      }


      $scope.save = function () {
        if ($scope.naklav.ingri == null) {
          alert('Выберите из списка или введите валидный ингридиент');
          return;
        }
        if ($scope.naklav.post == null) {
          alert('Выберите из списка или введите валидного поставщика');
          return;
        }
          $scope.naklav.ingri = $scope.naklav.ingri.id;
          $scope.naklav.post = $scope.naklav.post.id;


          var ingri = new Sklad.in($scope.naklav);
          ingri.$save().then(function (naklav) {
            $scope.cancel();
          });

          console.log($scope.naklav);
      };



    }

})();
