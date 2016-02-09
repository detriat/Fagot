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

      $scope.recalc = function (ind) {
        $scope.naim[ind].suma = $scope.naim[ind].amount * $scope.naim[ind].price;
      }

      $scope.ingri_change = function(ind) {
      //  console.log($scope.it);
        if ($scope.naim[ind].ingri == null) { $scope.naim[ind].price=""; return; }

        $scope.naim[ind].price = $scope.naim[ind].ingri.price_zak;
      }

      $scope.querySearch1 = function(query) {
        return Post.auto.get({
          "search": query
        }).$promise.then(function(result) {
          return result.data;
        });
      }

      $scope.naim = [];
      $scope.naim.push({})

      $scope.add_naim = function() {
        $scope.naim.push({});
      }

      $scope.delete_input_naim = function(naim) {
        var index = $scope.naim.indexOf(naim);
        $scope.naim.splice(index, 1);
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
