(function(){
    'use strict';

    angular.module('app').factory('Categories', Categories);

    Categories.$inject = ["$resource"];

    function Categories ($resource) {
        return $resource ('/Categories/:id', {id: '@id'});
    }
})();
