import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user"

class UserService {


    GetAllUsers = async () => {
        return axios.get(`${BASEURL}/all`)
    }

    DeleteUser = async (id) => {
        return axios.delete(`${BASEURL}/?id=${id}`)
    };

    GetUserById = async(id) => {
        return axios.get(`${BASEURL}/byId?id=${id}`)
    }
    EditUser = async(payload) => {
        console.log(payload);
        return axios.put(`${BASEURL}`, payload)
    }
    
}


export default new UserService();