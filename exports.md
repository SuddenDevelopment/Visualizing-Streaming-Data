# Exports Code Examples

```javascript
Convert a JSON object to a string
//assuming objConfig is the json object you want to convert
var strConfig = JSON.stringify(objConfig);

//the reverse process, when required
var objConfig=JSON.parse(strConfig);
```

### JSON Data Arrays Export
```javascript
var arrData=[];

var fnOnMessage=function(objMsg){
  arrData.unshift(objMsg);
}

var fnExportData=function(){
    var a = document.createElement("a");
    var strData=JSON.stringify(arrData);    
    var file = new Blob([strData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'export.json';
    a.click();
}
```
