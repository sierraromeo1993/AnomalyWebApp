import React from 'react';
import {useState,useEffect} from 'react'
import Model from './Model'

// A simple display Component to show the given models we currently have 

const Models = ({models}) => {

    return (
        <>
            {models.map((model,index)=>
                <Model key={index} model= {model} />)}              
        </>
    );
};

export default Models;