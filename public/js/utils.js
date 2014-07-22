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

    serializeData: function(obj){
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
          
        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += this.serializeData(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += this.serializeData(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }
          
        return query.length ? query.substr(0, query.length - 1) : query;
    }
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