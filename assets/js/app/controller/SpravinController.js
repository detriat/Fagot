(function () {
    'use strict';

    var app = angular.module('app').controller('SpravinController', SpravinController);
    SpravinController.$inject = ["$scope", "Ingridients", "$mdDialog", 'Categories'];

    function SpravinController($scope, Ingridients, $mdDialog, Categories) {
        $scope.ingridients = Ingridients.query();
        $scope.categories = Categories.query();
        $scope.ingri = "";
        $scope.add = function (ev) {
           $mdDialog.show({
             controller: 'SpravinControllerDialog',
             templateUrl: 'view/sprav_in_dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose: false
           }).then(function(){

           }, function(err){
             console.log(err);
           });
        };
        $scope.add_category = function (ev) {
           $mdDialog.show({
             controller: 'CategoryControllerDialog',
             templateUrl: 'view/categoryDialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose: false
           }).then(function(){

           }, function(err){
             console.log(err);
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
