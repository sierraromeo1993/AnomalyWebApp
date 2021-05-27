const util = require("./anomalyDetectionUtil");
const enclosingCircle = require("smallest-enclosing-circle");
var ss = require("simple-statistics");

//correlated features struct
class correlatedFeatures {
  constructor(f1Name, f2Name, f1Data, f2Data, corr, minCircle) {
    //first feature name
    this.f1Name = f1Name;
    //second feature name
    this.f2Name = f2Name;
    //features corelation
    this.corr = corr;
    //the linear regresiion line of the features
    this.linReg = util.linearRegByArr(f1Data, f2Data);
    //thresold of calculation based on linear regression
    this.linearThreshold =
      findLinearThreshold(f1Data, f2Data, this.linReg) * 1.1;
    //thresold of calculation based on min circle algoritem
    this.minCircleThreshold =
      findMinCircleThreshold(f1Data, f2Data, minCircle) * 1.1;
    //min circle represented by point and radius
    this.minCircle = minCircle;
  }
}

//anomaly report class
class AnomalyReport {
  constructor(description, timestep) {
    //features involved
    this.description = description;
    //time step of the anomaly
    this.timestep = timestep;
  }
}

class continuousAnomaly {
  constructor(description, anomalyStart, anomalyEnd) {
    //features involved
    this.description = description;
    /*represent sequence anomlies.
    * for EAMPLE:
    * if we have the anomlies:
    * A-C 183
    * A-C 184
    * A-C 185
    * they convert to this format:
    * A-C 183-185  
    */
    this.anomalyStart = anomalyStart;
    this.anomalyEnd = anomalyEnd;
  }
}

//convert array of strings to numbers
const turn_toNumbers = (dataObj) => {
  var dataDict = {};
  for (const [key, value] of Object.entries(dataObj)) {
    dataDict[key] = [];
    value.forEach((element) => {if(element === ''){return;}dataDict[key].push(Number(element))})
}
return dataDict;}

/*
 * train model with two algoritems:
 * 1. linear regression line
 * 2. min enclosing circle
 */
function learnNormal(dataObj) {
  
  var  dataDict =  turn_toNumbers(dataObj);
  correlativeFeaturesDict = {};
  mostCorrelatedFeatures = [];

  let dataRowSize = dataDict[Object.keys(dataDict)[0]].length;
  
  let size = Object.keys(dataDict).length;
  
  //for each feature find it most correlated featuer
  for (let i = 0; i < size; i++) {
    let max = 0;
    let jmax = 0;
    let f1 = dataDict[Object.keys(dataDict)[i]];
    let f1Name = Object.keys(dataDict)[i];
    

    for (let j = i + 1; j < size; j++) {
      let f2 = dataDict[Object.keys(dataDict)[j]];
      let corr = Math.abs(util.correlation(f1, f2, dataRowSize));
     
      if (corr > max) {
        max = corr;
        jmax = j;
      }
    }

    let f2Name = Object.keys(dataDict)[jmax];
    correlativeFeaturesDict[f1Name] = f2Name;
    points = [];
    util.convertArraysToPoints(dataDict[f1Name], dataDict[f2Name], points);
    //calculate min enclosing circle and linear regression line of the correlated
    //features
    learnHelper(
      max,
      f1Name,
      f2Name,
      dataDict[f1Name],
      dataDict[f2Name],
      enclosingCircle(points),
      mostCorrelatedFeatures
    );
  }

  return mostCorrelatedFeatures;
}

//find thresold based on linear regression algoritem 
function findLinearThreshold(x, y, regressionLine) {
  max = 0;
  l = ss.linearRegressionLine(regressionLine);
  for (let i = 0; i < x.length; i++) {
    d = Math.abs(y[i]) - l(x[i]);
    if (d > max) {
      max = d;
    }
  }
  return max;
}

