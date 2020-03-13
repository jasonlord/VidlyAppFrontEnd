import http from "./httpService";

const apiEndPoint = "http://localhost:3900/api/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export async function getMovies() {
  return http.get(apiEndPoint);
}

export async function getMovie(id) {
  return http.get(apiEndPoint + "/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    console.log("movie exists with ID,", movie._id);
    const body = { ...movie };
    delete body._id;

    return http.put(apiEndPoint + "/" + movie._id, body);
    console.log("made a reqwuest to ", apiEndPoint + "/" + movie._id);
  } else {
    console.log("shoiuldne be here");
    return http.post(apiEndPoint, movie);
  }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
