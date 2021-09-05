import React, { Component } from 'react';

class MovieDescription extends Component {
    state = {  }

    handleSave=()=>{
        this.props.history.push('/movies');       
    }

    render() { 
        return ( 
        <div>
            <h3>Movie Description</h3>    
            <h6>Name : {this.props.match.params.name}</h6>
            <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
        </div>  );
    }
}
 
export default MovieDescription;