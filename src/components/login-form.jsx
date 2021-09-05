import React from 'react';
import  Joi  from 'joi-browser';
import Form from './form';
import {login,getUser} from '../services/AuthService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {

   
    state = {
        data: {
            username:"",
            password:""    
        },
        error:{}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    componentDidMount(){
        // this.username.current.focus();
    }

    doSumbit =async () => {
        try {
            const {data} = this.state;
            await login(data.username,data.password);     
            
            const {state} = this.props.location;

            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if(error.reponse && error.response.status === 400)   {
                const errors = {...this.state.errors};
                errors.username = error.response.data;
                this.setState({errors});
            }
        }        
    }

    render() { 
        
        if(getUser()) return <Redirect to="/" />

        return ( 
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                <legend>Login</legend>
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password','password')}               
                {this.renderButton('Login')}
                </fieldset>
                </form>
               
            </div>
        );
    }
}
 
export default LoginForm;