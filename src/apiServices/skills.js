import http from "./http";
const api = "/skills";


//get skills

export function getSkills(token) {
    return http.get(api, token);
}


//update skill