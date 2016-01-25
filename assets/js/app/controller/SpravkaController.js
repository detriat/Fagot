(function(){
    'use strict';

    angular.module('app').controller('SpravkaController', SpravkaController)


    SpravkaController.$inject = ["$scope", "Items", "$mdDialog", "$rootScope"];
    function SpravkaController ($scope, Items, $mdDialog, $rootScope) {


        $scope.items = Items.query();
        $scope.counter = 0;
        $scope.item = "";

        $scope.delete_item = function (item, $index) {

        if (!confirm("Дейтсвительно хотите удалить?")) return;
                item.$remove().then(function(){
                    $scope.items.splice($index,1);
                });
        };

           $scope.add = function (ev) {
             $rootScope.kek = {
               "id" : '',
               "title" : '',
               "price" : ''
             }
              $mdDialog.show({
                controller: 'SpravkaControllerDialog',
                templateUrl: 'view/sprav_ka_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
              }).then(function(){

              }, function(err){
                console.log(err);
              });
           };

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
                $scope.items.push(newItem);
                $("#myModal").modal('hide');
                $scope.newItem="";
            });


        };


        $scope.delete_input = function (){
            $(this).parent().remove();
        }

        $scope.update_item = function(item, $index) {
            $("#myModal").modal();
            $scope.item = {
                "id" : item.id,
                "title": item.title,
                //"components":ingri,
                "price": item.price
                };
        };

    }




})();
