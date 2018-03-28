'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.regis',
  'myApp.juri',
  'ui.bootstrap',
  'ngStorage'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}])
.controller('MyController', ['$scope', 'notify', function($scope, notify) {
  $scope.callNotify = function(msg) {
    notify(msg);
  };
  $scope.choice = ["sfs","sfs"];
 // alert(sharedList.text());
}])
.directive('waitList', function() {
  return {
    restrict: 'E',
    scope: {
      waiting: '=',
      call:'&',
      del:'&'
    },
    templateUrl: 'regis/listwaiting.html',
    link: function(scope) {

      scope.itemClick = function(id,cat) {
          //scope.current = value;
        scope.call({$id: id,$cat:cat});
      }

      scope.itemDelete = function(id) {
        //scope.current = value;
      scope.del({$id: id});
    }
    }
  };
})
.service('checker', function($http) {

  this.setNow = function(id,cat){//set pause and start
      
    alert(cat);
    
    var data = $.param({
      id : id,
      cat:cat
      });
  
      var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
      }
  
      $http.post('data/wait/current.php', data, config).then(function (response) {
       // alert(response.data);
      });
  }

  this.DeleteNow = function(id){//set pause and start
    
    var data = $.param({
      id : id
      });
  
      var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
      }
  
      $http.post('data/wait/delete.php', data, config).then(function (response) {
        alert(response.data);
      });
  }



});

/*
.factory('notify', ['$window', function(win) {
  var msgs = [];
  return function(msg) {
    msgs.push(msg);
    if (msgs.length === 3) {
      win.alert(msgs.join('\n'));
      msgs = [];
    }
  };
}])
.factory('sharedList', function() {
  var list = [];

  return {
    addItem: addItem,
    getList: getList,
    getText:getText
  };

  function addItem(item) {
    list.push(item);
  }

  function getList() {
    return list;
  }
  function getText(){
    return "fws";
  }
});
*/




