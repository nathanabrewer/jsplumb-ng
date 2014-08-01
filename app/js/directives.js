var myApp = angular.module('plumbApp.directives', []);

myApp.factory('plumb', function() {

    var instance = jsPlumb.getInstance();



    instance.bind("connectionDrag", function(connection, originalEvent) {
        console.log("connectionDrag " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        console.log("connectionDrag", connection, originalEvent);
    });



    instance.bind("connectionMoved", function(params) {
        console.log("connection " + params.connection.id + " was moved");
    });




    instance.setContainer($("#main"));

    return instance;
});

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
            dragOptions:{},
            overlays:[
                [ "Label", {
                    location:[0.5, 1.5],
                    label:"Drag",
                    cssClass:"endpointSourceLabel"
                } ]
            ]
        },
        // the definition of target endpoints (will appear when the user drags a connection)
        'targetEndpoint': {
            endpoint:"Dot",
            paintStyle:{ fillStyle:"#7AB02C",radius:11 },
            hoverPaintStyle: this.endpointHoverStyle,
            maxConnections:-1,
            dropOptions:{ hoverClass:"hover", activeClass:"active" },
            isTarget:true,
            overlays:[
                [ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
            ]
        }
    };
});

myApp.directive('jsPlumbObject', function(plumb, plumbOptions) {
    var def = {
        restrict : 'A',
        transclude : true,
        template: '<div ng-transclude></div>',
        link : function(scope, element, attrs) {
            plumb.draggable(element, {  grid: [20, 20]  });
        }
    };
    return def;
});

myApp.directive('jsPlumbEndpoint', function(plumb, plumbOptions) {
    var def = {
        restrict : 'A',
        scope: {
            settings: '=settings'
        },
        transclude : true,
        link : function(scope, element, attrs) {
            var options = {
                anchor:attrs.anchor,
                uuid: attrs.uuid
            };

            //console.log('rigging up endpoint');
            $(element).addClass('_jsPlumb_endpoint');
            $(element).addClass('endpoint_'+attrs.anchor);

            plumb.addEndpoint(element, scope.settings, options);

        }
    };
    return def;
});



myApp.directive('jsPlumbConnection', function($timeout, plumb) {

    var def = {
        restrict : 'E',
        scope: {
            ngClick: '&ngClick',
            connection: '=connection'
        },
        link : function(scope, element, attrs)
        {
            //we delay the connections by just a small bit for loading
            //console.log('[directive][jsPlumbConnection] ', scope, attrs);

            $timeout(function(){

                if(typeof scope.connection.conn === 'undefined'){
                    scope.connection.conn = plumb.connect({
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

                console.log('[getOverlay][label]', connection.getOverlay("label"));
                $(element).appendTo( connection.getOverlay("label").canvas );


            }, 500);


            scope.$on('$destroy', function(){
                console.log('got destroy call');
                plumb.detach(scope.connection.conn);
            });

        }
    };
    return def;
});