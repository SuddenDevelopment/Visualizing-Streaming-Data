# Components Chapter Code Examples

### keeping simple streaming stats
```javascript
var intMin=null, intMax=null, intTotal=0, intCount=0;
var objUniqueValues={};
var fnOnMessage=function(objMsg){
  //assuming objMsg.value is a number
  if(objMsg.value > intMax || intMax===null){
    intMax=objMsg.value;
  }
  if(objMsg.value < intMin || intMin===null){
    intMin=objMsg.value;
  }
  intTotal+=objMsg.value;
  intCount++;
  if(typeof objUniqueValues[objMsg.value] === 'undefined'){
    objUniqueValues[objMsg.value]=1;
  }else{
    objUniqueValues[objMsg.value]=++;
  }
}
```

### Example of keeping track of time windows
```javascript
var updateWindows = function(arrData, objStat){
  //console.log(arrData,objStat);
  //does a new bucket need to be created?
  //var intNow=Date.now(); //shouldnt be needed, can use ls
  if(objStat.windows.current.fs < objStat.ls-60000 ){
    //take current bucket, snapshot it to history
    objStat.windows.minute.push(objStat.windows.current);
    //re-init current bucket
    objStat.windows.current = 
      _.defaults({},objDefaults[objStat.type]());
    if(objStat.windows.hasOwnProperty('hour') 
      && objStat.windows.ts_hour < objStat.ls-360000){
      //loop through minutes and drop off anything older than an hour
      objStat.windows.minute = 
        _.filterOld(objStat.windows.minute, 'fs', 360000);
      //then take the remaining ones to aggregate into an hour
      objStat.windows.hour.push( 
        aggStats[objStat.type](objStat.windows.minute) 
      );
      objStat.windows.ts_hour = objStat.ls;
    }
    if(objStat.windows.hasOwnProperty('day') 
      && objStat.windows.ts_hour < objStat.ls-86400000){
      //loop through minutes and drop off anything older than an hour
      objStat.windows.hour = 
        _.filterOld(objStat.windows.hour, 'fs', 86400000);
      //then take the remaining ones to aggregate into an hour
      objStat.windows.day.push( 
        aggStats[objStat.type](objStat.windows.hour) 
      );
      objStat.windows.ts_day = objStat.ls;
    }      
  }
  //process current
  objStat.windows.current = 
    updateStats[objStat.type](arrData,objStat.windows.current);
  return objStat;
};
```

### Example Streaming Data population for multiple time increment horizontal bar chart
```javascript
//init the arrays
var arrDays=[], arrHours=[], arrMinutes=[], arrSeconds=[];
var iSeconds=0,iMinutes=0,iHours=0,iDays=0;

//small utility function to get the sum for an array
var fnSum=function(arrIn){
  var intSum=0;
  for(var i=0;i<arrIn.length;i++){ intSum+=arrIn[i]; }
  return intSum;
};

var fnOnMessage=function(intVal){
  //assuming 1 value and function call per second
  arrSeconds.push(intVal);
  if(iSeconds>59){
    //add minute
    var intSum=fnSum(arrSeconds);
    arrMinutes.push(intSum/60);
    iSeconds=0;
    if(iMinutes>59){
      //add hour
      var intSum=fnSum(arrSeconds);
      arrHours.push(intSum/3600);
      iMinutes=0;
      if(iHours>23){
        //add day
        var intSum=fnSum(arrSeconds);
        //divide by number of seconds to normalize to average/second
        arrDays.push(intSum/86400);
        iHours=0;
      }
      iHours++;
    }
    iMinutes++;
  }
  iSeconds++;
}
```

### Example Angular HTML to display multiple inline simple charts
```html
<div layout="row" layout-align="begin">
<div layout="column"  layout-align="end" flex="10">
    <div layout="row" layout-align="begin end" flex>
      <div ng-repeat="intVal in arrDays" 
        class="bar color4" 
        ng-style="{'height':intVal+'px'}" title="{{intVal}}" flex>
      </div>
    </div>
    <div> Days </div>
</div>
<div layout="column" layout-align="end" flex="15">
    <div layout="row" layout-align="begin end" flex>
      <div ng-repeat="intVal in arrHours" 
        class="bar color3" 
        ng-style="{'height':intVal+'px'}" 
        title="{{intVal}}" flex>
      </div>
    </div>
    <div> Hours </div>
</div>
<div layout="column" layout-align="end" flex="25">
    <div layout="row" layout-align="begin end" flex>
      <div ng-repeat="intVal in arrMinutes" 
        class="bar color2" 
        ng-style="{'height':intVal+'px'}" 
        title="{{intVal}}" flex>
      </div>
    </div>
    <div> Minutes </div>
</div>
<div layout="column" layout-align="end" flex="60">
    <div layout="row" layout-align="begin end" flex>
      <div ng-repeat="intVal in arrSeconds" 
        class="bar color1" 
        ng-style="{'height':intVal+'px'}" 
        title="{{intVal}}" flex>
      </div>
    </div>
    <div> Seconds </div>
</div>
</div>
```
