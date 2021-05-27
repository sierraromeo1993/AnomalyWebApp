
var ss = require("simple-statistics");



// returns the avarage of X
function avg(x, size) {
  sum = 0;
  for (var i = 0; i < size; sum += x[i], i++);
  return sum / size;
}

// returns the variance of X and Y
function variance(x, size) {
  av = avg(x, size);
  sum = 0;
  for (var i = 0; i < size; i++) {
    sum += x[i] * x[i];
  }
  return sum / size - av * av;
}

// returns the covariance of X and Y
function cov(x, y, size) {
  sum = 0;
  for (var i = 0; i < size; i++) {
    sum += x[i] * y[i];
  }
  sum /= size;

  return sum - avg(x, size) * avg(y, size);
}

// performs a linear regression and returns the line equation
function linearRegByPoints(points, size) {
  let x = [];
  let y = [];
  convertPointsToXYArr(x, y, points);
  return linearRegByArr(x, y, size);
}

function linearRegByArr(x, y) {
  /*a = cov(x, y, size) / variance(x, size);
  b = avg(y, size) - a * avg(x, size);
  let l = new Line(a, b);
  */
 l = ss.linearRegression(arraysToPoints(x,y));
  return l;
}

function convertPointsToXYArr(x, y, points) {
  let pointsArr = Object.values(points);
  for (const p of pointsArr) {
    x.push(p.x);
    y.push(p.y);
  }
}

function arraysToPoints(x, y) {
    let points = new Array(x.length);
  for (let i = 0; i <x.length; i++) {
      points[i] = new Array()
      points[i].push(x[i])
      points[i].push(y[i]);

  }
  return points
}

function convertArraysToPoints(x, y, points) {
  for (let i = 0; i < x.length; i++) {
    points[i] = new Point(x[i], y[i]);
  }
}

// returns the deviation between point p and the line equation of the points
function dev(p, points, size) {
  let x = [];
  let y = [];
  convertPointsToXYArr(x, y, points);

  l = linearReg(x, y, size);
  return CalculateDev(p, l);
}

// returns the deviation between point p and the line
function CalculateDev(p, l) {
  x = p.y - l.f(p.x);
  if (x < 0) {
    x *= -1;
  }
  return x;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  f(x) {
    return this.a * x + this.b;
  }
}

function correlation(X, Y, n) {
  var sum_X = 0;
  var   sum_Y = 0;
  var  sum_XY = 0;
  var squareSum_X = 0;
  var  squareSum_Y = 0;

  for (let i = 0; i < n; i++) {
    // Sum of elements of array X.
    sum_X = sum_X + X[i];

    // Sum of elements of array Y.
    sum_Y = sum_Y + Y[i];

    // Sum of X[i] * Y[i].
    sum_XY = sum_XY + X[i] * Y[i];

    // Sum of square of array elements.
    squareSum_X = squareSum_X + X[i] * X[i];
    squareSum_Y = squareSum_Y + Y[i] * Y[i];
  }

  // Use formula for calculating correlation
  // coefficient.
  let corr =
    (n * sum_XY - sum_X * sum_Y) /
    Math.sqrt(
      (n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)
    );
    
  return corr;
}

module.exports.convertPointsToXYArr = convertPointsToXYArr;
module.exports.linearRegByPoints = linearRegByPoints;
module.exports.linearRegByArr = linearRegByArr;
module.exports.correlation = correlation;
module.exports.convertArraysToPoints = convertArraysToPoints;
module.exports.arraysToPoints = arraysToPoints;

module.exports.Line = Line;
module.exports.Point = Point;
