(function(){
  'use strict';
  angular.module('app').controller('SpravinControllerDialog', SpravinControllerDialog);

  SpravinControllerDialog.$inject = ["$scope", "$rootScope", "$mdDialog", 'Ingridients', 'Categories'];
  function SpravinControllerDialog($scope, $rootScope, $mdDialog, Ingridients, Categories){
    $scope.cancel = function () {
      $mdDialog.hide();
    }
      $scope.categories = Categories.in.query({});
    if (typeof($rootScope.ig)!="undefined")
      Ingridients.in.get({id:$rootScope.ig},function(item){
        if (typeof(item.category) != "undefined")
        Categories.in.get({id:item.category.id},function(cat){
          item.category = cat;
          $scope.ingridient = item;
        });

      })
    $scope.save = function () {
      if ($scope.ingridient.category == null) {
        alert('Выберите из списка категорию');
        return;
      }
        $scope.ingridient.category = $scope.ingridient.category.id;
        var ingri = new Ingridients.in($scope.ingridient);
        ingri.$save().then(function (newIngri) {
          $scope.cancel();
        });
    };

    $scope.querySearch = function(query) {
      return Categories.auto.get({
        "search": query
      }).$promise.then(function(result) {
        return result.data;
      });
    }

  }


})();
