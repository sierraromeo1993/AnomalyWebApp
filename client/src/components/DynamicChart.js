import React, {useState,useEffect} from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

// in order to write name also send from dropdown name of button clicked 
// and thats it who its checking for   
// I need to also receive what are the names of the attributes 
// plotting on x y axis  do this from Dropdown 
const  DynamicChart = ({displayGraphData}) => {

    
      
    // use spreadOperator and update accordingly 
    const [data,setdata] = useState([]);
    const [showData,setShowData] = useState(false);

    useEffect( () => {

        //console.log(displayGraphData);
        },[displayGraphData]);

    const dataToShow = (graphData) => {

          if(graphData == undefined ){return []}
          var Multiple = [];
          var count = 0;
          graphData.forEach(element => {
              
              if(count%100 == 0){Multiple.push(element)}
              count++
            })
            
          
          console.log(Multiple)
          return Multiple

    }

    const findMinMax = (graphData) => {
       var minX = 0;
       var maxX; 
       var minY;
       var maxY;
       var XARR = [];
       var YARR = []
       dataToShow(graphData).forEach(element => {
            element.forEach((el)=> {
                XARR.push(el.x);
                YARR.push(el.y);   
            })
               
           })
           maxX = Math.max(...XARR);
           minX = Math.min(...XARR);

           maxY = Math.max(...YARR);
           minY = Math.min(...YARR);
           return [[minX-1,maxX+1],[minY-1,maxY+1]]
       }

      

    return (
        <ScatterChart
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />   
        <XAxis type="number" dataKey={"x"} name="" unit="" domain={findMinMax(displayGraphData)[0]}  />
        <YAxis type="number" dataKey={"y"} name="" unit=""  domain={findMinMax(displayGraphData)[1]}/>
        <ZAxis range={[50]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
         <Scatter  name="Altitute" data={dataToShow(displayGraphData[0])} fill="blue" line shape="circle" />
         <Scatter  name="Speed" data={dataToShow(displayGraphData[1])} fill="purple" line shape="circle" />
         <Scatter  name="Altitute" data={dataToShow(displayGraphData[2])} fill="orange" line shape="circle" />
      </ScatterChart>
        
    );
}

export default DynamicChart;