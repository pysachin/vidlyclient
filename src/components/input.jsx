import React from 'react';

const Input = ({id,value,onChange,label,type,error}) => {
    return ( 

<div className="mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <input 
     value={value}
     onChange={onChange}
     name={id}
     type={type} className="form-control" id={id} aria-describedby="emailHelp" />    
     {error && <div className="alert alert-danger">{error}</div>}
</div>

);
}
 
export default Input;