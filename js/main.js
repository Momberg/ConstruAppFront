var app = angular.module('website', [
    'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {templateUrl: "templates/home.html", controller: "HomeCtrl"})
        .when("/menu", {templateUrl: "templates/menu.html", controller: "MenuCtrl"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");

        $locationProvider.hashPrefix('');
}]);