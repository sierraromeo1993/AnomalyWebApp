import React from 'react';
import Model from './Model'


/* A Component which shows all Models currently in system */
const Models = ({models}) => {

    return (
        <div className="ModelList">
            {models.map((model,index)=>
                <Model key={index} model= {model} />)}              
        </div>
    );
};

export default Models;