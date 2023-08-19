import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WithAuth = (Component) => {

    const Authenticaiton = () => {

        const email = Cookies.get("auth_email");
        const navigate = useNavigate();

        useEffect(() => {
            if(!email){
                toast.error("Please Login!!!")
                navigate("/login");
            }
        }, [email]);
        
        return email ? <Component /> :null;
    };
    return Authenticaiton;
};

export default WithAuth;