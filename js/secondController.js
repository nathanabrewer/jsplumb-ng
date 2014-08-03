myApp.controller('SecondaryExampleController', function($scope) {
    $scope.zoomlevel = 30;
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