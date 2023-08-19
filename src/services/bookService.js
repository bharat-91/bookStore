import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class BookService {


    GetAllBooks = async(payload) => {
        return axios.get(`${BASEURL}/book/all`, payload);
    };

    GetBookById = async(id) => {
        return axios.get(`${BASEURL}/book/byid?id=${id}`);
    };

    searchBooks = async (filters) => {
        return axios.get(`${BASEURL}/book/search?keyword=${filters.keyword}`);
    };

    DeleteBook = async (id) => {
        return axios.delete(`${BASEURL}/book?id=${id}`);
    };

    AddBook = async(payload) => {
        return axios.post(`${BASEURL}/book`, payload);
    };

    EditBook = async(payload) => {
        return axios.put(`${BASEURL}/book`, payload);
    };
    
}

export default new BookService();