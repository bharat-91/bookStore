import Cookies from "js-cookie";
import { useState, createContext, useContext, useEffect } from "react";


const initialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: "",
    role: "",
    password: "",
};

const initialState = {
    setUser: () => { },
    user: initialUserValue,
    signOut: () => { },
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {

    const [userData, setUserData] = useState(initialUserValue);
    // const navigate = useNavigate();

    const setUser = (data) => {
        // console.log(data);
        Cookies.set("userInfo", JSON.stringify(data));
        localStorage.setItem("userInfo", JSON.stringify(data))
        localStorage.setItem("userID", JSON.stringify(data.id))
        setUserData(data);
    };
    const signOut = () => {
        setUserData(initialUserValue);
        localStorage.removeItem("userInfo")
        localStorage.removeItem("userID")
        // navigate("/")
        Cookies.remove("userInfo"); 
    };

    useEffect (() => {
        const data = JSON.parse(localStorage.getItem("userInfo")) || initialUserValue;

        if(!data.email){
            // navigate("/");
        }
        setUserData(data);
    },[]);

    // console.log(userData);
    return <AuthContext.Provider value={{ setUser, user : userData, signOut }}>{children}</AuthContext.Provider>
};

export default AuthWrapper;

export const useAuthContext = () =>{
    return useContext(AuthContext)
}