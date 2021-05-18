const util = require("./anomalyDetectionUtil");
const enclosingCircle = require("smallest-enclosing-circle");
var ss = require("simple-statistics");

class correlatedFeatures {
  constructor(f1Name, f2Name, f1Data, f2Data, corr, minCircle) {
    this.f1Name = f1Name;
    this.f2Name = f2Name;
    this.corr = corr;
    this.linReg = util.linearRegByArr(f1Data, f2Data);
    this.linearThreshold =
      findLinearThreshold(f1Data, f2Data, this.linReg) * 1.1;
    this.minCircleThreshold =
      findMinCircleThreshold(f1Data, f2Data, minCircle) *1.1;
    this.minCircle = minCircle;
  }
}

class AnomalyReport {
  constructor(description, timestep) {
    this.description = description;
    this.timestep = timestep;
  }
}

class continuousAnomaly {
  constructor(description, anomalyStart, anomalyEnd) {
    this.description = description; // names of the correlated features
    this.anomalyStart = anomalyStart;
    this.anomalyEnd = anomalyEnd;
  }
}

const turn_toNumbers = (dataObj) => {
  var dataDict = {};
  for (const [key, value] of Object.entries(dataObj)) {
    dataDict[key] = [];
    value.forEach((element) => {if(element === ''){return;}dataDict[key].push(Number(element))})
}
return dataDict;}

function learnNormal(dataObj) {

  
  var  dataDict =  turn_toNumbers(dataObj);
  correlativeFeaturesDict = {};
  mostCorrelatedFeatures = [];

  let dataRowSize = dataDict[Object.keys(dataDict)[0]].length;
  
  let size = Object.keys(dataDict).length;
  
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
      } else if (opt === "Non Linear") {
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

function linearIsAnomalous(x, y, c) {
  l = ss.linearRegressionLine(c.linReg);
  return Math.abs(y - l(x)) > c.linearThreshold;
}

function minCircleIsAnomalous(x, y, c) {
  p1 = new util.Point(x, y);
  p2 = new util.Point(c.minCircle.x, c.minCircle.y);
  d = pointDistance(p1, p2);
  return d > c.minCircleThreshold;
  //return Math.abs(y - l(x)) > c.threshold;
}

function pointDistance(p1, p2) {
  let distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  return distance;
}

function addContinuousAnomaly(des, start, end) {
  c = new continuousAnomaly(des, start, end);
  return c;
  //anomalies.push(ca);
}

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
