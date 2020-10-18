import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsappclone-mern-backend.herokuapp.com",
});

export default instance;
