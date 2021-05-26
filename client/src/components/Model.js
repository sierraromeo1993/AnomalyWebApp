import React from 'react';


/* A Component which shows information for Model */
const Model = ({model}) => {
    return (
        <div  className ="Model">
            <h4>{"Name: "}{model.Name}</h4>
            <p>{"Type: "}{model.type}</p>
            <p>{"Ready To Use: "}{model.is_Ready.toString()}</p>
        </div>
    );
};

export default Model;