import React from 'react';
import FileDrop from './FileDrop'
import TestDisplay from './TestDisplay'
import NameInput from './AddModel'
import {useState, useEffect} from 'react'
import Button from './Button'
import AddModel from './AddModel';



// Holds all components which  deal in the following actions 

// 1: FileDrop
// 2: Button
// 3: TestDisplay check on UI show and basic func need to create all functions 
//    to be drilled inside for APP STATE/ SUBMaster can talk with him  
// receive as prop; models , any functions dealing with actions associated with 
// APP LEVEL OPERATION ( ADDMODEL, ADDFILETOSTATE )

function SubMaster({models,addModel,addFile}) {


    
    // could also maybe be empty 
    const [activeButton,setButton] = useState("");
    
    const [showTestDisplay,setShowTestDisplay] = useState(false);

    const [showAddModel, setShowAddModel] =  useState(false);


    const setActiveButton = (string) => {
        setButton(string);
    }
    // useful if a number of actions need to happen immediatley after a change 
    // in state before a render 
    useEffect(() => {
       //console.log(activeButton);
    }, [activeButton]);


          
    return (
        <div>
          <AddModel addModel = {addModel}/>

          <Button text={'Train'} type={"Train"} setActiveButton={setActiveButton} activeButton={activeButton}/>
          <Button text={'Test'} type={"Test"} setActiveButton={setActiveButton} activeButton={activeButton}/>
          <FileDrop activeButton = {activeButton} addFile={addFile} />
          {showTestDisplay && <TestDisplay models = {models} />}
          
        </div>
    );
}

export default SubMaster;