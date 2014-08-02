var myApp = angular.module('plumbApp.directives', []);


myApp.factory('plumbOptions', function(){
    return {
        'connectorPaintStyle':{
            lineWidth:4,
            strokeStyle:"#61B7CF",
            joinstyle:"round",
            outlineColor:"white",
            outlineWidth:2
        },
        'connectorHoverStyle': {
            lineWidth:4,
            strokeStyle:"#216477",
            outlineWidth:2,
            outlineColor:"white"
        },
        'endpointHoverStyle': {
            fillStyle:"#216477",
            strokeStyle:"#216477"
        },
        // the definition of source endpoints (the small blue ones)
        'sourceEndpoint': {
            endpoint:"Dot",
            paintStyle:{
                strokeStyle:"#7AB02C",
                fillStyle:"transparent",
                radius:7,
                lineWidth:3
            },
            isSource:true,
            connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ],
            connectorStyle:this.connectorPaintStyle,
            hoverPaintStyle:this.endpointHoverStyle,
            connectorHoverStyle:this.connectorHoverStyle,
            dragOptions:{}
//            overlays:[
//                [ "Label", {
//                    location:[0.5, 1.5],
//                    label:"Drag",
//                    cssClass:"endpointSourceLabel"
//                } ]
//            ]
        },
        // the definition of target endpoints (will appear when the user drags a connection)
        'targetEndpoint': {
            endpoint:"Dot",
            paintStyle:{ fillStyle:"#7AB02C",radius:11 },
            hoverPaintStyle: this.endpointHoverStyle,
            maxConnections:-1,
            dropOptions:{ hoverClass:"hover", activeClass:"active" },
            isTarget:true,
//            overlays:[
//                [ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
//            ]
        }
    };
});



myApp.directive('jsPlumbCanvas', function(){
   var jsPlumbZoomCanvas = function(instance, zoom, el, transformOrigin) {
       transformOrigin = transformOrigin || [ 0.5, 0.5 ];
       var p = [ "webkit", "moz", "ms", "o" ],
           s = "scale(" + zoom + ")",
           oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";
       for (var i = 0; i < p.length; i++) {
           el.style[p[i] + "Transform"] = s;
           el.style[p[i] + "TransformOrigin"] = oString;
       }
       el.style["transform"] = s;
       el.style["transformOrigin"] = oString;
       instance.setZoom(zoom);
   };

   var def = {
       restrict: 'E',
       scope: {
           onConnection: '=onConnection',
           zoom: '=',
           x: '=',
           y: '='
       },
       controller: function ($scope) {
           this.scope = $scope;
       },
       transclude: true,
       template: '<div ng-transclude></div>',
       link: function(scope, element, attr){

           var instance = jsPlumb.getInstance();
           scope.jsPlumbInstance = instance;

           instance.bind("connectionDrag", function(connection, originalEvent) {
               console.log("connectionDrag " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
               console.log("connectionDrag", connection, originalEvent);
           });

           instance.bind("connectionMoved", function(params) {
               console.log("connection " + params.connection.id + " was moved");
           });

           instance.bind("connection", function(info, origEvent) {
                if(typeof origEvent !== 'undefined' && origEvent.type == 'drop'){
                   console.log("[connection] event in jsPlumbCanvas Directive [DRAG & DROP]", info, origEvent);
                    var targetUUID = $(info.target).attr('uuid');
                    var sourceUUID = $(info.source).attr('uuid');
                   scope.onConnection(instance, info.connection, targetUUID, sourceUUID);
                }
            });


           $(element).css({
               minWidth: '1000px',
               minHeight: '1000px',
               display: 'block',
           }).draggable({
               stop: function(event, ui) {
                   var position = $(this).position();
                   scope.x = position.left;
                   scope.y = position.top;
                   scope.$parent.$apply();
               }
           });

           instance.setContainer($(element));

           var zoom = (typeof scope.zoom === 'undefined') ? 1 : scope.zoom/100;
           jsPlumbZoomCanvas(instance, zoom, $(element)[0]);

           scope.$watch('zoom', function(newVal, oldVal){
               jsPlumbZoomCanvas(instance, newVal/100, $(element)[0]);
           });
//           scope.$watch('x', function(newVal, oldVal){
//               $(element).css('left', newVal);
//           });
//           scope.$watch('y', function(newVal, oldVal){
//               $(element).css('top', newVal);
//           });


       }
   };

   return def;
});

myApp.directive('jsPlumbObject', function(plumbOptions) {
    var def = {
        restrict : 'E',
        require: '^jsPlumbCanvas',
        scope: {
            stateObject: '=stateObject'
        },
        transclude : true,
        template: '<div ng-transclude></div>',
        link : function(scope, element, attrs, jsPlumbCanvas) {
            var instance = jsPlumbCanvas.scope.jsPlumbInstance;

            //console.log(instance);

            instance.draggable(element, {
                grid: [20, 20],
                drag: function (event, ui) {
                    scope.stateObject.x = ui.position.left;
                    scope.stateObject.y = ui.position.top;
                    scope.$apply();
                }
            });
        }
    };
    return def;
});

myApp.directive('jsPlumbEndpoint', function(plumbOptions) {
    var def = {
        restrict : 'E',
        require: '^jsPlumbCanvas',
        scope: {
            settings: '=settings'
        },
        transclude : true,
        link : function(scope, element, attrs, jsPlumbCanvas) {
            var instance = jsPlumbCanvas.scope.jsPlumbInstance;

            var options = {
                anchor:attrs.anchor,
                uuid: attrs.uuid
            };

            console.log('rigging up endpoint');
            $(element).addClass('_jsPlumb_endpoint');
            $(element).addClass('endpoint_'+attrs.anchor);

            instance.addEndpoint(element, scope.settings, options);

        }
    };
    return def;
});



myApp.directive('jsPlumbConnection', function($timeout) {

    var def = {
        restrict : 'E',
        require: '^jsPlumbCanvas',
        scope: {
            ngClick: '&ngClick',
            connection: '=connection'
        },
        link : function(scope, element, attrs, jsPlumbCanvas)
        {
            var instance = jsPlumbCanvas.scope.jsPlumbInstance;

            //we delay the connections by just a small bit for loading
            //console.log('[directive][jsPlumbConnection] ', scope, attrs);

            $timeout(function(){

                if(typeof scope.connection.conn === 'undefined'){
                    scope.connection.conn = instance.connect({
                        uuids:[
                            scope.connection.targetUUID,
                            scope.connection.sourceUUID
                        ],
                        overlays:[
                            [ "Label", {label:"", id:"label"}]
                        ], editable:true});
                }

                var connection = scope.connection.conn;

                console.log('[---------][directive][jsPlumbConnection] ', connection);
                connection.bind("click", function(conn, originalEvent) {
                    scope.ngClick();
                    scope.$apply();
                });


                // not really using this... but if we wanted to... we could fix it :)
                var overlay = connection.getOverlay("label");
                if(overlay){
                    console.log('[getOverlay][label]', connection.getOverlay("label"));
                    $(element).appendTo( overlay.canvas );
                }


            }, 500);


            scope.$on('$destroy', function(){
                console.log('got destroy call');
                instance.detach(scope.connection.conn);
            });

        }
    };
    return def;
});