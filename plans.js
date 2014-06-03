Utils = {
    nextLetter:function(c){
        return String.fromCharCode(c.charCodeAt(0) + 1);
    },

    prevLetter:function(c){
        return String.fromCharCode(c.charCodeAt(0) - 1);
    },

    getNthLetter:function(n){
        return String.fromCharCode('A'.charCodeAt(0) + n);
    },
};

Plan = function(title, description){
    this.title = title;
    this.description = description;
};

Alphabet = function(){
    this.list = [],

    this.keys = function(){
        return Object.keys(this.list);
    }

    this.addPlan = function(plan){
        this.list.push(plan);
    }

    this.removePlan = function(index){
        this.list.splice(index,1);
    }

    this.getPlan = function(index){
        if (index < this.list.length && index > 0){
            return this.list[index];
        }
        else{
            return new Error('index out of range');
        }
    }
};

function AlphabetController($scope){
    firstLetter = 'A';
    finalLetter = String.fromCharCode('Z'.charCodeAt(0) + 1);

    $scope.plans = new Alphabet();
    $scope.currentLetter = firstLetter;
    $scope.planTitle = '';
    $scope.atEnd = false;


    $scope.addPlan = function(){
        if ($scope.planTitle == '')
            return;

        $scope.plans.addPlan(new Plan($scope.planTitle, $scope.planDescription));
        $scope.currentLetter = Utils.nextLetter($scope.currentLetter);
        clearText();

        if ($scope.currentLetter == finalLetter){
            $scope.atEnd = true;
        }
    };

    $scope.removePlan = function(index){
        $scope.plans.removePlan(index);

        if ($scope.currentLetter == finalLetter){
            $scope.atEnd = false;
        }

        $scope.currentLetter = Utils.prevLetter($scope.currentLetter);
        clearText();
    };

    $scope.editPlan = function(){
        console.log('huh');
    };

    $scope.finalLetter = function(){
        return finalLetter;
    };
    
    $scope.getNthLetter = Utils.getNthLetter;

    clearText = function(){
        $scope.planTitle = '';
        $scope.planDescription = '';
    };
}