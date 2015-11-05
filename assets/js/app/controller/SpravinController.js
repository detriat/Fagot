(function () {
    'use strict';

    angular.module('app').controller('SpravinController', SpravinController).directive('autoComplete', function($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        };
    });


    SpravinController.$inject = ["$scope", "Ingridients"];

    function SpravinController($scope, Ingridients, $mdDialog) {

        $scope.ingridients = Ingridients.query();

        $scope.ingri = "";


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
                size: ingri.size,
                index: $index
            };



        };

        $scope.save_update = function (){

            var ingri = new Ingridients(Ingridient);

            var ingri= $scope.updIngridient;
            var Ingr = Ingridients.get({id: ingri.id}, function(){
                Ingr.category = $scope.updIngridient.category;
                Ingr.title = $scope.updIngridient.title;
                Ingr.size = $scope.updIngridient.size;
                Ingr.$save().then(function(ingr){
                   // $scope.ingridients.splice($scope.updIngridient.index,1);
                    $scope.ingridients.push(Ingr);

                });

            });

        };



    }

})();
