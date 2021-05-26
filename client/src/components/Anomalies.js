import React from 'react';
import Anomaly from './Anomaly'

/* A Component which shows all Anomalies as a List*/
const  Anomalies = ({anomalyReports}) => {
    return (
        <div className="AnomalyList">
            {anomalyReports.map((anomalyReport,index)=>
                <Anomaly key={index} anomalyReport= {anomalyReport} />)}              
        </div>
    );
}

export default Anomalies;