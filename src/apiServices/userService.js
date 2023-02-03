import http from "./http";
const api = "/users";


//register user

export async function registerUser(user) {
    const { headers } = await http.post(api, user);
    localStorage.setItem("token", headers["x-auth-token"]);
}


//update user
export function updateUser(user) {
    const obj = { ...user }
    delete obj._id
    return http.put(api + "/" + user._id, obj);
}