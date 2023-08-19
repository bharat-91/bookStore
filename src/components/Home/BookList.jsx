import React, { useContext, useEffect, useState } from "react";
import Contextpage from "../../ContextPage";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import cartService from "../../services/cartServise";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

const BookList = () => {
  const User = useContext(AuthContext);
  const userId = User.user.Id;
  // const { AddCart } = useContext(Contextpage);
  // get products items
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // get api info
  const [apidata, getApidata] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({});

  const handleAddToCart = async (product) => {
    // const Payload = {
    //   bookId: product.id,
    //   userId: "2784",
    //   quantity: 1,
    // };
    console.log("2121", product);

    await cartService
      .AddItemToCart(product)
      .then((response) => {
        console.log("data added sucessfully");
        toast.success("Book Added to Cart", { position: "top-right" });
        navigate("/Cart");
      })
      .catch((error) => {
        toast.error("Invalid !!!", { position: "top-right" });
        console.log(error);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getBooks = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://book-e-sell-node-api.vercel.app/api/book?pageSize=8&pageIndex=${page}&keyword=${search}`,
      headers: { "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        const result = response.data.result;
        setProducts(result.items);
        getApidata(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBooks();
  }, [page, search]);

  // filter products logic

  const FilterAtoZ = (e) => {
    var item = e.target.value;
    // console.log(item);
    if (item === "1") {
      setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (item === "2") {
      setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
    }
  };

  return (
    <>
      <div className="mainmain">
        <h1 className="product-main">Products</h1>
        <div className="custome-bar"></div>
      </div>

      <div className="total-heading">
        {/* product navbar */}
        <div className="custome-container">
          <h1 className="custom-heading">Total - {apidata.totalItems} items</h1>
          <input
            type="text"
            className="custome-input"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            name="sortby"
            placeholder="Sort By"
            className="custome-select"
            onChange={(e) => FilterAtoZ(e)}
          >
            <option value="1">a - Z</option>
            <option value="2">z - A</option>
          </select>
        </div>

        <div className="bookContainer">
          {products.map((product) => (
            <div className="main-card" key={product.id}>
              <div className="card-img">
                <img
                  src={product.base64image}
                  alt="load_img"
                  className="card-img"
                />
              </div>
              <div className="desc">
                <div className="detail">
                  <h3 className="desc-name">{product.name}</h3>
                  <h3 className="desc-cat">{product.category}</h3>
                  <h3 className="desc-price">{product.price}</h3>
                  {/* <h3 className="desc-price">{product.description}...</h3> */}
                </div>
                <button
                  className="Bbtn"
                  onClick={() => handleAddToCart(product)}
                >
                  {/* onClick={() => AddCart(product.id)} */}
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              sx={{ backgroundColor: "white" }}
              count={apidata.totalPages}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
        {/* <MDBPagination size="sm" className="mb-0">
          <MDBPaginationItem active>
            <MDBPaginationLink tag="span">
              1<span className="visually-hidden">(current)</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">2</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#">3</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination> */}
      </div>
      <Footer />
    </>
  );
};

export default BookList;
