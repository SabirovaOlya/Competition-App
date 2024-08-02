import axios from "axios";

export const https = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    // withCredentials: true,
    headers: {
        'Accept': 'application/json;charset=utf-8',
        // 'Authorization': "Bearer " + window.localStorage.getItem('token'),
    }
})
