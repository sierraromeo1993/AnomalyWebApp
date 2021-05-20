
import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Button from   './Button'
import TestDisplay from './TestDisplay'
import './FDD.css';



// FUNCTION TO HANDLE FILE THATS BEENS ACCEPTED 
    // BY THE DROPZONE COMPONENT YOU ARE GOING TO ACTIVATE  
    // A FUNCTION (SENT FROM APP) THAT IS GOING TO UPATE A USESTATE ATTRIBUTE 
    // DEFINED IN APP 
    // Here you are going to also check what is the state of what button has been 
    // clicked and based of off that two things will happen 

    // 1 : If TRAIN then send files accepted up to APP through the function 
    //     we stated before and send true for one of two flags 
    //     thats in APPSTATE which for this case will then show modal 
    //     for user to enter name for that modal once he does this 
    //      ie submit in AdModal is clicked then inside of Onsubmit
    //      do the following :         
    //      activate addModal function in Appsate which inside of it 
    //      also activate addFile which look to state of current. Done 
    //
    // 2 : IF TEST then send files accpeted up to APP  through the function
    //     we stated before and send true for second flag which is USEstate attribute
    //     then this will activate for TESTDISPLAY that he should be shown 
    //     then when user chooses model to TEST this then activate a update model function
    //     which still needs to be created in APP 


function FileDrop({addFile,showB}) {

    const handleOnDrop = (acceptedFiles) => {     
        addFile(acceptedFiles);
        showB(true);
    }

    return (
        <div className = "FileDropContainer">
            <Dropzone className= "FileDrop" onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>
        </div>
    );
}

export default FileDrop;






    

   


