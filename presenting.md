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

