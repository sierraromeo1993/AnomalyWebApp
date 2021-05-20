var util = require("./anomalyDetectionUtil");
var simpleAD = require("./simpleAnomalyDetector");
const csv = require("csv-parser");
const DM = require("./DataMaster");
const d = require("./Data");

function csvParser(pathToFile, pathToFile2, dataMaster) {
  dataArr1 = [];
  dataArr2 = [];
  trainDict = {};
  testDict = {};
  fs.createReadStream(pathToFile)
    .pipe(csv())
    .on("data", (row) => {
      dataArr1.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      trainDict = csvObjectsToDict(dataArr1);
      cf = simpleAD.learnNormal(trainDict);
      dataObj = new d.Data(trainDict, cf);
      dataMaster.data.push(dataObj);
    });

  fs.createReadStream(pathToFile2)
    .pipe(csv())
    .on("data", (row) => {
      dataArr2.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      testDict = csvObjectsToDict(dataArr2);
      cf = simpleAD.learnNormal(trainDict);
      ar = simpleAD.detect(testDict, cf, "Linear");
      ca = simpleAD.initialContinuousAnomalies(ar);
      //console.log(ca)
      console.log(JSON.stringify(ca));

      //for (const c of ca) {
      //console.log(anomaly)
      //}
    });
}

function csvObjectsToDict(dataArr) {
  //decleare data dictionary
  var dataDict = {};
  /*
   * get an array of feature and value.
   * only the first line in order to initialize the dict with appropriate keys
   */
  let data = Object.entries(dataArr[0]);

  /*
   * create key for every feature and initialize value with
   * array
   */
  for (const [key, value] of Object.entries(data)) {
    var attributes = `${value}`.split(",");
    dataDict[attributes[0]] = new Array();
  }

  for (var i = 0; i < dataArr.length; i++) {
    let data = Object.entries(dataArr[i]);
    for (const [key, value] of Object.entries(data)) {
      var attributes = `${value}`.split(",");
      let val = Number(attributes[1]);
      dataDict[attributes[0]].push(val);
    }
  }

  return dataDict;
}

dataMaster = new DM.DataMaster();
async function run() {
  csvParser("anomalyTrain1.csv", "anomalyTest1.csv", dataMaster);
}

//run();
