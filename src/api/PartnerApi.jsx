import axios from "axios";

let token = localStorage.getItem("token");
let user_id = localStorage.getItem("user_id");

export function postJoinPartner(payload){
    let fetching = axios.post(`/api/partner/add/${user_id}`,payload ,
    {headers: {Authorization : `Bearer ${token}`}}
    );
    return fetching;
}


