# Processing

### Processing in batches of 1 second.
```javascript
var arrBatch=[];
var intTimeStart=Date.now();
var intLimit=1000;
var fnOnMessage=function(objMsg){
  var intNow=Date.now();
  arrBatch.unshift(objMsg);
  if(intNow>intTimeStart+intLimit){
    intTimeStart=intNow;
    fnProcessBatch();
  }
}
var fnProcessBatch=function(){
  for(var i=0;i<arrBatch.length;i++){
    //process each record
  }
}
```

### API lookup example
```javascript
var strIp = objMsg.ip;
var objConfig={
  'url':
  "https://www.threatcrowd.org/searchApi/v2/ip/report/?ip="+strIp
};
if(strIp!=='127.0.0.1'){
  $http(objConfig).then(
    function fnSuccess(objResponse){
    //add the api response to the data
    objMsg.api={objResponse};
  },
    function fnError(objResponse){}
  );
}
```

### normalize the data structure, add defaults when missing
```javascript
var objTemplate={ip:'127.0.0.7',system:'unknown'};
var arrTemplateKeys=Object.keys(objTemplate);
var fnOnMessage=function(objMsg){
  for(var i=0;i<arrTemplateKeys.length;i++){
    if(typeof objMsg[arrTemplateKeys[i]] === 'undefined'){
      //this expected field doesnt exist, add it with default val
      objMsg[arrTemplateKeys[i]]=objTemplate[arrTemplateKeys[i]];
    }
  }
}
```

### Example use of JSON Collection Decorator
```javascript
var objConfig={
   filters:[
     { path:"path.to.key",op:"eq",val:"value to match" }
   ]
,decorate:[
    {
      find:[{ path:"path.to.key",op:"eq",val:"value to match" }]
      ,do:[{ path:"path.to.key",act:"set",val:"value to set" }]
    },{
      ,find:{ path:"path.to.key",op:"eq",val:"value to match" }
      ,do:{path:"path.to.key",act:"stack"
        ,val:"value to add to array" }
    }
]
}

arrResults = decorate(objConfig,arrCollection);
```

### Example of cumulative stats in javascript
```javascript
//define whats being pushed into the array
var intData=42;
//update the stats
intCount++;
intSum=intSum+intData;
if(intData > intMax){ intMax=intData; }
if(intData < intMin){ intMin=intData; }
intMean = intSum/intCount;
```

### Example sampling logic
```javascript
var intSample=10;
var intCount=0;
//call the sampling function every time
var fnSample=function(objMsg){
  intCount++;
  if( intCount%intSample===0){
    //the nth count, fire the function to process
    fnOnMessage(objMsg);
  }
};
```

### Example throttle logic
```javascript
var intCap=1000;
var intCount=0;
var intStart=Date.now();
//call the throttling function every time
var fnThrottle=function(objMsg){
  var intNow=Date.now();
  //see if it's in a new time increment
  if(intNow>intStart+1000){ intStart=intNow; intCount=0; }
  else{ intCount++; }
  if( intCount < intCap){
    //only run if under the cap per timeperiod
    fnOnMessage(objMsg);
  }
};
```

