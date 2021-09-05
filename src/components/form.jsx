import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import Input from './input'
import Select from './select'

class Form extends Component {
    
    state = {
        data: {},
        error:{}
    }

    validate=()=>{

        const {error} = Joi.validate(this.state.data,
            this.schema,{abortEarly:false});
        
       if (!error) return null;
            
       const errors = {};
           
       for (let item of error.details) {             
           errors[item.path[0]] = item.message;
       }
       
       return Object.keys(errors) === 0 ? null : errors;

   }

   validateProperty=({name,value})=>{
  
    const obj = {[name]:value};
    const schema = {[name]: this.schema[name]}; 
    const {error} = Joi.validate(obj,schema);
    return error ? error.details[0].message : null;

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const error = this.validate();
       
        if(error)
        {
            this.setState({error:error || {}})
            return;
        }
        
        this.doSumbit();
    }

    
    handleChange = ({currentTarget: input}) => {

        const error = {...this.state.error};

        const errorMessage = this.validateProperty(input);
        
        if(errorMessage){
            error[input.name] = errorMessage;
        }else{
            delete error[input.name];
        }

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data,error});
    }

    renderButton(label){
        return (
            <button 
            // disabled={this.validate()} 
            type="submit" 
            className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput(name,label,type="text"){
        const {data,error} = this.state;
        return (
        <Input 
            id={name}
            name={name}
            value={data[name]}
            onChange={this.handleChange}
            type={type}
            label={label}
            error={error[name]}
        />

        );
    }

    renderDropDown(name,label,options){
        const {data,error} = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={error[name]}
            />            
        );
    }
   
}
 
export default Form;