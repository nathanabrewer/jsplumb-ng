myApp.controller('FirstExampleController', function($scope) {

    $scope.zoomlevel = 64;
    $scope.pos_x = 214;
    $scope.pos_y = 148;

    $scope.targetEndpointStyle = {
        endpoint:"Dot",
        paintStyle:{ fillStyle:"#7AB02C",radius:11 },
        hoverPaintStyle: {
            fillStyle:"#216477",
            strokeStyle:"#216477"
        },
        maxConnections:-1,
            dropOptions:{
                hoverClass:"hover",
                activeClass:"active"
        },
        isTarget:true
    };

    $scope.sourceEndpointStyle = {
        endpoint:"Dot",
        paintStyle:{
            strokeStyle:"#7AB02C",
            fillStyle:"transparent",
            radius:7,
            lineWidth:3
        },
        isSource:true,
        connector:[ "Flowchart", { stub:[30, 30], gap:20, cornerRadius:10, alwaysRespectStubs:true } ],
        connectorStyle:{
            lineWidth:4,
            strokeStyle:"#61B7CF",
            joinstyle:"round",
            outlineColor:"white",
            outlineWidth:2
        },
        hoverPaintStyle:{
            lineWidth:4,
            strokeStyle:"#216477",
            outlineWidth:2,
            outlineColor:"white"
        },
        connectorHoverStyle:{
            fillStyle:"#216477",
            strokeStyle:"#216477"
        },
        dragOptions:{}
    };

    $scope.getTemplate = function(state){
        //resolve a template to use
        if(typeof state.template === 'undefined')
            return "partials/defaultState.html";

        if(state.template == 'fancyObject')
            return "partials/secondaryState.html";

        return "partials/defaultState.html";
    };

    $scope.stateObjects = [
        {
            "name": "jsPlumb",
            "sources": [
                {
                    "uuid": 1
                },
                {
                    "uuid": 2
                }
            ],
            "targets": [
                {
                    "uuid": 3
                },
                {
                    "uuid": 4
                }
            ],
            "x": 750,
            "y": 44.28571428571429
        },
        {
            "name": "Brewer",
            "template": "fancyObject",
            "sources": [
                {
                    "uuid": 5
                },
                {
                    "uuid": 6
                }
            ],
            "targets": [
                {
                    "uuid": 7
                },
                {
                    "uuid": 8
                }
            ],
            "x": 299.9932861328125,
            "y": 117.12947300502233
        },
        {
            "name": "AngularJS",
            "template": "fancyObject",
            "sources": [
                {
                    "uuid": 9
                },
                {
                    "uuid": 10
                },
                {
                    "uuid": 11
                },
                {
                    "uuid": 12
                }
            ],
            "targets": [
                {
                    "uuid": 13
                },
                {
                    "uuid": 14
                }
            ],
            "x": 230.00000000000003,
            "y": 460.00000000000006
        }
    ];
    var lastUUID = 100;
    var getNextUUID = function(){
        lastUUID++;
        return lastUUID;
    }
    $scope.newState = function(){
        $scope.stateObjects.push({
            'name': 'New State',
            'sources': [
                { uuid: getNextUUID()},
                { uuid: getNextUUID()},
            ],
            'targets': [
                { uuid: getNextUUID()},
                { uuid: getNextUUID()}
            ],
            'x': 10,
            'y': 10
        });
    };

    $scope.stateConnections = [
        { targetUUID:8, sourceUUID:2  },
        { targetUUID:7, sourceUUID:9 },
        { targetUUID:4, sourceUUID:12  }
    ];

    $scope.removeConnection = function(index){
        $scope.stateConnections.splice(index,1);
    }



    $scope.setActiveConnection = function(index){

      if(typeof $scope.activeConnection !== 'undefined' && $scope.activeConnection.index == index){
          $scope.activeConnection = undefined;
          return;
      }

      $scope.activeConnection = {
          index: index,
          connection: $scope.stateConnections[index]
      };

    };

    $scope.setActiveState = function(index){

        $scope.activeConnection = undefined;

        if(typeof $scope.activeState !== 'undefined' && $scope.activeState.index == index){
            $scope.activeState = undefined;
            return;
        }

        $scope.activeState = {
            index: index,
            state: $scope.stateObjects[index]
        };

    };
    var instance = jsPlumb.instance;


    $scope.onConnection = function(instance, connection, targetUUID, sourceUUID){
        // still need a scope $apply
        // console.log('onConnection in controller');
        $scope.stateConnections.push({
            'targetUUID': targetUUID,
            'sourceUUID': sourceUUID,
            'conn': connection
        });
        $scope.$apply();

    }

});




