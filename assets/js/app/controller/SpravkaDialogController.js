(function(){
    'use strict';

    angular.module('app').controller('SpravkaControllerDialog', SpravkaControllerDialog)


    SpravkaControllerDialog.$inject = ["$scope", "Items", "$rootScope", "$mdDialog"];

    function SpravkaControllerDialog ($scope, Items, $rootScope, $mdDialog) {
        $scope.add = [{ingridient: "", kolvo: ""}]

        $scope.item = $rootScope.kek;
        $scope.add_prop = function () {
          $scope.add.push({});  
        }
        $scope.cancel = function () {
          $mdDialog.hide();
        }
    }

  })();
