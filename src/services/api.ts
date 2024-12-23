import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const getPosts = () => API.get("/posts");
export const getPost = (id: string) => API.get(`/posts/${id}`);
export const createPost = (data: any) => API.post("/posts", data);
export const updatePost = (id: string, data: any) => API.put(`/posts/${id}`, data);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
