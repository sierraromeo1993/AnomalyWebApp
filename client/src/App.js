
import './App.css';
import {useState,useEffect} from 'react'
import SubMaster from './components/SubMaster'
import {parse} from "papaparse"
import Dropdown from './components/Dropdown'
import DynamicChart from './components/DynamicChart'
import DataTable from './components/DataTable'
import Anomalies from  './components/Anomalies'






function App() {

  const [models,setModels] = useState([]);

  const [file,setFile] = useState([]);

  const [dataPoints,setDataPoints] = useState({});

  const [dataColumns,setDataColumns] = useState({});

  const [displayGraphData,setDisplayGraphData] = useState([])

  const [anomalyReports,setAnomalyReports] = useState([]);

  const [showAnomalies,setShowAnomalies] = useState(false);

  



 
    
  /* To Initalize all Data from BACKEND */ 
  useEffect( () => {
  const getModels = async () => {
    const modelsFromServer = await fetchModels();
    setModels(modelsFromServer)
  }
  getModels();},[]);



   /* To Initalize anomalyReports in useState */ 
  useEffect( () => {
    if(anomalyReports.length === 0){return}
    setShowAnomalies(true);
  },[anomalyReports])

   /* To initalize Data we received from file from user and parse into proper format*/ 
  useEffect( () => {
  
    parseByColumn(dataPoints);
    },[dataPoints]);


  /* To set for specific attribute to be displayed on graph as function of all other 
     datasets we parsed from file given from user */   

  const addGraphData = (graphData) => {
      setDisplayGraphData(graphData)
  }
  
 

   /* take datapoints which is object which contains key pair value where key 
      is data cloumn attribute and value is ij value in grid */ 
  const parseByColumn = (dataPoints) => {

    var dataColumnArray = []; 
    if(Object.keys(dataPoints).length === 0){return;}
    for(const item in dataPoints.data[0]){
      dataColumnArray.push(item)    
    }
    const obj = dataColumnArray.reduce((o, key) => ({ ...o, [key]: []}), {})
    dataPoints.data.forEach(element => {     
      for(const item in element){
        obj[item].push(element[item]);
      }
    });
    setDataColumns(obj);
  }

   /* async function which return promise and gives me all models existing in the Backend */ 

  const fetchModels = async () => {
    
    const res = await fetch('/api/models');
    const data = await res.json();
    return data;
  }

   /* Add Model to the App  */ 

  const addModel =  (model) => {

    model.train_data = dataColumns;
    const options = {
      method :'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify(model)    
      }
      fetch('/api/models/add',options)
      setModels([...models,model]);
      
    }   
    
    

  /* deletes front-end representation of Model, goes by ID */ 
  const delModel = (id) => {

                                      
    setModels(models.filter((model)=> model.id !== id));
    delBack();
   
  }

   /* Deletes backend representation Model, goes by ID */ 
  const delBack = async (id) => {
    await fetch(`/api/models/delete/${id}`,{
      method: 'DELETE'
    });
  }


   /* Gets Model from Backend returns promise which can picked up by function and 
      unraveled */ 
  const getModel = async (id) => {
    const res = await fetch(`/api/models/${4}`);
    const data = await res.json();
    return data;
  }


 
   /* Function which sends a file to the Backend as FormData */ 
  const sendFile = () => {

    const formData = new FormData()
    formData.append('myFile', file[0])
    console.log(file[0]);
    const options = {
      method :'POST',
      body: formData   
      }
      fetch('/api/file/add',options) 
    }


   /* Adds file to the app and does first structureing of the data */   
  const addFile = (file) => {
    setFile(file)
    const reader = new FileReader()
    reader.readAsText(file[0]);
    reader.onload = () => {
      if (!!reader.result) {
          setDataPoints(parse(reader.result,{header:true}));
      }
    }
  }
  

  /* To implement ; deletes file in the Backend */ 
  const delFile = (file) => {


  }

   /* To Implement; checks whether in the Backend the model is ready and if so will update 
      the FrontEnd state accordingly  */ 
  const checkActiveModel = async (model) => {
    const res =  await fetch(`/api/models/status/${model.id}`);
    const data = await res.json();
    return data 
                                  
  }

  
   /* To take care of test when user gives test data fro a given model */ 
  const testModel = async (model) => {
    model.predict_data = dataColumns;
    const options = {
      method :'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify(model)    
      }
      const res =  await fetch('/api/models/update',options);
      const data = await res.json();
      return data
       /* Here you would have used sendFile()  to send this file to the Backend*/ 
      /*sendFile()*/
  }


   /* sets all Anomaly reports we got from App */ 
  const activateAnomalies = (anomalyArr) => {
    setAnomalyReports(anomalyArr);
  }
  


 /* General components for APP */ 
  return (
    <div className="App">
      <Dropdown dataColumns={dataColumns} addGraphData={addGraphData}/>
      <DynamicChart displayGraphData = {displayGraphData}/>   
      <DataTable dataColumns= {dataColumns}/>
      <SubMaster models = {models} addModel = {addModel} addFile={addFile} testModel ={testModel} activateAnomalies ={activateAnomalies}/>
      {showAnomalies && <Anomalies anomalyReports = {anomalyReports}/>}
    </div>
  );
}

export default App;
