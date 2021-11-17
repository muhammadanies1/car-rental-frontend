import axios from "axios";

let token = localStorage.getItem("token");

export function LoginApi(payload) {
    let fetching = axios.post(`/api/authenticate`,payload);
    return fetching;
}

export function getData(url) {
    let fetching = axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return fetching;
}

