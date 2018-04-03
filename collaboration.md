# Collaboration Code Examples

### Example API call in Angular 1.x
```javascript
var objConfig={
  'url':
  "https://www.threatcrowd.org/searchApi/v2/ip/report/?ip="+strIp
};

$http(objConfig).then(
  function fnSuccess(objResponse){
  //do this with what's returned

},
  function fnError(objResponse){}
);
```
