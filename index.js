//
/*

https://tswiki.atlassian.net/wiki/display/LABS/Useful+SQL+Queries

*/

var app=angular.module('mockups', ['ngMaterial','ngPrettyJson']);
app.controller('main',function($scope,$http){
$scope.objML={
	 classification:'Suspicious'
	,confidence:79
	,model:'K Means Clustering'
	,factors:['asn','geo','whois','risk','history','dns','activity','honeypots','network']
	,topFactors:[
		 {factor:'risk',influence:23}
		,{factor:'history',influence:21}
		,{factor:'dns',influence:12}
		,{factor:'honeypots',influence:7}
	]
}

$scope.arrRows=[
	['alignment','borders','color','size','icons']
	,['fonts','background','thickness','spacing','shape']
];

$scope.objClasses={
	 alignment:['left','right','center','left','right']
	,borders:['solid','double','dotted','dashed','groove']
	,color:['red','orange','yellow','green','blue']
	,size:['normal','small','large','tiny','xl']
	,icons:[]
	,fonts:['sans','serif','mono','normal','normal']
	,background:['bgred','bgorange','bgyellow','bggreen','bgblue']
	,thickness:['thin','thick','xthick','thick-left','thick-sides']
	,spacing:['normal','none','barely','equal','double']
	,shape:['normal','round','round-side','round-top']
};

$scope.layouts=['rows','columns','radar','adjacency','position'];

$scope.arrItems=[
{"place": {
    "country_code": "BR"
  },
  "text": "Relendo estes RPGs que estavam perdidos na minha estante. Quem gostaria de jogar uma sessão… https://t.co/BJXQci7YB6"
},{
  "place": {
    "country_code": "PH"
  },
  "text": "@kittyhalei24 ahahahahahhahaah grabe ka hard!"
},{
  "place": {
    "country_code": "US"
  },
  "text": "😪 https://t.co/sRqjsoH6GV"
},{
  "place": {
    "country_code": "VE"
  },
  "text": "Yo te quiero tener"
}
];

$scope.borders=['dotted','dashed','double','groove'];

});