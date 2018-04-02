###  Split stream example, simple round robin

```javascript

//set stream count
var intStreams=4;
//current stream
var intCurrentStream=1;
var fnOnMessage=function(objMsg){
  //assuming this function will send to the stream specified
  fnSendMessage(intCurrentStream,objMsg);
  //update the stream pointer
  if(intCurrentStream === intStreams){
    //reset
    intCurrentStream=1;
  }else{
    //increment
    intCurrentStream++;
  }
}

```
### Stream sort / map example
```javascript

var objMap={
  "production":1,
  "development":2,
  "staging":3,
  "certification":4
};
var fnOnMessage(objMsg){
  //assuming this function will send to the stream specified
  //map the environment data by the map
  fnSendMessage(objMap[objMsg.environment],objMsg);
}

```
### Sort by schema example
```javascript

//properties to look for in an object
var objMap={
  "ip":1,
  "url":2,
  "sha256":3,
  "regex":4
};
var arrFields=Object.keys(objMap);
var fnOnMessage(objMsg){
  var fFound=false;
  var intStream=0;
  for(var i=0;i<arrFields.length;i++){
    if(fFound===false && 
      typeof objMsg[arrFields[i]] !== 'undefined'){
      intStream=objMap[arrFields[i]];
      //stop on first one found
      fFound=true;
    }
  }
  //assuming this function will send to the stream specified
  fnSendMessage(intStream,objMsg);
}

```
