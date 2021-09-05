import React, { Component } from 'react';
import Like from './like';
import TableHeader from './table-header'
import TableBody from './table-body'
import { Link } from 'react-router-dom';
import auth from '../services/AuthService';

class MovieTable extends Component {
    
    columns = [
        {
            path:'title',
            label:'Title',
            content : movie => <Link to={`/addmovie/${movie._id}`} id=""> {movie.title} </Link>

        }, 
        {path:'genre.name',label:'Genre'},
        {path:'numberInStock',label:'Stock'},
        {path:'dailyRentalRate',label:'Rate'},
        {key:'like', 
        content : (

              m =>  <Like liked={m.liked} onLike={()=> this.props.onLike(m)} />
        )    
        },        
    ]

    deleteColumn = {key:'delete',
        content: (
            m => <button 
                    onClick={()=> this.props.onDelete(m)}                                
                    className="btn btn-danger btn-sm"
                >   
                Delete
                </button>
        )
    };
    
    constructor(){
        super();
        const user = auth.getUser();
        if(user && user.isAdmin){
            this.columns.push(this.deleteColumn);
        }
    }

    render() { 

        const {movies, sortColumn,onSort} = this.props

        return (  

            <div>
            <table className="table">

            <TableHeader 
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />            

            <TableBody 
                data = {movies}
                columns={this.columns}
            />
            {/* <tbody>
                {
                    movies?.map(
                        m => (

                        <tr key={m._id}> 
                            <th scope="row">{m.title}</th>
                            <td>{m.genre.name}</td>
                            <td>{m.numberInStock}</td>
                            <td>{m.dailyRentalRate}</td>
                            <td>
                                <Like liked={m.liked} 
                                onLike={()=> onLike(m)}                                 
                                />
                            </td>
                            <td>
                                
                            </td>
                        </tr>

                        )
                    )
                }
                
            </tbody> */}
        </table>
    </div>

        );
    }
}

export default MovieTable; 