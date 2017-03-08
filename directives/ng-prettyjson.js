(function(angular) {
'use strict';

angular.module('ngPrettyJson', [])
.directive('prettyJson', ['$compile', '$templateCache', 'ngPrettyJsonFunctions', 
  function (compile, templateCache, ngPrettyJsonFunctions) {

  var isDefined = angular.isDefined;

  return {    
    restrict: 'AE',
    scope: {
      prettyJson: '=',
      tags: '='
    },
    template: '<div></div>',
    replace: true,      
    link: function (scope, elm, attrs) {
      var currentValue = {}, editor = null, clonedElement = null,i=0,ii=0;

      scope.id = attrs.id || 'prettyjson';
      // compile template
      var e = compile(templateCache.get('ng-prettyjson/ng-prettyjson-panel.tmpl.html'))(scope, function(clonedElement, scope) {          
        scope.tmplElt = clonedElement;        
      });
      
      elm.removeAttr("id");
      //put the new item in the container
      elm.append(e);
      //console.log(scope.tags);
      // prefer the "json" attribute over the "prettyJson" one.
      // the value on the scope might not be defined yet, so look at the markup.
      var exp = 'prettyJson',
      highlight = function highlight(value) {
        //get the css classes to add
        var strClasses='';
        if(typeof value !== 'undefined' && typeof value._styles !== 'undefined' && value._styles.constructor === Array && value._styles.length > 0){ 
          //convert from an array in the object to a space separated string
          strClasses=value._styles.join(' ');
          //apply to the div
          //console.log(strClasses);
          scope.tmplElt.addClass(strClasses);
        }
        //look for recordque to add
        //TODO: this shoudl call recordque instead of manually embedding it

        var htmlStyle = '';
        if(typeof value !== 'undefined' && typeof value._score !== 'undefined'){
          htmlStyle = 'background: linear-gradient(90deg, rgb(55, 59, 65) '+((value._score/100)*100).toFixed(2)+'%, rgb(29, 31, 33) '+(1-(value._score/100)*100).toFixed(2)+'%);';
          //console.log(htmlStyle);
        }

        //add icons for tags that are defined
        var htmlIcons = '';
        if(typeof value !== 'undefined' && typeof value._tags !== 'undefined' && scope.tags !== 'undefined'){
          //loop through item tags
          for(i=0;i<value._tags.length;i++){

                //match found, add the defined icon
                htmlIcons=htmlIcons+'<i class="fa fa-'+value._tags[i]+' fa-xl"></i>';
          }
        }

        var html = ngPrettyJsonFunctions.syntaxHighlight(value) || "";
        //add the brackets highlighting
        
        html = html
        .replace(/\{/g, "<span class='sep'>{</span>")
        .replace(/\}/g, "<span class='sep'>}</span>")
        .replace(/\[/g, "<span class='sep'>[</span>")
        .replace(/\]/g, "<span class='sep'>]</span>")
        .replace(/\,/g, "<span class='sep'>,</span>");
        
        //s there a _recordque to render
        if(htmlIcons!==''){ html = html + htmlIcons; }
        //add in the style property based on _score for backfround fill
        scope.tmplElt.find('pre').attr('style',htmlStyle);                   
        //return isDefined(value) ? scope.tmplElt.find('pre').html(html) : scope.tmplElt.find('pre').empty();
        return scope.tmplElt.find('pre').html(html);
      },
      objWatch;

      objWatch = scope.$watch(exp, highlight, false);
    }
  };
}])
// mostly we want to just expose this stuff for unit testing; if it's within the directive's
// function scope, we can't get to it.
.factory('ngPrettyJsonFunctions', function ngPrettyJsonFunctions() {

  // cache some regular expressions
  var rx = {
    entities: /((&)|(<)|(>))/g,
    json: /"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|(null))\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
  };

  // mapping of chars to entities
  var entities = ['&amp;','&lt;','&gt;'];

  // lookup of positional regex matches in rx.json to CSS classes
  var classes = ['number','string','key','boolean','null'];

  var fnReplace = function(k,v){
        //properties to filter out
        //TODO abstract these to be inputs into the directive
        if(k==='_score' || k==='_id' || k==='_column' || k==='_styles'|| k==='_image' || k==='_event' || k==='_text' || k==='_recordque' || k==='$$hashKey'){ return undefined; }else{return v;}
      };

  /**
   * @description Used by {@link makeEntities} and {@link markup}.  Expects all arguments
   * to be nonempty strings.
   * @private
   * @returns {number} Index of last nonempty string argument in list of arguments.
   */
   var reverseCoalesce = function reverseCoalesce() {
    var i = arguments.length - 2;
    do {
      i--;
    } while (!arguments[i]);
    return i;
  };

  /**
   * @description Callback to String.prototype.replace(); marks up JSON string
   * @param {string|number} match Any one of the below, or if none of the below, it's a number
   * @returns {string} Marked-up JSON string
   */
   var markup = function markup(match) {
    var idx;
      // the final two arguments are the length, and the entire string itself;
      // we don't care about those.
      if (arguments.length < 7) {
        throw new Error('markup() must be called from String.prototype.replace()');
      }
      idx = reverseCoalesce.apply(null, arguments);
      return '<span class="' + classes[idx] + '">' + match + '</span>';
    };

  /**
   * @description Finds chars in string to turn into entities for HTML output.
   * @returns {string} Entity-ized string
   */
   var makeEntities = function makeEntities() {
    var idx;
    if (arguments.length < 5) {
      throw new Error('makeEntities() must be called from String.prototype.replace()');
    }
    idx = reverseCoalesce.apply(null, arguments);
    return entities[idx - 2];
  };

  /**
   * @description Does some regex matching to sanitize for HTML and finally returns a bunch of
   * syntax-highlighted markup.
   * @param {*} json Something to be output as pretty-printed JSON
   * @returns {string|undefined} If we could convert to JSON, you get markup as a string, otherwise
   * no return value for you.
   */
   var syntaxHighlight = function syntaxHighlight(json) {
    if (!angular.isString(json))
      json = JSON.stringify(json, fnReplace, 2);
    if (angular.isDefined(json)) {
      return json.replace(rx.entities, makeEntities)
      .replace(rx.json, markup);
    }
  };

  return {
    syntaxHighlight: syntaxHighlight,
    makeEntities: makeEntities,
    markup: markup,
    rx: rx
  };
});

})(window.angular);
(function(angular) {
'use strict';

  angular.module('ngPrettyJson')
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('ng-prettyjson/ng-prettyjson-panel.tmpl.html',
    '<div>' + 
    '<pre class="pretty-json" id="{{id}}"></pre>' +                        
    '</div>');
  }]);

})(window.angular);
