import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";
import api from "../components/apiConfig";

export const AuthContext = createContext();
const initialState = { user: null };
const reducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            localStorage.removeItem("token");
            toast.success("Logout Successfully")

            return {
                ...state,
                user: null
            }
        default:
            return state
    }

}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        const getCurrentUser = async () => {
            var token = JSON.parse(localStorage.getItem("token"))
            console.log({token}, "37");
            if (token) {
                try {
                    console.log("token",token);
                    const response = await api.post("/all/get-current-user", {token})
                    console.log(response,"42");
                    if (response.data.success) {
                        dispatch({
                            type: "LOGIN",
                            payload: response.data.user
                        })
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }

        getCurrentUser();

    }, [])

    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>

}

export default AuthProvider