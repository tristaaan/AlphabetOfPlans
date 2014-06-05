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
        if (index < this.list.length && index >= 0){
            return this.list[index];
        }
        else{
            return new Error('index out of range');
        }
    }
};
