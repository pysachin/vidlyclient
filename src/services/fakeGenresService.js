
export const genres = [

    {_id:1,name:"Action"},
    {_id:2,name:"Comedy"},
    {_id:3,name:"Thriller"},
];

export function getGenres(){

    const allGenres = [{_id:0,name:"All Genres"} , ...genres]

    return allGenres;
}

export function getGenres_(){

    const allGenres = [...genres]

    return allGenres;
}
