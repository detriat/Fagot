(function(){
    'use strict';

    angular.module('app').controller('SpravkaController', SpravkaController)
        .directive("addingri", function ($compile) {
            return function (scope, element) {
                element.bind("click", function () {
                    scope.counter++;
                    angular.element(document.getElementById('auto_generat')).append($compile('<md-input-container class="flex name_ingi_k">' +
                        '<label for="input_19">Название ингридиента</label>' +
                        '<input ng-model="ingri.item'+scope.counter +'.title" class="ng-pristine ng-valid md-input ng-touched" id="input_19" aria-invalid="false" style="">' +
                        '</md-input-container>' +
                        '<md-input-container class="flex size_ingri_k">' +
                        '<label for="input_19">Размер</label>' +
                        '<input ng-model="ingri.item'+scope.counter +'.size" class="ng-pristine ng-valid md-input ng-touched" id="input_19" aria-invalid="false" style="">' +
                        '</md-input-container>' +
                        '<button type="button" class="btn btn-primary delete_ingri_k" data-ng-click="delete_input()">' +
                        '<ng-md-icon class="add_icon" icon="cancel" style="fill: #ffffff "  size="25"></ng-md-icon>' +
                        '</button>')(scope));

                });

            };
        });


    SpravkaController.$inject = ["$scope", "Items"];
    function SpravkaController ($scope, Items) {

        $scope.items = Items.query();
        $scope.counter = 0;
        $scope.item = "";

        $scope.save_item = function () {

            var total_count = 0 ;

            for(var index in $scope.ingri) {
                total_count = total_count + parseFloat($scope.ingri[index].size);
            }

            var Item = {
                "title": $scope.item.title,
                "components": $scope.ingri,
                "price": $scope.item.price,
                "size" : total_count
            };

            var item = new Items(Item);
            item.$save().then(function (newItem) {
                //$scope.ingridients.push(newItem);
                console.log("hui");
                //$("#myModal").modal('hide');
                //$scope.newIngridient="";
            });


        };

        $scope.add_input = function (){

            $("#auto_generat").append('<md-input-container class="flex name_ingi_k">' +
                '<label for="input_19">Название ингридиента</label>' +
                '<input ng-model="ingri.item'+$scope.counter +'.title" class="ng-pristine ng-valid md-input ng-touched" id="input_19" aria-invalid="false" style="">' +
                '</md-input-container>' +
                '<md-input-container class="flex size_ingri_k">' +
                '<label for="input_19">Размер</label>' +
                '<input ng-model="ingri.size" class="ng-pristine ng-valid md-input ng-touched" id="input_19" aria-invalid="false" style="">' +
                '<button type="button" class="btn btn-primary delete_ingri_k" data-ng-click="delete_input()>' +
                '<ng-md-icon class="add_icon" icon="cancel" style="fill: #ffffff "  size="25"></ng-md-icon>' +
                '</button>'+
                '</md-input-container>');
            $scope.counter++;
        };

        $scope.delete_input = function (){
            $(this).parent().remove();
        }
    }



})();
