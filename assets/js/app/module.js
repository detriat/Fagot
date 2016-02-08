(function(){
    'use strict';

    angular.module('app',[
        'ngRoute',
        'ngResource',
        'ngMaterial',
        'ngMdIcons',
        'ngCookies',
        'ngMessages',
        'angular-loading-bar',
        'ngAnimate',
        'md.data.table',
    //    'angular.filter'
    ]).config(appConfig);

    appConfig.$inject = ["$routeProvider"];
    function appConfig($routeProvider){

        $routeProvider
            .when('/',{
            templateUrl: "view/home.html",
            controller: 'HomeController'

            })
            .when('/ingri',{

            templateUrl: "view/sprav_in.html",
            controller: 'SpravinController'

            })
            .when('/kalky',{

                templateUrl: "view/sprav_ka.html",
                controller: 'SpravkaController'

            })
            .when('/naklav',{

                templateUrl: "view/naklav.html",
                controller: 'NaklavController'

            })
            .when('/kasa',{

                templateUrl: "view/kasa.html",
                controller: "KasaController"

            })
            .when('/itog',{

                templateUrl: "view/itog.html",
                controller: "itogController"

            })
            .when('/post',{

                templateUrl: "view/post.html",
                controller: "PostController"

            })
            .otherwise({
            redirectTo: '/'
        })
    }


})();
