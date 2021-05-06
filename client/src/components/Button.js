import React from 'react';



// General button for Train Test, this button for now is being 
// to test all our requests to the server 


const Button = ({text,onAdd,onDelete,onGet,type,setActiveButton,activeButton}) => {
    // create object 
    const onClick = (e) => {
        //onAdd();
        //onDelete();
        //console.log(type);
        setActiveButton(type);
        
        // The result will be pushed into the useState of a 
        // a given type so we can save him : note  you'll have to update accordingly

        //onGet().then(result=>  {console.log(result)});
        
                   }
    
    return (
        <div>
         <button className='button' onClick={onClick}>{text}</button>

        </div> 
    );
};

export default Button;