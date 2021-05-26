
import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import './FDD.css';




/* A FileDrop component which allow users to drop files into it to be then parsed and then
uploaded  */
function FileDrop({addFile,showB,closeA}) {

    const handleOnDrop = (acceptedFiles) => {  
        
       
        addFile(acceptedFiles);
        showB(true);
        closeA();
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






    

   


