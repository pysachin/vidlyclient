import React from 'react';


const Select = ({name,label,options,error,onChange,...rest}) =>{

    return (
        <div className="form-group">
            <label className="form-label"  htmlFor={name} style={{marginRight:"1rem"}}>{label}</label>
            <select name={name} id={name} onChange={onChange} className="form-control">
                <option value="" />
                {options.map(g =>(
                    <option key={g._id} value={g._id}>
                        {g.name}
                    </option>
                    ))}
            </select>
            {error && <div className="alert alert-danger" > {error} </div>}
        </div>
    );
};

export default Select;