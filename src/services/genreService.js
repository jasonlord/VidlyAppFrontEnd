import axios from "axios";

const apiEndPoint = "http://localhost:3900/api/genres";

export async function getGenres() {
  const { data: genres } = await axios.get(apiEndPoint);
  //console.log("response", genres);
  return genres;
}
