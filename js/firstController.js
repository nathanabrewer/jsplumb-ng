myApp.controller('FirstExampleController', function($scope, $http, $localStorage) {

    $scope.zoomlevel = 64;
    $scope.pos_x = 214;
    $scope.pos_y = 148;

    $scope.targetEndpointStyle = {
        endpoint:"Dot",
        paintStyle:{ fillStyle:"#7AB02C",radius:11 },
        maxConnections:-1,
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
        maxConnections:-1,
        connector:[ "Flowchart", { stub:[30, 30], gap:20, cornerRadius:10, alwaysRespectStubs:true } ],
        connectorStyle:{
            lineWidth:4,
            strokeStyle:"#61B7CF",
            joinstyle:"round",
            outlineColor:"white",
            outlineWidth:2
        },
        connectorHoverStyle:{
            fillStyle:"#216477",
            strokeStyle:"#216477"
        }
    };

    $scope.removeIndex = function(index, object){
        object.splice(index, 1);
    };

    $scope.removeState = function(state){
      var index = $scope.stateObjects.indexOf(state);
      if(index !== -1){
          $scope.stateObjects.splice(index, 1);
      }
    };

    $scope.stateObjects = [];

    if(typeof $localStorage.stateObjects !== 'undefined'){
        $scope.stateObjects = $localStorage.stateObjects;
    }else{
        $http({method: 'GET', url: 'data.json'}).
            success(function(data, status, headers, config) {
                $scope.stateObjects = data;
                // when the response is available
        });
    }

    $scope.$watch('stateObjects', function(newVal, oldVal){
        $localStorage.stateObjects = $scope.stateObjects;
    }, true);


    if(typeof $localStorage.lastUUID === 'undefined'){
        $localStorage.lastUUID = 2000;
    }
    var getNextUUID = function(){
        $localStorage.lastUUID++;
        return $localStorage.lastUUID;
    }
    $scope.newState = function(){
        $scope.stateObjects.push({
            'name': 'New State',
            'template': 'default',
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



    $scope.activeState = null;

    $scope.setActiveState = function(state){
        $scope.activeState = state;
    };

    $scope.onConnection = function(instance, connection, targetUUID, sourceUUID){
        angular.forEach($scope.stateObjects, function(state){
            angular.forEach(state.sources, function(source){
               if(source.uuid == sourceUUID){
                   if(typeof source.connections === 'undefined') source.connections = [];
                   source.connections.push({'uuid': targetUUID });
                   $scope.$apply();
               }
            });
        });

    }

});




