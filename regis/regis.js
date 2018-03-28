'use strict';

angular.module('myApp.regis', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/regis', {
    templateUrl: 'index/main.html',
  }).when('/regis/:category', {
    templateUrl: 'regis/regis.html',
    controller: 'RegisCtrl'
  })

}])
//,'sharedList',sharedList
.controller('RegisCtrl', ['$scope','$routeParams' ,'$http','$timeout','checker', function($scope,$routeParams,$http,$timeout,checker) {

 // alert( sharedList.getText() ); 
 $scope.name = 'Registrasi';
 $scope.params = $routeParams;
 $scope.choice = ['A','B'];
 $scope.base = [];
 $scope.selected =[];

 
 $scope.getValue = function(base,info){//set pause and start
  $scope.selected[base] = info;
}


 $http.get("data/regis/view.php?cat="+$scope.params.category).then(function (response) {
  $scope.peserta = response.data;
  console.log(response.data);
  $scope.selectorA = { peserta: response.data, category :$scope.params.category ,box: 1};
  $scope.selectorB = { peserta: response.data, category :$scope.params.category ,box: 2};
  //console.log($scope.choice[0]);
})

 /*
var getData = function() {
  $http.get("data/regis/view.php?cat="+$scope.params.category).then(function (response) {
    $scope.peserta = response.data;
    console.log(response.data);
    //console.log($scope.choice[0]);
  
   errorCount = 0;
   nextLoad();
 })

 .catch(function(res) {
   $scope.data = 'Server error';
   nextLoad(++errorCount * 2 * loadTime);
 });

};
*/

$scope.setNow = function(id,cat) {
  checker.setNow(id,cat);
};

$scope.DeleteNow = function(id) {
  checker.DeleteNow(id);
};

var loadTime = 2000, //Load the data every second
 errorCount = 0, //Counter for the server errors
 loadPromise; //Pointer to the promise created by the Angular $timout service
 var Waiting;

var getWaiting = function() {
  $http.get("data/wait/view.php?cat="+$scope.params.category).then(function (response) {
    $scope.waiting = {peserta : response.data, checked : "checked"};
   // $scope.waitingB = response.data.B;
    console.log(response.data);
    
   errorCount = 0;
   nextLoad();
 })

 .catch(function(res) {
   $scope.data = 'Server error';
   nextLoad(++errorCount * 2 * loadTime);
 });

};

//function
var cancelNextLoad = function() {
 //$timeout.cancel(loadPromise);
 $timeout.cancel(Waiting);
};

var nextLoad = function(mill) {
 mill = mill || loadTime;

 //Always make sure the last timeout is cleared before starting a new one
 cancelNextLoad();
 //loadPromise = $timeout(getData, mill);
 Waiting = $timeout(getWaiting, mill);
};


//Start polling the data from the server
getWaiting();
//getData();



//Always clear the timeout when the view is destroyed, otherwise it will keep polling and leak memory
$scope.$on('$destroy', function() {
 cancelNextLoad();
});


    $scope.ConfirmTeam = function(){//set pause and start
      
      if($scope.selected[1].NoPeserta == $scope.selected[2].NoPeserta){
        alert("Tim tidak boleh kembar");
      }else{
        //alert( $scope.selected[1].NoPeserta+ $scope.selected[2].NoPeserta);
         // use $.param jQuery function to serialize data from JSON 
         var data = $.param({
          A : $scope.selected[1].NoPeserta,
          B : $scope.selected[2].NoPeserta,
          kategori: $scope.selected[1].kategori,
          });
      
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          }

          $http.post('data/regis/insert.php', data, config).then(function (response) {
            alert(response.data);
          });

      }

     
    }

    

}])
.directive('baseSelector', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      side: '=base',
      call: '&'
    },
    templateUrl: 'regis/selection.html',
    link: function(scope) {

      scope.itemClick = function(base,info) {
          //scope.current = value;
        scope.call({$base: base,$info:info });
      }
    }
  };
})




