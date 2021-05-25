import React from 'react';
import Model from './Model'

// A simple display Component to show the given models we currently have 

const Models = ({models}) => {

    return (
        <div className="ModelList">
            {models.map((model,index)=>
                <Model key={index} model= {model} />)}              
        </div>
    );
};

export default Models;