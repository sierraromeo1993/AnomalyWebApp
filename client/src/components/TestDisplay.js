

import React from 'react';
import ClickModel from './clickModel';




/* A Component which displays all Models currently trained in the system */
const TestDisplay = ({models,testModel,showTD,activateAnomalies}) => {
    return (
        <div className ="TestModelContainer" >
            {models.map((model,index)=>
            <ClickModel key={index} model= {model} testModel={testModel} showTD ={showTD}  activateAnomalies ={activateAnomalies}/>)}                                                  
        </div>
    );
    
};
export default TestDisplay;