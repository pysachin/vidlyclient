

export const genres_ = [

    {_id:1,name:"Action"},
    {_id:2,name:"Comedy"},
    {_id:3,name:"Thriller"},
];

const movies = [
    {
        _id:"1",
        title:"Terminator",
        genre: {_id:"1",name:"Action"},
        numberInStock:6,
        dailyRentalRate:2.5,
        publishDate: "2018-01-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"2",
        title:"Terminator 2",
        genre: {_id:"1",name:"Action"},
        numberInStock:6,
        dailyRentalRate:0.5,
        publishDate: "2019-01-03T19:04:28.809Z",
        liked: false
    },
    {
        _id:"3",
        title:"City",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"4",
        title:"City 4",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"5",
        title:"City 5",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"6",
        title:"City 6",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"7",
        title:"City 7",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"8",
        title:"City 8",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"9",
        title:"City 9",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"10",
        title:"City 10",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"11",
        title:"City 11",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    },
    {
        _id:"12",
        title:"City 12",
        genre: {_id:"2",name:"Comedy"},
        numberInStock:2,
        dailyRentalRate:2.0,
        publishDate: "2020-02-03T19:04:28.809Z",
        liked: true
    }
]

export function getMovies(){
    return movies;
}

export function getMoviesById(id){
    return movies.find(m => m._id === id); 
}

export function filterMoviesByGenreName(genre){
    return movies.filter( m => m.genre.name === genre.name); 
}

export function filterMoviesByTitle(title){
    return movies.filter( m => m.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase())); 
}

export function saveMovie(movie){
    
    let movieInDb = movies.find(m => m._id == movie._id) || {};
    movieInDb.title = movie.title;
    movieInDb.genre = genres_.find(g => g._id == movie.genreId);
    movieInDb.numberInStock = movie.numberInStock;
    movieInDb.dailyRentalRate = movie.dailyRentalRate;
   
    if(!movieInDb._id) {
        movieInDb._id = Date.now().toString();
        movies.push(movieInDb);
    }

    return movieInDb;
}



