import React from 'react';
import FileDrop from './FileDrop'
import TestDisplay from './TestDisplay'
import {useState, useEffect} from 'react'
import Button from './Button'
import AddModel from './AddModel';
import Models from './Models'
import './FDD.css';
import "./SubMaster.css";







// Holds all components which  deal in the following actions 

// 1: FileDrop
// 2: Button
// 3: TestDisplay check on UI show and basic func need to create all functions 
//    to be drilled inside for APP STATE/ SUBMaster can talk with him  
// receive as prop; models , any functions dealing with actions associated with 
// APP LEVEL OPERATION ( ADDMODEL, ADDFILETOSTATE )
//activateAnomalies ={activateAnomalies}

function SubMaster({models,addModel,addFile,testModel, activateAnomalies,closeA}) {


    
    // could also maybe be empty 
    const [activeButton,setButton] = useState("");
    
    const [showTestDisplay,setShowTestDisplay] = useState(false);

    const [showAddModel, setShowAddModel] =  useState(false);
     
    const [showButtons, setShowButtons] = useState(false);
    


    const setActiveButton = (string) => {setButton(string);console.log(string) }
     

    const showTD = (flag) => {setShowTestDisplay(flag)}
    const showAD = (flag) => {setShowAddModel(flag)}
    const showB  =  (flag) => {setShowButtons(flag)}

    useEffect(() => {
       if(activeButton === "Train"){showAD(true);showB(false)}
       if(activeButton === "Test"){showTD(true);showB(false)}
    }, [activeButton]);


          
    return (
        <div className="SubMaster">
          <div className = "Models">
            <Models models={models}/>
          </div>
          <div className="AddModel">
            {showAddModel &&<AddModel addModel = {addModel} showAD = {showAD}/>}
          </div>
          <div className="Buttons">
            {showButtons &&<Button name={'TrainButton'} text={'Train'} type={"Train"} setActiveButton={setActiveButton} activeButton={activeButton} showTD={showTD} showAD={showAD}/>}
            {showButtons &&<Button name={'TestButton'} text={'Test'} type={"Test"} setActiveButton={setActiveButton} activeButton={activeButton} showTD={showTD} showAD={showAD}/>}
          </div>
          <div className="TestDisplay">
            {showTestDisplay &&<TestDisplay models = {models} testModel = {testModel} showTD = {showTD} activateAnomalies ={activateAnomalies}  />}
          </div>
          <FileDrop activeButton = {activeButton} addFile={addFile} showB = {showB} closeA={closeA} showTD={showTD} activeButton={activeButton}/> 
        </div>
    );
}

export default SubMaster;