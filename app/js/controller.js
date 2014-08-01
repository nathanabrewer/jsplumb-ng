var myApp = angular.module('plumbApp.controllers', []);

myApp.controller('PlumbCtrl', function($scope, plumbOptions, plumb) {

    $scope.plumbOptions = plumbOptions;
    $scope.stateObjects = [

        {   'name': 'Some State',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:10000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:20000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:30000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:40000}
            ],
            'x': 510,
            'y': 10
        },
        {   'name': 'Some State2',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:50000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:60000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:70000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:80000}
            ],
            'x': 220,
            'y': 20
        },
        {   'name': 'Some State3',
            'endpoints': [
                { position: 'TopCenter',    type: plumbOptions.sourceEndpoint, uuid:90000},
                { position: 'BottomCenter', type: plumbOptions.sourceEndpoint, uuid:100000},
                { position: 'LeftMiddle',   type: plumbOptions.targetEndpoint, uuid:110000},
                { position: 'RightMiddle',  type: plumbOptions.targetEndpoint, uuid:120000}
            ],
            'x': 430,
            'y': 220
        }

    ];
    $scope.stateConnections = [
        { targetUUID:10000, sourceUUID:70000  },
        { targetUUID:20000, sourceUUID:120000 },
        { targetUUID:30000, sourceUUID:90000  }
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

    plumb.bind("connection", function(info, origEvent) {
        console.log("[connection] event", info, origEvent);
        if(typeof origEvent !== 'undefined' && origEvent.type == 'drop'){
            console.log('Drop Type Connection Event, adding data to connection model');
            $scope.stateConnections.push({
                'targetUUID': $(info.target).attr('uuid'),
                'sourceUUID': $(info.source).attr('uuid'),
                'conn': info.connection
            });
            $scope.$apply()
        }else{
            console.log('Non-Action Connection Event');
        }

    });

});