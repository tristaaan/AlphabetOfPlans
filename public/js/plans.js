'use strict'

var app = angular.module('AlphabetOfPlans', [], function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
});

app.factory('AlphabetService', function(){

    var my = {};
    var indexOfPlan = -1;

    my.plans = new Alphabet();
    my.planToEdit = new Plan('none', 'none');
    my.editing = false;

    my.addPlan = function(p){
        my.plans.addPlan(p);
    };

    my.removePlan = function(i){
        my.plans.removePlan(i);
    };

    my.updatePlan = function(p){
        my.plans.list[indexOfPlan] = p;
    }

    my.editPlan = function(i){
        my.planToEdit = my.plans.getPlan(i);
        indexOfPlan = i;
    };

    my.getPlanToEdit = function(){
        return my.planToEdit;
    }

    return my;
});

app.controller('AlphabetController', function($scope, AlphabetService){
    var firstLetter = 'A';
    var finalLetter = String.fromCharCode('Z'.charCodeAt(0) + 1);

    $scope.data = AlphabetService;
    $scope.plans = AlphabetService.plans;

    $scope.currentLetter = firstLetter;
    $scope.planTitle = '';
    $scope.atEnd = false;

    $scope.addPlan = function(){
        if ($scope.planTitle == '')
            return;

        AlphabetService.addPlan(new Plan($scope.planTitle, ''));
        $scope.currentLetter = Utils.nextLetter($scope.currentLetter);
        clearText();

        if ($scope.currentLetter == finalLetter){
            $scope.atEnd = true;
        }
    };

    $scope.removePlan = function(index){
        AlphabetService.removePlan(index);

        if ($scope.currentLetter == finalLetter){
            $scope.atEnd = false;
        }

        $scope.currentLetter = Utils.prevLetter($scope.currentLetter);
        clearText();
    };

    $scope.editPlan = function(index){
        AlphabetService.editing = true;
        AlphabetService.planToEdit = AlphabetService.plans.getPlan(index);
    };

    $scope.moveUp = function(index){
        AlphabetService.reorder(index, -1);
    };

    $scope.moveDown = function(index){
        AlphabetService.reorder(index, 1);
    };

    $scope.finalLetter = function(){
        return finalLetter;
    };

    $scope.getNthLetter = Utils.getNthLetter;

    var clearText = function(){
        $scope.planTitle = '';
    };
});

app.controller('EditController', function($scope, AlphabetService){
    $scope.data = AlphabetService;

    $scope.doneEditing = function(){
        AlphabetService.editing = false;
    };
});

app.controller('ShareController', function($scope, $http, AlphabetService){
    $scope.response = 'nil';

    $scope.shareList = function(){
        $http({
            method: 'POST',
            url: '/new',
            data: {alphabet: AlphabetService.plans.list}
        }).success(function(data, status, headers, config) {
            $scope.response = 'sucecss ' + status;
            $scope.loading = false;
        }).error(function(data, status, headers, config){
            $scope.response = 'there was an error: ' + status;
            $scope.loading = false;
        });
    };
});