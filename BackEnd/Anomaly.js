const uuidv4 = require("uuid/v4");

class Anomaly{


    constructor(){
        this.id = uuidv4();
    }
}



module.exports.Anomaly = Anomaly;