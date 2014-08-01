var myApp = angular.module('plumbApp', ['plumbApp.controllers', 'plumbApp.directives']);

jsPlumb.ready(function(){
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['plumbApp']);
    });

});