import axios from "axios";
import { AuthToken } from "./auth_token";
import { catchAxiosError } from "./error";

export const postNotes = async ({ albumName, note, }) => {
  const data = new URLSearchParams({ id: 7, title: albumName, body: note });
  const res = await post("https://jsonplaceholder.typicode.com/posts", data).catch(catchAxiosError);
  if (res.error && res.error.status) {
    return res.error;
  }
  if (res.data) {
    return res.data;
  }
  return "Something unexpected happened!";
};

export const getData = async (url) => {
  const res = await get(url).catch(catchAxiosError);
  if (res.error && res.error.status) {
    return res.error;
  }
  if (res.data) {
    return res.data;
  }
  return "Something unexpected happened!";
}

const spotifyConfig = {
  headers: {
    'Authorization': 'Bearer ' + AuthToken.getToken()
  }
};

const post = (url, data) => {
  return axios.post(url, data).catch(catchAxiosError);
};

const get = (url) => {
  return axios.get(url, spotifyConfig).catch(catchAxiosError);
}
