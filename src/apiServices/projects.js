import http from "./http";
const api = "/projects";


//get skills

export function getProjects(token) {
    return http.get(api, token);
}
export function getProject(id, token) {
    return http.get(api + "/" + id, token);
}
