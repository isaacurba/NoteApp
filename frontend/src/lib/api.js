import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const client = axios.create(
    {
        baseURL: API,
        headers: {
            "Content-Type": "application/json"
        }
    }
);

// Notes Endpoints
export const NotesAPI = {
    
}