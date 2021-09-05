import React, { Component } from 'react';
import {getMovies,filterMoviesByGenreName,filterMoviesByTitle} from '../services/MovieService';
import {getGenres} from '../services/GenresService';
import {pagination} from '../utils/pagination';
import ListGroup from './list/list-group';
import MovieTable from './moviesTable'
import Pagination from './pagination'
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Movies extends Component {

    state = { 
        movies : [],
        genres : [],
        pageSize: 3,
        currentPage:1,       
        selectedGenre : {_id:0,name:"All Genres"},
        sortColumn : { path : 'title' , orderBy : 'asc' },
        searchQuery : ""
     }

    
    async componentDidMount( ){        

        const {data} = await getGenres();    
        const genres = [{_id:0,name:"All Genres"},...data];            
        // console.log(genres);
        const {data:movies} = await getMovies();
        // console.log(movies);
        this.setState({movies,genres});


    }

    handleDelete = (m)=>{        
        const fmovies = this.state.movies.filter(f => f._id !== m._id);
        this.setState({movies : fmovies});
    }

    handleLike = (m)=>{     
        const {movies} = this.state;        
        m.liked = !m.liked;
        this.setState({movies});        
    }

    handlePageChange = (page) =>{

        this.setState({currentPage:page});
    }

    handleListClick = async (genres) =>{

        let  movies;
        //console.log(genres._id);
        if(genres._id !== 0)
        {
            movies = await filterMoviesByGenreName(genres);            
        }else{
            const { data } = await getMovies();    
            movies =  data;   
            //console.log(movies);
        }
        
        this.setState({movies , selectedGenre: genres , currentPage:1});  
        // console.log(genres.name);
        //console.log(fmovies);
    }
    handleSort = (sortColumn) => {
        this.setState({sortColumn})       
    }
    
    handleChange = ({currentTarget: input}) => {
        const {value} = input;              
        let  movies = filterMoviesByTitle(value);        
        this.setState({movies , selectedGenre: {} , currentPage:1});       
    }
    

    render() { 

        const {length:count} = this.state.movies;

        if( count === 0 )
        return (
            
            <div className="row mt-2">  
                
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres} 
                    selectedItem = {this.state.selectedGenre}
                    onItemSelect ={this.handleListClick}
                    />
                </div>       
                <div className="col-10">
                <Link to="/addmovie/new" className="btn btn-primary" >New Movie</Link> 
                <p>No Movie In Database !!!</p>
                </div>                  
            </div>
        
        );
        
        const sort = _.orderBy(this.state.movies,this.state.sortColumn.path,this.state.sortColumn.orderBy);
        const movies = pagination(sort,this.state.currentPage,this.state.pageSize);

        return (  
        
        <div className="row mt-2">
            
            <div className="col-2">
                <ListGroup 
                items={this.state.genres} 
                selectedItem = {this.state.selectedGenre}
                onItemSelect ={this.handleListClick}
                />
            </div>
            <div className="col-10">
                <Link to="/addmovie/new" className="btn btn-primary" >New Movie</Link> 
                <p>Showing {count} Movie In Database !!!</p>   
                <input className="form-control" placeholder="Search..." onChange={this.handleChange} />           
                <MovieTable 
                    movies={movies}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                    sortColumn={this.state.sortColumn}
                />
                <Pagination 
                    itemCount={count}
                    pageSize={this.state.pageSize} 
                    onPageChange={this.handlePageChange} 
                    currentPage={this.state.currentPage}
                />           
            </div>
        </div>
            
            
        );
    }
}
 
export default Movies
