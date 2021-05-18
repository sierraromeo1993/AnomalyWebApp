import React from 'react';
import Anomaly from './Anomaly'


const  Anomalies = ({anomalyReports}) => {
    return (
        <>
            {anomalyReports.map((anomalyReport,index)=>
                <Anomaly key={index} anomalyReport= {anomalyReport} />)}              
        </>
    );
}

export default Anomalies;