import React, { useEffect,useState } from 'react';

import MaterialTable from 'material-table'


// this is an app state component 
// you will pushing into it DataColumns 
// and you will be doing the following 
// 1. prepping the data to be served in an easy manner 
//  to the data table component 
// 1.1 turn into simialr data strucuture of size two what did before 1:1  first function
// 1.2 create same data structure but where we cut down on amount of data points factor of 10
       // modulo 100 on each does the trick  done
// 1.3 create array which for the length of one of the shortened array creates 
// 1.4  a column_name array in the following format i = 1 {`${i*100} TimeStep`} ;i++ 
// 1.5 from this column name array and the first value of the original data structure 
//     you will create data objects formateed for material table (see video tutorial) 
//   
 
// 2. take ready data and dyanmically serve it to the Material table 
//    component 
const DataTable = ({dataColumns}) => {

    const [dataARRColumns,setDataARRColumns] = useState([]);
    const [dataTableObjects,setDataTableObjects] = useState([]);
    const [columnTableObjects,setcolumnTableObjects] = useState([]);
   
     
    // so dataTableObjects will be used for our data in Material-Table
    // I'll need to first update it in useEffect of dataARRcoulumns 
    //
    
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
        <div style={{width: 1500,height: 500}}>
            <MaterialTable title="Data Report"  
              data ={getData()}
              columns ={getColumn()}/>
        </div>
    );
};

export default DataTable;