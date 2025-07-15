import axios from "axios";

export const apiFilm = axios.create({
  baseURL: "https://www.omdbapi.com/",
  params: {
    apikey: "9199c3c1",
    s: "superman",
  },
});