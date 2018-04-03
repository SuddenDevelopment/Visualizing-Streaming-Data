# Dashboard Code Examples

### Columns Example in Angular
```html
<div layout="row">
  <div flex>column1</div>
  <div flex>column2</div>
</div>
<!-- or if you have an array arrColumns that defines columns -->
<div layout="row">
  <div ng-repeat="objCol in arrColumns" flex> {{objCol}} </div>
</div>
```

### Rows Example in Angular
```html
<div layout="column">
  <div flex>row1</div>
  <div flex>row2</div>
</div>
<!-- or if you have an array arrRows that defines columns -->
<div layout="column">
  <div ng-repeat="objRow in arrRows" flex> {{objRow}} </div>
</div>
```

### Recursive function to create hierarchical containers in javascript
```javascript
/*
Example data structure, with infinite depth
{
   id:'parent id'
,kids:[
     {id:'kid1'}
    ,{id:'kid2',kids:[
      {id:'grandkid'}
    ]}
]
}
*/

var fnCreateLayout=function(objConfig){
//recursive function, calls itself for each child and so do they
self.last_updated=Date.now();
//find the current item
var objElement = document.getElementById(objConfig.id);
//determine layout direction, alternating rows and columns
if( typeof objConfig.layout === 'undefined'){
    if( objElement.clientWidth > objElement.clientHeight )
      { objConfig.layout='dashboard-columns'; }
    if( objElement.clientWidth < objElement.clientHeight )
      { objConfig.layout='dashboard-rows'; }
}
//add a subcontainer for kids
var objKids = document.createElement('div');
objKids.setAttribute('class','dashboard-kids '+objConfig.layout);
objElement.appendChild(objKids);
//add the kids
for(var i=0; i<objConfig.kids.length; i++){
    // add ancestry
    //add element
    var objKid = document.createElement('div');
    objKid.setAttribute('id', objConfig.kids[i].id);
    objKids.appendChild(objKid);
    //if child is missing states, copy them.
    if(typeof objConfig.kids[i].states === 'undefined' 
      || objConfig.kids[i].states.length === 0){ 
        objConfig.kids[i].states=objConfig.states; 
      }
    //call self for the created kid node
   fnCreateLayout(objConfig.kids[i]);
}
return objElement;
```

### move columns by manipulating the array they are build from
```javascript
var arrColumns=[{ id:1 },{ id:2 },{ id:3 }];
//add a new column to the end
arrColumns.push({id:4});
//remove a column from the beginning
arrColumns.shift();
```
### move columns by manipulating the array they are build from
```html
<div layout="row">
  <div ng-repeat="objCol in arrColumns"> 
    column {{objCol.id}}
  </div>
</div>
```