//find thresold based on min enclosing circle algoritem 
function findMinCircleThreshold(x, y, minCircle) {
  max = 0;
  p1 = new util.Point(minCircle.x, minCircle.y);
  for (let i = 0; i < x.length; i++) {
    p2 = new util.Point(x[i], y[i]);
    d = pointDistance(p1, p2);
    if (d > max) {
      max = d;
    }
  }
  return max;
}

/**
 *
 * @param {deviation of specific point} deviation
 * @param {first attribute} f1
 * @param {second attribute} f2
 * @param {points array} points
 */
function learnHelper(
  pearson,
  f1Name,
  f2Name,
  f1Data,
  f2Data,
  enclosingCircle,
  mostCorrelatedFeatures
) {
  threshold = 0.9;
  if (pearson - threshold >= Number.EPSILON) {
    minCircle = enclosingCircle;
    c = new correlatedFeatures(
      f1Name,
      f2Name,
      f1Data,
      f2Data,
      pearson,
      minCircle
    );
    mostCorrelatedFeatures.push(c);
    
  }
}

/**
 * @param dataTestDict is the data table of the test file
 * @param cfArr is the array of the correlated features object
 */
function detect(dataObj, cfArr, opt) {
  
  var  dataTestDict =  turn_toNumbers(dataObj);
  anomalyReports = [];
  for (const c of cfArr) {
    x = dataTestDict[c.f1Name];
    y = dataTestDict[c.f2Name];

    for (let j = 0; j < x.length; j++) {
      if (opt === "Linear") {
        if (c.corr >= threshold) {
          if (linearIsAnomalous(x[j], y[j], c)) {
            description = c.f1Name + "-" + c.f2Name;
            anomalyReports.push(new AnomalyReport(description, j + 1));
          }
        }
      } else if (opt === "NonLinear") {
        if (c.corr > 0.5) {
          if (minCircleIsAnomalous(x[j], y[j], c)) {
            description = c.f1Name + "-" + c.f2Name;
            anomalyReports.push(new AnomalyReport(description, j + 1));
          }
        }
        j++;
      }
    }
  }
  return anomalyReports;
}

//check if there is anomaly in a specific time step
//based on linear regression line
function linearIsAnomalous(x, y, c) {
  l = ss.linearRegressionLine(c.linReg);
  return Math.abs(y - l(x)) > c.linearThreshold;
}

//check if there is anomaly in a specific time step
//based on min enclosing circle algoritem
function minCircleIsAnomalous(x, y, c) {
  p1 = new util.Point(x, y);
  p2 = new util.Point(c.minCircle.x, c.minCircle.y);
  d = pointDistance(p1, p2);
  return d > c.minCircleThreshold;
}

//get distance between two points
function pointDistance(p1, p2) {
  let distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  return distance;
}

//add anomaly in the continous anomaly format
function addContinuousAnomaly(des, start, end) {
  c = new continuousAnomaly(des, start, end);
  return c;
}

/*create continous anomalies based on the
 *anomlies that found
 */
function initialContinuousAnomalies(anomalyReports) {
  continuousAnomalies = {};
  if (anomalyReports.length != 0) {
    for (const ar of anomalyReports) {
      continuousAnomalies[ar.description] = [];
    }
    des = "";
    start = 0;
    end = 0;
    isInitial = false;

    for (const ar of anomalyReports) {
      if (!isInitial) {
        des = ar["description"];
        start = ar["timestep"];
        end = ar["timestep"];
        isInitial = true;
        continue;
      }
      if (ar["description"] === des && ar["timestep"] == end + 1) {
        end++;
      } else {
        continuousAnomalies[des].push(addContinuousAnomaly(des, start, end));
        des = ar["description"];
        start = ar["timestep"];
        end = ar["timestep"];
      }
    }
    continuousAnomalies[des].push(addContinuousAnomaly(des, start, end));
  }
  return continuousAnomalies;
}

module.exports.findThreshold = findLinearThreshold;
module.exports.learnNormal = learnNormal;
module.exports.detect = detect;
module.exports.initialContinuousAnomalies = initialContinuousAnomalies;
