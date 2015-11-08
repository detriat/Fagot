/**
 * Created by Николай on 05.11.15.
 */
(function(){
    'use strict';

    angular.module('app').factory('Items', Items);

    Items.$inject = ["$resource"];

    function Items ($resource) {
        return $resource ('/Items/:id', {id: '@id'});
    }
})();