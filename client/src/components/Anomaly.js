import React from 'react';

const Anomaly = ({anomalyReport}) => {
    return (
        <div  className ="Anomaly">
            <h4>{"Description: "}{anomalyReport.description}</h4>
            <p>{"Timestep: "}{anomalyReport.timestep}</p>   
        </div>
    );
}

export default Anomaly;