import logo from './logo.svg';
import './App.css';
import Models from './components/Models'
import {useState,useEffect} from 'react'
import Button from './components/Button'
import FileDrop from './components/FileDrop'
import SubMaster from './components/SubMaster'
import {parse} from "papaparse"
import Dropdown from './components/Dropdown'
import DynamicChart from './components/DynamicChart';
import DataTable from './components/DataTable'






function App() {

  const [models,setModels] = useState([]);

  const [file,setFile] = useState([]);

  const [dataPoints,setDataPoints] = useState({});

  const [dataColumns,setDataColumns] = useState({});

  const [displayGraphData,setDisplayGraphData] = useState([])

  


  // This will be sent in to SubMaster which will then send into 
  // NameInput
 
    
  // To Initalize all Data from BACKEND  
  useEffect( () => {
  const getModels = async () => {
    const modelsFromServer = await fetchModels();
    setModels(modelsFromServer)
  }
  getModels();},[]);

  useEffect( () => {
    console.log(models);
      },[models]);

  useEffect( () => {
    console.log(dataPoints);
    parseByColumn(dataPoints);
    },[dataPoints]);

  useEffect( () => {
  
    console.log(dataColumns)
    },[dataColumns]);

    
   
    
    
  const addGraphData = (graphData) => {
      setDisplayGraphData(graphData)
  }
  
  // do foreach when objectNotation, have be empty object 
  // for every value I pass add new entry into object 
  // where key is what you passed value is array;
  // no have new object run foreach again 
  // 
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
              
  const fetchModels = async () => {
    
    const res = await fetch('/api/models');
    const data = await res.json();
    return data;
  }
 
  const addModel =  (model) => {

    model.train_data = dataColumns;
    console.log(model);
    const options = {
      method :'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify(model)    
      }
      fetch('/api/models/add',options)
      setModels([...models,model]);
      //sendFile();

      
    }   
    
    


  // deletes front-end representation of model 
  const delModel = (id) => {

                                      // SHOULD BE ID
    setModels(models.filter((model)=> model.id !== 4));
    delBack();
   
  }
  // deletes backend representation of model  
  const delBack = async (id) => {
    await fetch(`/api/models/delete/${5}`,{
      method: 'DELETE'
    });
  }

  // GETS MODEL BASED ON ID , RETURNS A PROMISE WHICH NEEDS TO BE UNRAVELED
  const getModel = async (id) => {
    const res = await fetch(`/api/models/${4}`);
    const data = await res.json();
    return data;
  }


  // NEEDS TO BE CHANGED, BUT SENDS FILE TO BACKEND TO BE USED IN CREATING 
  // MODEL, NOTE : YOU MUST ENSURE THAT THERI IS ONLY ONE FILE 
  // IN DATAMASTER AT ALL TIMES IN BACKEND
  // 
  //const sendFile = () => {

    //const formData = new FormData()
    //formData.append('myFile', file[0])
    //console.log(file[0]);
    //const options = {
      //method :'POST',
      //body: formData   
      //}
      //fetch('/api/file/add',options) 
    //}

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
  

  // MAY NOT EVEN USE 
  const delFile = (file) => {


  }


  const checkActiveModels = () => {

  }

  const checkActiveModel = async (model) => {
    const res =  await fetch(`/api/models/status/${model.id}`);
    const data = await res.json();
    return data 
                                  
  }

  

  const testModel = (model) => {
    model.predict_data = dataColumns;
    const options = {
      method :'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify(model)    
      }
      fetch('/api/models/update',options)
      //sendFile();
  }
// SubMaster is completed 
//<Models models={models}/> is completed 
// Dynamic Charting 
// show general data 

  return (
    <div className="App">
      <Dropdown dataColumns={dataColumns} addGraphData={addGraphData}/>
      <DynamicChart displayGraphData = {displayGraphData}/>   
      <DataTable dataColumns= {dataColumns}/>
      <SubMaster models = {models} addModel = {addModel} addFile={addFile} testModel ={testModel}/>
    </div>
  );
}

export default App;
