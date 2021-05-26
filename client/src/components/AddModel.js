
// Basic Input modal gets sent function which changes state of usestate at top 
//
import React from 'react';
import {useState} from 'react';



/* A Input Component which allows user to enter new models to be used   */
const  AddModel = ({addModel,showAD}) => {

    const [modelName,setModelName] = useState('');
    const [modelType,setModelType] = useState('');


    const onChangeName = (event) => {
        setModelName(event.target.value);}

    const onChangeType = (event) => {
        setModelType(event.target.value);}  

    const onSubmit = (e) => {
        e.preventDefault();

        if(!modelName){
            alert('Please Add A Name')
            return;
        }

        if(modelType!= "Linear" && modelType!="NonLinear"){
            alert('Invalid Model Type.Current Models in System : Linear , NonLinear')
            return;
        }
        const ID = Math.floor(Math.random()*100000)+1;
        addModel({id:ID,Name:modelName,is_Ready:false,type:modelType})
        setModelName('');
        setModelType('');
        showAD(false);
    }

    return (
            <form className='add-form' onSubmit = {onSubmit}>
              <div className='form-control'>   
                 <label>Model Name</label>
                 <input className="ModelName" type='text' placeholder='Add Model Name' value={modelName} onChange={onChangeName}/>
              </div>
              <div className='form-control'>
                 <label>Model Type</label>
                 <input   className="ModelType" type='text' placeholder='Add Model Type' value={modelType} onChange={onChangeType}/>  
              </div>
              <input className="SaveButton" type='submit' value='Save Model' />
            </form>
        
    );
}

export default AddModel;