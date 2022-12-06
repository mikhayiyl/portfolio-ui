import { useReducer } from "react";
import { createContext } from "react";
import { currentUser } from "../../services/authService";
import UserReducer from "./AppReducer";


const initialState = {
    user: null,
    jwtUser: currentUser(),
    allusers: [],
    onlineusers: [],
    onlinefriends: [],
    requests: [],
    otherUsers: [],
    isLoading: false,
    isfriend: false,
    currentChat: null,
    socket: null,
    livechats: [],
    theme: localStorage.getItem("theme"),
    error: null,
}

const AppContext = createContext(initialState);


export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);
    return <AppContext.Provider value={{ state, dispatch }} >{children}</AppContext.Provider>
}

export default AppContext;