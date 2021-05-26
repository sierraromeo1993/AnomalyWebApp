
import React, {useState,useEffect} from 'react';
import './Dropdown.css';


/* A Component which is a dropdown component we have a number of other components in the
specific file in short they create a dropdown menu containing all attributes loaded from the 
file when someone clicks on one of these attributes 
he then can see it as function of a graph  */
function Dropdown({dataColumns,addGraphData}) {

    const [showChartButton,setShowChartButton] = useState(false);
    const [dataARRColumns,setDataARRColumns] = useState([]);

    useEffect( () => {
           
          },[dataARRColumns]);

    useEffect( () => {
        if(Object.keys(dataColumns).length === 0){return;}  
        readyData(dataColumns);
        setShowChartButton(true);
          },[dataColumns]);
    
    const readyData = (dataCS) =>{
        
        var ArrColumnKeyVals = [];
        for(const dataC in dataCS){
            ArrColumnKeyVals.push([dataC,dataCS[dataC]])
        } 
        
        setDataARRColumns(ArrColumnKeyVals);
      };

    return (
        <>
          <Navbar>
           {showChartButton &&<NavItem icon="📈">
                  <DropdownMenu dataARRColumns={dataARRColumns} addGraphData={addGraphData}/>  
              </NavItem>}     
          </Navbar>
        </>
    );
}
 
function Navbar(props) {
    return (
        <nav className="navbar">
          <ul className="navbar-nav">{props.children}</ul> 
        </nav>
    );
}


function NavItem(props) {


    const [open,setOpen] = useState(false);
    return (
        <li className="nav-item">
           <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
             {props.icon}  
           </a>
           {open && props.children}
        </li>
    );
}




function DropdownMenu(props) {


    const getDataColumns = () => {
          return props.dataARRColumns;
    }

   
   function DropdownItem(props) {
        const[dataColumns,setDataColumns] = useState([]);
        const[graphData,setGraphData] = useState([]);

        useEffect( () => {
            
            setDataColumns(props.getDataColumns);
            },[props.dataARRColumn]);

        useEffect( () => {
            //console.log(props.getDataColumns())
            createDataLists();
            },[dataColumns]);
        
        useEffect( () => {
            if(graphData.length === 0){return;}
            
            },[graphData]);    
    
        const createDataLists =  () => {
            const DataLists = [];
            
            // Build another list which contains the names 
            // of the attributes we are plotting for 
            // where place 0 is the actual button thats been clikced and 
            // all attributes follow in order after 
            // for the project we are only plotting for 3 different 
            // attributes on the y axis with x axis staying for the specific 
            // datacoulmn in the dropdown menu thats been chosen 
            
            dataColumns.forEach(dataColumn => {
            if(dataColumn[0] === props.dataARRColumn[0]){return;} 
            const DataList = createDataList(props.dataARRColumn[1],dataColumn[1]);
            DataLists.push(DataList);
                      
            });
            setGraphData(DataLists);
            } 

        const createDataList  = (XVals,YVals) => {
            let count = 0;
            var DataList = [];
            XVals.forEach((XVal) => {DataList.push({x:XVal,y:YVals[count]});count++});
            return DataList
        }   

        return (
            <a href="#" className = "menu-item" onClick={()=> {props.addGraphData(graphData)}} >
                {props.dataARRColumn[0]}   {props.icon}
            </a>
        )
    }

    return (
        <div className="dropdown">     
            {props.dataARRColumns.map((dataARRColumn,index)=>
               <DropdownItem key={index} icon="📈" dataARRColumn={dataARRColumn} getDataColumns={getDataColumns} addGraphData = {props.addGraphData}/>)}      
        </div>
    );
}



export default Dropdown;


