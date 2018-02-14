var app = angular.module('appMain', ['ngMaterial']).config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default').dark();
	});
app.controller('controllerMain', function($scope) {
  $scope.msg='Hello';
  $scope.fnStartStream=function(){
  	console.log('started');
  };
  //demo navigation buttons
  $scope.arrButtons=[
  	{"label":'start stream',"fn":$scope.fnStartStream},
  	{"label":'filter',"fn":$scope.fnGraph},
  	{"label":'transform',"fn":$scope.fnGraph},
  	{"label":'highlight',"fn":$scope.fnGraph},
  	{"label":'decorate',"fn":$scope.fnGraph},
  	{"label":'chart',"fn":$scope.fnGraph},
  	{"label":'graph',"fn":$scope.fnGraph}
  ];
  
});