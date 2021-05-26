import React, { useEffect,useState } from 'react';

import MaterialTable from 'material-table'




/* A Component which preps and shows data as a DataTable to the user */
const DataTable = ({dataColumns}) => {

    const [dataARRColumns,setDataARRColumns] = useState([]);
    const [dataTableObjects,setDataTableObjects] = useState([]);
    const [columnTableObjects,setcolumnTableObjects] = useState([]);
   
  
    
    const getData = () => {
        const c  = dataTableObjects;
        return c;
    }

    const getColumn = () => {
        const d =  columnTableObjects;
        return d;
    }


    const createDataTableObj = (element,TimeStepArr) => {
        var dataObj = {};
        dataObj.Attribute  = element[0];
        var count = 0;
        TimeStepArr.forEach((val)=>{
            var timestep  = val
            dataObj[`Timestep        ${timestep}`] = element[1][count];
            count++;
        });
        
        return dataObj;
          
    }
    

    const createColumnDataObj  =  () => {
        var columnDataArr  = [];
        Object.entries(dataTableObjects[0]).map(element => {
            columnDataArr.push({title:element[0],field:element[0]})
          });
        columnDataArr.pop();
        return columnDataArr;  
    }

    useEffect(() => {
        if(dataTableObjects.length === 0){return;}
        console.log(dataTableObjects)
        setcolumnTableObjects(createColumnDataObj());   
    },[dataTableObjects]);
    
    useEffect(() => {
        if(columnTableObjects.length === 0){return;}

       console.log(columnTableObjects);
    },[columnTableObjects]) 




    useEffect(() => {
        if(dataARRColumns.length === 0){return;}
        var dataTableArr = [];
        var TimeStepArr = [];
        var count = 1;
       
        dataARRColumns[0][1].forEach(() => {
            TimeStepArr.push(count*100);
            count++
        })
        dataARRColumns.forEach((element)=>{
            dataTableArr.push(createDataTableObj(element,TimeStepArr))

        })
        setDataTableObjects(dataTableArr);
    },[dataARRColumns])


    useEffect( () => {
        if(Object.keys(dataColumns).length === 0){return;}  
        readyData(dataColumns);
          },[dataColumns]);


          
    
    const readyData = (dataCS) =>{
        var result = []
        var ArrColumnKeyVals = [];
        for(const dataC in dataCS){
            ArrColumnKeyVals.push([dataC,dataCS[dataC]])
        }  
        ArrColumnKeyVals.forEach((element)=> {
            result.push(makeTimeSteps(element));
        }) 
       
        setDataARRColumns(result);
      };
      
      const makeTimeSteps =  (attribute) => {
          var data =   [];
          var result = [];
          var count =  0;
          result.push(attribute[0]);
          attribute[1].forEach((el)=>{
              if(count%100 === 0){
                  data.push(el);
                  };count++;
          })
          result.push(data);
         
          return result;
      }

    return (
        <div style={{width:1000 ,height: 365}} className = "DataTable">
            <MaterialTable title="Data Report"  
              data ={getData()}
              columns ={getColumn()}/>
        </div>
    );
};

export default DataTable;