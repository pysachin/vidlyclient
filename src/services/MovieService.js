import http from "./httpservice";
import config from "../config.json";

const proxyUrl = config.apiUrl + "/movies";

let movies = [];

function getMovieUrl(id) {
  return `${proxyUrl}/${id}`;
}

export async function getMovies() {
  return await http.get(proxyUrl);
}

export function getMovieById(id) {
  return http.get(getMovieUrl(id));
}

export function deleteMovie(movieId) {
  return http.delete(getMovieUrl(movieId));
}

export async function filterMoviesByGenreName(genre) {
  const { data: movies } = await getMovies();
  return movies.filter((m) => m.genre.name === genre.name);
}

export function filterMoviesByTitle(title) {
  return movies.filter((m) =>
    m.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase())
  );
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body.id;
    return http.put(getMovieUrl(movie._id), body);
  } else {
    return http.post(proxyUrl, movie);
  }
}
