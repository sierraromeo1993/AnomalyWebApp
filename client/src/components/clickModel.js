import React from 'react';
// send down the put function from APP 
// and then activate it by sending in model 



function ClickModel({model,testModel,showTD,activateAnomalies}) {
    // notice that the data of the model I need is already here 
    // all you need to do is have APP STate function and that will be activated here 
    // given the argument of the model to update which inside of that put their is 
    // the send file function  
    const onClick = (e) => {   
        // resolve promsie and show me value caontaining alll anomalyReports  
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