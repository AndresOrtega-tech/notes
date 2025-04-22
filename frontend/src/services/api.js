import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getNotes = () => axios.get(`${BASE_URL}/notes/`);
export const getNote = (id) => axios.get(`${BASE_URL}/notes/${id}`);
export const createNote = (note) => axios.post(`${BASE_URL}/notes`, note);
export const updateNote = (id, note) => axios.put(`${BASE_URL}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/notes/${id}`);