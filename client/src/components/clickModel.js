import React from 'react';



/* A Component which allows when user clicks on given model to know 
that that model what chosen so we can then test the data set uploaded from 
the users input */
function ClickModel({model,testModel,showTD,activateAnomalies}) {
   
    const onClick = (e) => {   
        testModel(model).then((value)=>{activateAnomalies(value)});
        showTD(false);     
    }
    return (
        <div onClick={onClick}>
            <h4>{"Name: "}{model.Name}</h4>
            <p>{"Type: "}{model.type}</p>
            <p>{"Ready To Use: "}{model.is_Ready.toString()}</p>       
        </div>
    );
}

export default ClickModel;