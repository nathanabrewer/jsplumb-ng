var myApp = angular.module('plumbApp.controllers', []);

myApp.controller('PlumbCtrl', function($scope, plumbOptions) {

    $scope.zoomlevel = 100;
    $scope.pos_x = 0;
    $scope.pos_y = 0;

    $scope.plumbOptions = plumbOptions;

    $scope.stateObjects = [

        {   'name': 'jsPlumb',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:10000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:20000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:30000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:40000}
            ],
            'x': 550,
            'y': 130
        },
        {   'name': 'Brewer',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:50000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:60000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:70000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:80000}
            ],
            'x': 100,
            'y': 260
        },
        {   'name': 'AngularJS',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:90000},
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:90002},
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:90004},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:100000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:110000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:120000}
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


    $scope.stateObjects_B = [

        {   'name': 'Secondary Test',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:10000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:20000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:30000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:40000}
            ],
            'x': 550,
            'y': 130
        },
        {   'name': 'True Enough',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:50000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:60000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:70000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:80000}
            ],
            'x': 100,
            'y': 260
        }

    ];
    $scope.stateConnections_B = [
        { targetUUID:10000, sourceUUID:70000  },
        { targetUUID:30000, sourceUUID:50000  }
    ];
    $scope.removeConnection = function(index){
        $scope.stateConnections.splice(index,1);
        console.log('[scope][removeConnection] -- splicing index', index);
    }
    $scope.addTo = function(ya){
        if(typeof ya.count == 'undefined'){
            ya.count=0;
        }else{
            ya.count++;
        }
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

    $scope.onConnection_B = function(instance, connection, targetUUID, sourceUUID){
      alert('Thanks for making that connection... between '+targetUUID+' and '+sourceUUID);
    };


});


myApp.controller('SecondaryExampleController', function($scope, plumbOptions) {

    $scope.plumbOptions = plumbOptions;

    $scope.states = [

        {   'name': 'Secondary Test',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:10000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:20000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:30000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:40000}
            ],
            'x': 550,
            'y': 130
        },
        {   'name': 'True Enough',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:50000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:60000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:70000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:80000}
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