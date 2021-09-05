import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({user}) => {
    return ( 
        
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <Link to="/" className="nav-brand navbar__anchor ">
            Vidly 
        </Link>
        <NavLink className="navbar__anchor " to="/movies" >Movies</NavLink>
        <NavLink className="navbar__anchor " to="/customer">Customer</NavLink>
        <NavLink className="navbar__anchor " to="/rentals">Rentals</NavLink>       
        {!user && <React.Fragment>
            <NavLink className="navbar__anchor " to="/login">Login</NavLink>    
        <NavLink className="navbar__anchor " to="/register">Register</NavLink>        
        </React.Fragment>        
        }   
        {user && <React.Fragment>
            <NavLink className="navbar__anchor " to="/profile">{user.name}</NavLink>    
        <NavLink className="navbar__anchor " to="/logout">Logout</NavLink>        
        </React.Fragment>        
        }   
    </nav>

);
}
 
export default NavBar;