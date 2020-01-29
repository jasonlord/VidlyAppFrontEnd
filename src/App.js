import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";

function App() {
  return <Movies />;
}

export default App;
