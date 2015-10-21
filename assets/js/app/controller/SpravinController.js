(function(){
    'use strict';

    angular.module('app').controller('SpravinController', SpravinController);
    SpravinController.$inject = ["$scope","$routeProvider"];
    function SpravinController ($scope) {
        $scope.save_inri = function () {
            console.log("huui");
        }

        return 0;
    }

})();
