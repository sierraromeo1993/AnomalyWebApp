import React from 'react';





/* A Component which is a Button either Test or Train  */
const Button = ({text,type,setActiveButton,name,showTD,showAD}) => {

    const onClick = (e) => {
        console.log(type);   
        setActiveButton(type);
        if(type === 'Train'){showTD(false);showAD(true)};
        if(type === 'Test'){showAD(false);showTD(true)};
        
                   }
    
    return (
        <div>
         <button className={name} onClick={onClick}>{text}</button>

        </div> 
    );
};

export default Button;