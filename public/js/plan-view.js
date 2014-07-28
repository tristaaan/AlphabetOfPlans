'use strict'

var app = angular.module('AlphabetOfPlans', function($httpProvider){
    $httpProvider.defaults.headers.get['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.get['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
});

app.controller('AlphabetController', function($scope, $http){
    $http({
        method: 'GET',
        url: '/list/api/' + document.location.pathname.split("/")[2], 
        // ^^ this is a crappy way to get a url parameter,
        // the proper way would be with ngroute, but it's a pain to get working here...
    }).success(function(data, status, headers, config) {
        if(data.alphabet == null){
            $scope.error = true;
            $scope.response = 'the plans do not exist or the id was malformed';
        }

        $scope.plans = data.alphabet;
        console.log($scope.plans);
    }).error(function(data, status, headers, config){
        $scope.error = true;
        $scope.response = 'there was an error: ' + status;
    });

    $scope.getNthLetter = Utils.getNthLetter;
});