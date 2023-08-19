import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class cartService {

    


    AddItemToCart = async (product) => {
        const Payload = {
            bookId: product.id,
            userId: 2784,
            quantity: 1,
          };
        console.log(Payload);
        return axios.post(`${BASEURL}/cart`, Payload);
    }

    GetCartList = async (id) => {
        return axios.get(`${BASEURL}/cart?userId=${id}`);
    }

    UpdateItem = async (payload) => {
        return axios.put(`${BASEURL}/cart`, payload);
    }

    DeleteItem = async (id) => {
        return axios.delete(`${BASEURL}/cart?id=${id}`);
    }

    ConfirmOrder = async (payload) => {
        return axios.post(`${BASEURL}/order`, payload);
    }
}

export default new cartService();