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
    list : async (userId) =>{
        const response = await client.get(`/api/notes`, { params: userId ? { userId } : {} })
        return response.data;
    },

    create : async (payload) =>{
        const response  = await client.post(`/api/notes`, payload)
        return response.data;
    },

    update : async (id, payload) =>{
        const response = await client.put(`/api/notes/${id}`, payload)
        return response.data;
    },

    remove : async (id) =>{
        const response = await client.delete(`/api/notes/${id}`)
        return response.data;
    }
}