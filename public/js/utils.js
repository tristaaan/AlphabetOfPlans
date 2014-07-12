var Utils = {
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

var Plan = function(title, description){
    this.title = title;
    this.description = description;
};

var Alphabet = function(){
    this.list = [],

    this.empty = function(){
        return (this.list.length == 0)
    }

    this.addPlan = function(plan){
        this.list.push(plan);
    }

    this.removePlan = function(index){
        this.list.splice(index,1);
    }

    this.reorder = function(i, direction){
        var tmp = this.list[i];
        this.list[i] = this.list[i+direction];
        this.list[i+direction] = tmp;
    }

    this.getPlan = function(index){
        if (index < this.list.length && index >= 0){
            return this.list[index];
        }
        else{
            return new Error('index out of range');
        }
    }
};
