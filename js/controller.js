var myApp = angular.module('plumbApp.controllers', []);

myApp.controller('PlumbCtrl', function($scope) {

    $scope.zoomlevel = 70;
    $scope.pos_x = 0;
    $scope.pos_y = 0;

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
        connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:20, alwaysRespectStubs:true } ],
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

    $scope.stateObjects = [

        {   'name': 'jsPlumb',
            'sources': [
                { position: 'TopCenter',    uuid:10000},
                { position: 'BottomCenter', uuid:20000}
            ],
            'targets': [
                { position: 'LeftMiddle',   uuid:30000},
                { position: 'RightMiddle',  uuid:40000}
            ],
            'x': 550,
            'y': 130
        },

        {   'name': 'Brewer',
            'sources': [
                { position: 'TopCenter',    uuid:50000},
                { position: 'BottomCenter', uuid:60000},
            ],
            'targets': [
                { position: 'LeftMiddle',   uuid:70000},
                { position: 'RightMiddle',  uuid:80000}
            ],
            'x': 100,
            'y': 260
        },
        {   'name': 'AngularJS',
            'sources': [
                { position: 'TopCenter',    uuid:90000},
                { position: 'TopCenter',    uuid:90002},
                { position: 'TopCenter',    uuid:90004},
                { position: 'BottomCenter', uuid:100000},
            ],
            'targets': [
                { position: 'LeftMiddle',   uuid:110000},
                { position: 'RightMiddle',  uuid:120000}
            ],
            'x': 230,
            'y': 460
        }

    ];
    $scope.stateConnections = [
        { targetUUID:10000, sourceUUID:70000  },
        { targetUUID:20000, sourceUUID:120000 },
        { targetUUID:30000, sourceUUID:90000  }
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




myApp.controller('SecondaryExampleController', function($scope) {

    $scope.states = [

        {   'name': 'Secondary Test',
            'sources': [
                { position: 'TopCenter',    uuid:10000},
                { position: 'BottomCenter', uuid:20000},
            ],
            'targets': [
                { position: 'LeftMiddle',   uuid:30000},
                { position: 'RightMiddle',  uuid:40000}
            ],
            'x': 550,
            'y': 130
        },
        {   'name': 'True Enough',
            'sources': [
                { position: 'TopCenter',    uuid:50000},
                { position: 'BottomCenter', uuid:60000},
            ],
            'targets': [
                { position: 'LeftMiddle',   uuid:70000},
                { position: 'RightMiddle',  uuid:80000}
            ],
            'x': 100,
            'y': 260
        }

    ];
    $scope.connections = [
        { targetUUID:10000, sourceUUID:70000  },
        { targetUUID:30000, sourceUUID:50000  }
    ];

    $scope.onConnection = function(instance, connection, targetUUID, sourceUUID){
        alert('Thanks for making that connection... between '+targetUUID+' and '+sourceUUID);
    };

});