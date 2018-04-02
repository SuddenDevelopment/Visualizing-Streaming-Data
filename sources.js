
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
