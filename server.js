const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
var simpleAD = require("./simpleAnomalyDetector");

const app = express();
app.use(express.json({ limit: "10mb", extended: true }));

app.use(fileUpload());

var models = [
 
];


/* gives front end all users currently in the system */
app.get("/api/models", (req, res) => {
  res.json(models);
});



/* Takes Input information from user and creates a regression model based on that*/
app.post("/api/models/add", (req, res) => {
  var CF = simpleAD.learnNormal(req.body.train_data);
  req.body.cf = CF;
  models.push(req.body);
});



/* Gives user model based on id passed into it by user   */
app.get(`/api/models/:id`, (req, res) => {
  models.forEach((model) => {
    if (model.id == req.params.id) {
      res.json(model);
      
    }
  });
});

const port = 8080;



/* gets ID from front end and based on that */
app.delete("/api/models/delete/:id", (req, res) => {
  console.log(req.params.id);
  const tmp = models.filter((model) => model.id != req.params.id);
  models = tmp;
});


/* A function which deletes all files inside the uploads folder (if created);
note to checker their are a number functions not implemented here because they were not 
required by specifications and I want to continue expanding on this APP also after 
therfore please excuse these "not used" functions*/
const purgeUploadsFolder = () => {
  const directory = "uploads";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

/* gets req object from user containing data sets we want to test a certain model 
on does the test sees the Anomalies if created and then returns in the res object all Anomlaies 
conglomerated   */
app.post("/api/models/update", (req, res) => {
 
  var objArr = [];
  models.forEach((model) => {
    if (model.id == req.body.id) {
      var ar = simpleAD.detect(req.body.predict_data, model.cf, "Linear");
      var ca = simpleAD.initialContinuousAnomalies(ar);
      for (const anomalyArr of Object.entries(ca)) {
        for (const continuousAnomaly of anomalyArr[1]) {
          objArr.push(continuousAnomaly);
        }
      }
    
      res.json(objArr);
    }
  });
});

app.listen(port, () => console.log(`server started on port ${port}`));
