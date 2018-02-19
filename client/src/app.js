//faker is to generate data for testing, not needed if you have a stream of data to connect to
const libBS = require('faker');
//lodash is a great utility library for common functions native js doesnt do or do well
const _ = require('lodash');

//necessary angular stuff, material is angular-matrial, ngprettjson formats json data to be readable
var app = angular.module('appMain', ['ngMaterial','ngPrettyJson']).config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default').dark();
	});
app.controller('controllerMain', function($scope) {
  // $scope variables are what the template reads / watches
  $scope.title='Demo Client'; $scope.col2=false; $scope.stats={"total":0, "mac":0,"win":0};
  $scope.arrData=[];
  
  //$scope functions are the functions uysed by the template, they dont all have to be in $scope
  $scope.fnStartStream=function(){
  	$scope.title='Streaming'
  	//this will create random data to simulate, comment this out and use a real streaming protocol instead once configured
  	var objStream=setInterval(function(){
		var objMsg={
	  		"user":libBS.internet.userName(),
	  		"ip": libBS.internet.ip(),
	  		"agent": libBS.internet.userAgent(),
	  		"job": libBS.name.jobType()

	  	};
	  	$scope.fnOnMessage(objMsg);
	}, 1000);
  };
  $scope.fnOnMessage=function(objMsg){
  	//This is a function to be called on every message 
  	//console.log(objMsg);
  	if($scope.objButtons.filter.enabled===true){
  		// modify object, null if it shouldnt shown at all
  		$scope.fnFilter(objMsg);
  	}
  	if($scope.objButtons.transform.enabled===true){
  		// modify object, trasform
  		$scope.fnTransform(objMsg);
  	}
  	if($scope.objButtons.stats.enabled===true){
  		// add stat counts
  		$scope.fnStats(objMsg);
  	}
  	//add the data to the object that is being rendered
  	//unshift adds it to the beginning, push adds to the end. makes a difference on how you want to display and buffer
  	if(objMsg !== null){
  		//filtering might set it to null dont need to add those
  		$scope.arrData.unshift(objMsg);	
  	}
  	//this is a quirky thing with Angular to force it to re evaluate items watched.
  	$scope.$evalAsync();
  };
  $scope.fnFilter=function(objMsg){
  	//set what needs to be filtered. In the demo case we decide we don't need ip field or any record where user starts with A
  	if(objMsg.user.substring(0,1)==='A'){ objMsg=null }
  	else{ objMsg.ip=undefined; }
  };
  $scope.fnTransform=function(objMsg){
  	//add a field and populate it based on values in another one
  	var strSystem='Windows';
  	if(objMsg.agent.indexOf('Macintosh') > -1){ strSystem='Mac'; }
  	objMsg.system=strSystem;
  };
  $scope.fnStatsInit=function(){
  	$scope.col2=true;
  }
  $scope.fnStats=function(objMsg){
  	//keeping stats on the fly is very important in a high volume situation, you dont want to have to loop through an array every second to get a stat
  	if( objMsg.system==='Mac' ){ $scope.stats.mac++; }
  	if( objMsg.system==='Windows' ){ $scope.stats.win++; }
  	$scope.stats.total++;
  };
  $scope.bgProgress=function(intVal,intMax){ 
				var o={color:'#373b41',bgcolor:'#1d1f21'};
				return { 'background': 'linear-gradient(90deg, '+ o.color +' '+ ((intVal/intMax)*100).toFixed(2) +'%, '+ o.bgcolor +' '+ (1-(intVal/intMax)*100).toFixed(2) +'%)' };
			};
  //demo navigation buttons
  $scope.objButtons={
  	"stream":{"label":'start stream',"enabled":false,"icon":'fa-play',"fn":$scope.fnStartStream},
  	"filter":{"label":'filter',"enabled":false,"icon":'fa-filter',"fn":$scope.fnGraph},
  	"transform":{"label":'transform',"enabled":false,"icon":'fa-cogs',"fn":$scope.fnGraph},
  	"highlight":{"label":'highlight',"enabled":false,"icon":'fa-lightbulb',"fn":$scope.fnGraph},
  	"stats":{"label":'stats',"enabled":false,"icon":'fa-percent',"fn":$scope.fnStatsInit},
  	"chart":{"label":'chart',"enabled":false,"icon":'fa-chart-bar',"fn":$scope.fnGraph},
  	"graph":{"label":'graph',"enabled":false,"icon":'fa-share-alt',"fn":$scope.fnGraph}
  };
  
});