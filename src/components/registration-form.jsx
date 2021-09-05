import React, { Component } from 'react';
import Form from './form';
import  Joi  from 'joi-browser';
import {register} from '../services/UserService';
import {loginWithJwt} from '../services/AuthService';

class RegisterForm extends Form {
    
    state = {
        data: {
            email:"",
            username:"",
            password:""    
        },
        error:{}
    }

    schema = {
        email: Joi.string().email().required().label('Email'),
        username: Joi.string().required().label('Username'),
        password: Joi.string().min(5).required().label('Password')
    }

    doSumbit =async () => {

        try {
            
        const response =  await register(this.state.data);    
        loginWithJwt(response.headers['x-auth-token'])        
        window.location = '/';
        } catch (ex) {
            console.log(ex);
            if(ex.reponse && ex.response.status === 400){
                const errors = {...this.state.erros};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
        
        //console.log("Submitted");
    }

    render() { 

        return ( 
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                <legend>Register</legend>
                {this.renderInput('email','Email','email')}
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password','password')}               
                {this.renderButton('Register')}
                </fieldset>
                </form>
               
            </div>
        );
    }
}
 
export default RegisterForm;