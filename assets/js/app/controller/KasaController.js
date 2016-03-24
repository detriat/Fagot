(function(){
    'use strict';

    angular.module('app').controller('KasaController', KasaController);
    KasaController.$inject = ["$scope", "Ingridients", "Items","$mdEditDialog", "$rootScope", "$mdDialog", "Orders"];



    function KasaController ($scope, Ingridients, Items, $mdEditDialog, $rootScope, $mdDialog, Orders) {
      $scope.query = {

      };
      $scope.buys = [];


      function getDesserts1(query) {
        $scope.promise = Items.in.query(query || $scope.query, success1).$promise;
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
      $scope.save = function() {
        var order = {
          buys : $scope.buys
        }
        var or = new Orders.in(order);
        or.$save().then(function () {
          $scope.cancel();
        },function(err){
          console.log(err);
        });
      }

      $scope.new = function () {
        $scope.zakaz = {
          id: ""
        }
      }

      $scope.buy = function(kok) {
        if (kok.visible) {
          kok.kolvo = 1;
        }else{
            kok.kolvo = 50;
        }

        $scope.buys.push(kok);
      }
      $scope.delete_buy = function(kok) {
        var index = $scope.kok.indexOf(kok);
        $scope.kok.splice(index, 1);
      }

      $scope.editComment = function (event, dessert) {
         event.stopPropagation(); // in case autoselect is enabled

         var editDialog = {
           modelValue: dessert.kolvo,
           placeholder: 'Add a comment',
           ok: 'Сохранить',
           cancel: 'Отмена',
           save: function (input) {
             dessert.kolvo = input.$modelValue;
           },
           targetEvent: event,
           title: 'Количество'
         };

         var promise = $mdEditDialog.large(editDialog);
         promise.then(function (ctrl) {
           var input = ctrl.getInput();
         });
       };


       $scope.add_dolg = function(ev) {
         $rootScope.ig = {};
         $mdDialog.show({
           controller: 'DolgController',
           templateUrl: 'view/dolg_kasa_dialog.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose: false
         }).then(getDesserts);
       };

       $scope.opl = function () {
         $scope.zakaz = {
           id: ""
         };


       }


    }

})();
