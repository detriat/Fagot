(function(){
    'use strict';

    var myapp = angular.module('app',[
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ngMdIcons'
    ]);

    myapp.config(appConfig);
    myapp.config(['$controllerProvider', function($controllerProvider) { $controllerProvider.allowGlobals(); }]);
    appConfig.$inject = ["$routeProvider"];

    function appConfig($routeProvider){

        $routeProvider
            .when('/',{
            templateUrl: "view/home.html",
            controller: 'HomeController'

            })
            .when('/ingri',{

            templateUrl: "view/sprav_in.html"
            //controller: 'SpravinController'

            })
            .when('/kalky',{

                templateUrl: "view/sprav_ka.html",
                //controller: 'SpravkaController'

            })
            .when('/sklad',{

                templateUrl: "view/sklad.html",
                //controller: 'SkladController'

            })
            .when('/kasa',{

                templateUrl: "view/kasa.html"

            })
            .when('/itog',{

                templateUrl: "view/itog.html"

            })
            .otherwise({
            redirectTo: '/'
        })
    }

})();

