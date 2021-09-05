import React from 'react';
import Form from './form';
import  Joi  from 'joi-browser';
import {getGenres} from '../services/GenresService';
import { getMovieById,saveMovie } from '../services/MovieService';

class AddMovieForm extends Form {
    
    state = {
        data: {          
            title :"",
            genreId : "",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres:[],
        error:{}
    }

    schema = {
        _id :Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
    }

    async populateGenres(){
        const {data:genres} = await getGenres();
        this.setState({genres});
    }
    
    async populateMovie(){
       try {
            const movieId = this.props.match.params.id;
            if(movieId === "new") return;
        const {data:movie} = await getMovieById(movieId);
        this.setState({data: this.mapToViewModel(movie)});        
       }
       catch(ex){
           if(ex.response && ex.response.status === 404)
               this.props.history.replace("/not-found");
       }
    }

    async componentDidMount(){

      await this.populateGenres();
      await this.populateMovie();

    }

    mapToViewModel(movie){       
        return{
            _id: movie._id,
            title: movie.title,  
            genreId: movie?.genre?._id,              
            numberInStock: movie.numberInStock,
            dailyRentalRate : movie.dailyRentalRate
        };
    }

    doSumbit =async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    render() { 
        return ( 
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                <legend>Movie Form</legend>
                {this.renderInput('title','Title')}
                {this.renderDropDown("genreId","Genres",this.state.genres)}
                {this.renderInput('numberInStock','Number In Stock','number')}     
                {this.renderInput('dailyRentalRate','Rate')}               
                {this.renderButton('Save')}
                </fieldset>
                </form>
               
            </div>
        );
    }
}
 
export default AddMovieForm;