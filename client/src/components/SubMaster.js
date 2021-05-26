import React from 'react';
import FileDrop from './FileDrop'
import TestDisplay from './TestDisplay'
import {useState, useEffect} from 'react'
import Button from './Button'
import AddModel from './AddModel';
import Models from './Models'
import './FDD.css';
import "./SubMaster.css";





/* A Component which acts as a holder and controller  of all other components asscociated with user input 
of event change through putting in file till any event associated with that file barring 
events asscociated wit data table or dynamic graph  */
function SubMaster({models,addModel,addFile,testModel, activateAnomalies,closeA}) {


 
    const [activeButton,setButton] = useState("");
    
    const [showTestDisplay,setShowTestDisplay] = useState(false);

    const [showAddModel, setShowAddModel] =  useState(false);
     
    const [showButtons, setShowButtons] = useState(false);
    


    const setActiveButton = (string) => {setButton(string);console.log(string) }
     

    const showTD = (flag) => {setShowTestDisplay(flag);showB(false)}
    const showAD = (flag) => {setShowAddModel(flag);showB(false)}
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