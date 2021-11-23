import axios from "axios";

let token = localStorage.getItem("token");
let user_id = localStorage.getItem("user_id");

export function getDataAdminByUserId(url){
    let fetching = axios.get(url);
    return fetching;
}