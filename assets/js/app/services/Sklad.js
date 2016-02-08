(function(){
    'use strict';

    angular.module('app').factory('Sklad', Sklad);

    Sklad.$inject = ["$resource"];

    function Sklad ($resource) {
      return {
          list: $resource ('/Sklad/list/:id', {id: '@id'}),
          in: $resource ('/Sklad/:id', {id: '@id'})
      };
    }
})();
