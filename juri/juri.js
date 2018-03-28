'use strict';

angular.module('myApp.juri', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/juri', {
    templateUrl: 'index/main.html',
  }).when('/juri/:category', {
    templateUrl: 'juri/juri.html',
    controller: 'JuriCtrl'
  }).when('/screen/:category', {
    templateUrl: 'juri/screen.html',
    controller: 'ScreenCtrl'
  })

}])

.controller('JuriCtrl', [ '$scope','$http','$timeout','$routeParams','$localStorage','$interval','checker' ,function($scope, $http,$timeout, $routeParams,$localStorage,$interval,checker) {
 // alert("cda");
 $scope.name = "Juri";
 $scope.params = $routeParams;

 $scope.$storage = $localStorage.$default({
  name:'jakw',
  tick : 'stop',
  timesum : 0,
  category:'none'
});

 /* 
 $http.get("http://localhost/webintel/data/view.php")
  .then(function(response) {
    alert(sharedList.text());
      $scope.bro = response.data;
  });*/

  var time;
  var clock = $('.time').FlipClock({
    // ... your options here
    clockFace: 'MinuteCounter',
    autoStart:false,
    callbacks: {
      interval: function() {
        /*
        time = this.factory.getTime().time;
        if(time) {
          $scope.current = time;
          $scope.$storage.timesum  = time; 
          console.log('interval', $scope.current);
        }*/
      },
      stop: function() {
        // Do whatever you want to do here,
        // that may include hiding the clock 
        // or displaying the image you mentioned
        //resetGo();
      }

    }
   
  });

  clock.stop();
  clock.setCountdown(true);
  //clock.setTime($scope.$storage.timesum);
  /*$scope.$watch('current', function() {
    //alert("hell");
  });*/
  $scope.$storage.category = $scope.params.category
    $scope.start = function(tick){//set pause and start
      $scope.$storage.tick = tick;
      //alert($scope.$storage.tick);
      if(tick=="start"){
          //clock.setTime(token.timesum);
          clock.start();
        }else if(tick=="pause"){
          clock.stop();
          //alert(clock.getTime());
        }
    }
    

    $scope.minutes = 3;$scope.seconds = 0
    
    $scope.toSecs = function() {
      var minutes = $scope.minutes || 0;
      var seconds = $scope.seconds || 0 ;

      var timesum =  minutes*60 + seconds;

      $scope.$storage.timesum = timesum;
      clock.setTime(timesum);
      $scope.start("pause");
      
      console.log(timesum)
    };

    $scope.toSecs();

 /*   
    $scope.$watch(function() {
      return angular.toJson($scope.$storage);
    }, function() {

      console.log($scope.$storage.timesum);
        clock.setTime($scope.$storage.timesum);
    });
*/
/**/
    function updateTime() {
      //console.log($scope.$storage.timesum);
      //clock.setTime($scope.$storage.timesum);
      $scope.$storage.timesum = clock.getTime().time+1;
    }

    $interval(updateTime, 1000);

//display radio list
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


}])
.controller('ScreenCtrl', [ '$scope','$http','$timeout','$routeParams','$localStorage', '$interval' ,function($scope, $http,$timeout,$routeParams,$localStorage,$interval ) {
  // alert("cda");
  $scope.name = "Screen";
   $scope.params = $routeParams;
   $scope.output = localStorage.test;

   var sound = document.getElementById("sound"); 

   var clock = $('.time').FlipClock({
    // ... your options here
    clockFace: 'MinuteCounter',
    autoStart:false,
    callbacks: {
      interval: function() {
        /*
        time = this.factory.getTime().time;
        if(time) {
          $scope.current = time;
          $scope.$storage.timesum  = time; 
          console.log('interval', $scope.current);
        }*/
      },
      stop: function() {
        // Do whatever you want to do here,
        // that may include hiding the clock 
        // or displaying the image you mentioned
        //resetGo();
      }

    }
   
  });

  clock.stop();
  clock.setCountdown(true);

  
		$scope.$storage = $localStorage.$default({
      tick : 'stop',
      timesum : 0
    });
    
    //clock.setTime($scope.$storage.timesum);
    
    $scope.$watch(function() {
      return angular.toJson($scope.$storage);
    }, function() {
      /*  
      if($scope.$storage.tick=="start" && prev != "start"){
          //clock.setTime(token.timesum);
          //console.log("st");
          //clock.start();
          prev = "start";
        }else if($scope.$storage.tick=="pause" && prev != "pause"){
          //console.log("pau");
          //clock.stop();
          prev = "pause";
        //  clock.setTime( $scope.$storage.curtime);
        }*/
        
    
          if( $scope.$storage.category  ==  $scope.params.category){
            
        
          //clock.setTime($scope.$storage.timesum);
      
          if($scope.$storage.timesum<=1 && $scope.$storage.tick=="start" ){
           // alert("stop");
            $scope.$storage.timesum = 0;
            $scope.$storage.tick="pause";
            sound.play();
          }
  

            //if($scope.$storage.tick == "pause"){
             // clock.setTime($scope.$storage.timesum+1);
             // }else{
                clock.setTime($scope.$storage.timesum);
             // }

          }
        
      
    });
/*
    var prev;
     // used to update the UI
     function updateTime() {

      console.log($scope.$storage.tick);
      if($scope.$storage.tick=="start" && prev != "start"){
        //clock.setTime(token.timesum);
        console.log("st");
        clock.start();
        prev = "start";
      }else if( ($scope.$storage.tick=="pause" || $scope.$storage.tick=="begin")  && prev != "pause"){
        console.log("pau");
        clock.stop();
        prev = "pause";
      //  clock.setTime( $scope.$storage.curtime);
      }
      
      if($scope.$storage.tick != "begin"){
        $scope.$storage.timesum = clock.getTime().time;
        console.log($scope.$storage.timesum);
      }
      
    }

    $interval(updateTime, 1000);*/

/*
$scope.start = function(tick){//set pause and start
  if(tick=="start"){
   //clock.setTime(token.timesum);
   clock.start();
 }else if(tick=="pause"){
   clock.stop();
    //alert(clock.getTime());
 }
 $storage.tick == tick;

}*/

var loadTime = 4000, //Load the data every second
errorCount = 0, //Counter for the server errors
loadPromise; //Pointer to the promise created by the Angular $timout service
var Waiting;

$scope.validator = {current:"checked"}
var getWaiting = function() {
 $http.get("data/wait/screen.php?cat="+$scope.params.category).then(function (response) {
   $scope.waiting = response.data
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
 
 }])