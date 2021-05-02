const uuidv4 = require("uuid/v4");




class Data{


    constructor(){
        this.id =  uuidv4();
    }
}



module.exports.Data = Data;

//try someting