

import React from 'react';
import ClickModel from './clickModel';

// create another componet called clickModel instead of inner div
//  which holds model and allows us to add functionality 
// for given model creeat OnClick function inside of value 



const TestDisplay = ({models,testModel,showTD,activateAnomalies}) => {
    return (
        <div className ="TestModelContainer" >
            {models.map((model,index)=>
            <ClickModel key={index} model= {model} testModel={testModel} showTD ={showTD}  activateAnomalies ={activateAnomalies}/>)}                                                  
        </div>
    );
    
};
export default TestDisplay;