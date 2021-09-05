import React, { Component } from 'react';


class Like extends Component {
    
    render() { 

        let hclass = "fa fa-heart";
        const {liked,onLike} = this.props;
        if(!liked){
            hclass += '-o';
        }
        return (  
            <i style={{cursor:'pointer'}} 
            onClick={onLike} 
            className={hclass} 
            aria-hidden="true"></i>
         );
    }
}
 
export default Like;