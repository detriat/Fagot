(function(){
    'use strict';

    angular.module('app').factory('Ingridients', Ingridients);

    Ingridients.$inject = ["$resource"];

    function Ingridients ($resource) {
        return $resource ('/Ingridients/:id', {id: '@id'});
    }
})();