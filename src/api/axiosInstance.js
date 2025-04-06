import axios from "axios";

export const api = axios.create({
    baseURL: 'https://foodies-backend-eight.vercel.app/api/v1',
    // baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})