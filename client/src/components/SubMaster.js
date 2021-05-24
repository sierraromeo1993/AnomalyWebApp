import React from 'react';
import FileDrop from './FileDrop'
import TestDisplay from './TestDisplay'
import {useState, useEffect} from 'react'
import Button from './Button'
import AddModel from './AddModel';
import Models from './Models'






// Holds all components which  deal in the following actions 

// 1: FileDrop
// 2: Button
// 3: TestDisplay check on UI show and basic func need to create all functions 
//    to be drilled inside for APP STATE/ SUBMaster can talk with him  
// receive as prop; models , any functions dealing with actions associated with 
// APP LEVEL OPERATION ( ADDMODEL, ADDFILETOSTATE )
//activateAnomalies ={activateAnomalies}

function SubMaster({models,addModel,addFile,testModel, activateAnomalies }) {


    
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
          <Models models={models}/>
          {showAddModel &&<AddModel addModel = {addModel} showAD = {showAD}/>}
          {showButtons &&<Button text={'Train'} type={"Train"} setActiveButton={setActiveButton} activeButton={activeButton}/>}
          {showButtons &&<Button text={'Test'} type={"Test"} setActiveButton={setActiveButton} activeButton={activeButton}/>}
          {showTestDisplay &&<TestDisplay models = {models} testModel = {testModel} showTD = {showTD} activateAnomalies ={activateAnomalies}  />}
          <FileDrop activeButton = {activeButton} addFile={addFile} showB = {showB} />   
        </div>
    );
}

export default SubMaster;