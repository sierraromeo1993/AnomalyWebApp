import logo from './logo.svg';
import './App.css';
import Models from './components/Models'
import {useState,useEffect} from 'react'
import Button from './components/Button'
import FileDrop from './components/FileDrop'
import SubMaster from './components/SubMaster'





function App() {

  const [models,setModels] = useState([]);

  const [file,setFile] = useState([]);

  const [dataPoints,setDataPoints] = useState({});


 
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
    console.log(file);
    },[file]);

  useEffect( () => {
    console.log(models);
      },[models]);

              

  const fetchModels = async () => {
    
    const res = await fetch('/api/models');
    const data = await res.json();
    return data;
  }
  // always destroy first in Ui representation and then destroy in server 

  // this function is called in train button 
  const addModel =  (model) => {
    const options = {
      method :'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify(model)    
      }
      fetch('/api/models/add',options)
      setModels([...models,model]);
      sendFile();

      
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

  const addFile = (file) => {
    setFile(file)
  }
  

  // MAY NOT EVEN USE 
  const delFile = (file) => {


  }


  

  const updateModelTest = () => {


  }

//<Models models={models}/>
  return (
    <div className="App"> 
      <SubMaster models = {models} addModel = {addModel} addFile={addFile}/>
    </div>
  );
}

export default App;
