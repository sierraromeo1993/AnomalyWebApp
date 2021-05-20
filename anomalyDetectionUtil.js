
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
  //console.log(X);
  //console.log(Y);
  //console.log(n);
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

  //console.log(sum_Y);
  //console.log(squareSum_Y);
  //console.log("hello");

  // Use formula for calculating correlation
  // coefficient.
  let corr =
    (n * sum_XY - sum_X * sum_Y) /
    Math.sqrt(
      (n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)
    );
    
  return corr;
}

// Driver code
let y = [ 20.31, 30.21,  40.28,  50.02,  60.01,  70.05,  80.19,
    90.09,  100.21, 110.14, 120.09, 130.08, 140.19, 150.21,
   160.12,  170.05, 180.21, 190.32, 200.14, 210.27, 220.17,
   230.24,  240.25, 250.01, 260.25, 270.16, 280.13, 290.33,
   300.07,     310, 320.25, 330.05, 340.26,  350.3, 359.98,
   370.29,  380.11, 390.04, 400.19, 410.25, 420.36, 430.25,
   440.26,  450.13, 460.16, 470.26, 480.18, 490.08, 500.22,
   510.35,  520.21, 529.99, 540.04, 550.07, 560.11, 570.12,
   580.11,  590.33, 600.23, 610.16,  620.3, 630.35,    640,
   650.23,  660.26, 670.25, 680.12, 689.99, 700.24, 710.22,
    720.1,  730.28, 740.15, 750.08, 760.13, 770.32,  780.3,
   790.11,  800.34, 810.34, 820.08, 830.12, 839.99, 850.24,
   859.99,  870.11, 880.02,    890, 900.02, 910.32, 920.21,
   930.09,  940.09,    950, 960.31, 970.19, 980.14, 990.24,
  1000.24, 1010.34];

  let x = [   1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
  13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
  73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
  85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
  97, 98, 99, 100];




module.exports.convertPointsToXYArr = convertPointsToXYArr;
module.exports.linearRegByPoints = linearRegByPoints;
module.exports.linearRegByArr = linearRegByArr;
module.exports.correlation = correlation;
module.exports.convertArraysToPoints = convertArraysToPoints;
module.exports.arraysToPoints = arraysToPoints;

module.exports.Line = Line;
module.exports.Point = Point;
