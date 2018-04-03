# Presenting Data

### Batch everything in a timeframe, then process.
```javascript
// a time reference is needed to keep track of batches.
var intBatchStartTime=Date.now();
// an array to hold the batches
var arrBatch=[];
//a function to be called on events
var fnOnEvent=function(objEvent){
  var intNow=Date.now();
  //always add the event to the batch
  arrBatch.push(objEvent);
  if(intBatchStartTime+1000<intNow){
    //time to process call the function that processes
    //note that if the array isnt copied it will have a race condition
    fnProcessBatch(arrBatch);
    //reset the batch
    arrBatch=[];
    intBatchStartTime=intNow;
  }
}
```

### Tail a log file with node-tail
```javascript
//watch a file
tail = new Tail("fileToTail");
//fire every time a new line comes in
tail.on("line", function(strLine) {
  //call your defined function for the event
  //note: in most cases you'll need to parse the string
  fnOnEvent(strLine);
});
```

### Records per second
```javascript
//use set interval for timing, this var will be a reference to it
var objThrottle={};
//assuming arrRecords is a collection of records
objThrottle=setInterval(function(){
  //assuming fnSendRecord is the function to run for each record
  fnSendRecord(arrRecords[intIndex]);
  if(intIndex===intRecords-1){ clearInterval(objThrottle); }
  else{ intIndex++; }
}, intDelay);
```

### Set a Time To Live
```javascript
//assume objMsg is already defined
//in this scenario a severity property is already present as a number
if(typeof objMsg.severity === 'number'){
  //need a timestamp as a point of reference
  objMsg.timestamp=Date.now();
  //ttl is set in milliseconds
      objMsg.ttl=objMsg.severity*60000;
}
```

### Timing Out
```javascript
//run inside a function that scans all persistent objects
//get the current timestamp
var intNow = Date.now();
// arrObjects as a collection of objects
 for(var i=0;i<arrobjects.length;i++){ 
 if(arrObjects[i].timestamp+arrObjects[i].ttl < intNow){
   //this is past the timeout threshold
   //call whatever function is defined to remove the timed out object
   fnRemove(arrObjects[i]);
 }
}
```

### Time in State
```javascript
//run inside a function that scans all persistent objects
//get the current timestamp
var intNow = Date.now();
// arrObjects as a collection of objects
 for(var i=0;i<arrobjects.length;i++){
if(arrObjects[i].timestamp+arrObjects[i].ttl < intNow){
   //this is past the timeout threshold
   //call whatever function is defined to remove the timed out object
   if(arrObjects[i].severity > 0)
   { 
     //reduce the severity and recalc the ttl
     arrObjects[i].severity--; 
     arrObjects[i].ttl=objMsg.severity*60000;
   }else{
     fnRemove(arrObjects[i]);
   }
 }
}
```

