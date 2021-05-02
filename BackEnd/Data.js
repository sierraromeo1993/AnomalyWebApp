const uuidv4 = require("uuid/v4");




class Data{


    constructor(){
        this.id =  uuidv4();
    }
}


var a  =5;
module.exports.Data = Data;

//try someting