'use strict';

angular.module('myApp.main', ['ngRoute','myApp'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'index/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', [ function() {


}]);