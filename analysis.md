# Analysis Code Examples

### Detecting unexpected data fields
```javascript
var objTemplate={ ip:['ip'], md5:['md5'] }
var fnCompareSchema=function(objMsg){
  var arrKeys=Object.keys(objMsg);
  for(var i=0;i<arrKeys.length;i++){
    if(typeof objTemplate[arrKeys[i]] === 'undefined'){
      //this is a new field, do something about it here
    }
  }
};
```

### Detect new data type values
```javascript
var objTemplate={ ip:['ip'], md5:['md5'] }
var arrDataTypes=objDataTester.test(objMsg.ip);
for(var i=0;i<arrDataTypes.length;i++){
  if(objTemplate.ip.indexOf(arrDataTypes[i]) === -1){
    //this data type isn't in the template
    console.log('new data type in msg',arrDataTypes[i]);
  }
}
```

### look for unique values
```javascript
var arrKnownValues=['127.0.0.1','75.75.75.75','8.8.8.8'];
if(arrKnownValues.indexOf(objMsg.ip) === -1){
  //this value is not in the known array of values
  console.log('new value:',objMsg.ip);
}
```
