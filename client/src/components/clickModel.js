import React from 'react';
// send down the put function from APP 
// and then activate it by sending in model 

function ClickModel({model}) {
    // 
    const onClick = (e) => {
        console.log("it worked");
        
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