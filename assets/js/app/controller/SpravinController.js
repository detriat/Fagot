(function () {
    'use strict';

    var app = angular.module('app').controller('SpravinController', SpravinController);
    SpravinController.$inject = ["$scope", "Ingridients"];

    function SpravinController($scope, Ingridients, $mdDialog) {
        $scope.ingridients = Ingridients.query();
        $scope.ingri = "";
        $scope.add = function () {
           $("#myModal").modal('show');
           $scope.newIngridient = {
             "category" : '',
             "title" : '',
             "size" : ''
           }
        };

        $scope.save_inri = function () {
            var Ingridient = {
                "category": $scope.newIngridient.category,
                "title": $scope.newIngridient.title,
                "size": $scope.newIngridient.size
            };

            var ingri = new Ingridients(Ingridient);
            ingri.$save().then(function (newIngri) {
                $scope.ingridients.push(newIngri);
                $("#myModal").modal('hide');
                $scope.newIngridient="";
            });

        };

        $scope.delete_inri = function (ingri, $index) {

        if (!confirm("Дейтсвительно хотите удалить?")) return;
                ingri.$remove().then(function(){
                    $scope.ingridients.splice($index,1);
                });
        };

        $scope.update_inri = function (ingri, $index) {
            $("#myModal1").modal();
            $scope.updIngridient = {
                id : ingri.id,
                category:ingri.category,
                title: ingri.title,
                size: ingri.size
            };

        };

        $scope.save_update = function (){
            var Ingr = Ingridients.get({id: $scope.updIngridient.id}, function(){
                Ingr.category = $scope.updIngridient.category;
                Ingr.title = $scope.updIngridient.title;
                Ingr.size = $scope.updIngridient.size;
                Ingr.$save().then(function(res){
                    $("#myModal1").modal('hide');
                    $scope.ingridients = Ingridients.query();
                });
            });
        };


    }

})();
