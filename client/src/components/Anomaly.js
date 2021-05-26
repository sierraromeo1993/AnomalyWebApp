import React from "react";



/* A Component which Infromation on each conglomerated Anomaly Report */
const Anomaly = ({ anomalyReport }) => {
  return (
    <div className="Anomaly">
      <h4>
        {"Description: "}
        {anomalyReport.description}
      </h4>
      <p>
        {"Start: "}
        {anomalyReport.anomalyStart}
      </p>
      <p>
        {"End: "}
        {anomalyReport.anomalyEnd}
      </p>
    </div>
  );
};

export default Anomaly;
