import React from 'react';



// General button for Train Test, this button for now is being 
// to test all our requests to the server 


const Button = ({text,onAdd,onDelete,onGet,type,setActiveButton,activeButton,name,showTD,showAD}) => {
    // create object 
    const onClick = (e) => {
        console.log(type);   
        setActiveButton(type);
        if(type === 'Train'){showTD(false);showAD(true)};
        if(type === 'Test'){showAD(false);showTD(true)};
        
       

        //onGet().then(result=>  {console.log(result)});
        
                   }
    
    return (
        <div>
         <button className={name} onClick={onClick}>{text}</button>

        </div> 
    );
};

export default Button;