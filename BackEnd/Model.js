

const uuidv4 = require("uuid/v4");




class Model{


    type;
    
    constructor(){
        this.id = uuidv4();
        this.is_ready = false;

    }

}


module.exports.Model = Model;