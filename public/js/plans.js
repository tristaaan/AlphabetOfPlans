'use strict'

var app = angular.module('AlphabetOfPlans', []);

app.factory('AlphabetService', function(){
    var my = {};
    var indexOfPlan = -1;

    my.plans = new Alphabet();
    my.planToEdit = new Plan('none', 'none');

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
        AlphabetService.planToEdit = $scope.plans.getPlan(index);
    };

    $scope.moveUp = function(index){
        $scope.plans.reorder(index, -1);
    };

    $scope.moveDown = function(index){
        $scope.plans.reorder(index, 1);
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
    $scope.editing = false;
    $scope.plan = AlphabetService.getPlanToEdit();

    $scope.$watch(AlphabetService.getPlanToEdit, function(){
        $scope.plan = AlphabetService.getPlanToEdit();
        if ($scope.plan.title != 'none'){
            $scope.editing = true;
        }
    });

    $scope.doneEditing = function(){
        $scope.editing = false;
    };
});

app.controller('ShareController', function($scope, AlphabetService){
    $scope.valid = !AlphabetService.plans.empty();

    $scope.shareList = function(){
        console.log("share me!");
    };
});