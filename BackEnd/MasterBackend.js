

var StateMImport =   require('./StateMaster');
var DataMImport = require('./DataMaster');
var AnomalyMImport =  require('./AnomalyMaster');
var ModelMImport =  require('./ModelMaster');


class MasterBackend{

   Data_M;
   Anomaly_M;
   Model_M;
   State_M

   constructor(){

       this.State_M = new StateMImport.StateMaster();
       this.Data_M = new DataMImport.DataMaster(this.State_M);
       this.Model_M = new ModelMImport.ModelMaster(this.State_M);
       this.Anomaly_M = new AnomalyMImport.AnomalyMaster(this.State_M);
   }

}

module.exports.MasterBackend = MasterBackend;