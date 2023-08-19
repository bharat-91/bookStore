import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBooks.css";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Input,
  InputLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import bookService from "../../../services/bookService";
import { toast } from "react-toastify";
import categoryService from "../../../services/categoryService";
import Cookies from "js-cookie";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const EditBook = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService
      .GetAllCategories()
      .then((response) => {
        setCategories(response.data.result);
      })
      .catch("Data Not Found");
  }, []);

  const [BookId, setBookId] = useState();
  const [BookName, setBookName] = useState();
  const [BookPrice, setBookPrice] = useState();
  const [BookCategory, setBookCategory] = useState();
  const [BookCategoryId, setBookCategoryId] = useState();
  const [BookDescription, setBookDescription] = useState();
  const [BookImage, setBookImage] = useState();

  useEffect(() => {
    setBookId(Cookies.get("BookId"));
    setBookPrice(Cookies.get("BookPrice"));
    setBookName(Cookies.get("BookName"));
    setBookCategory(Cookies.get("BookCategory"));
    setBookCategoryId(Cookies.get("BookCategoryId"));
    setBookDescription(Cookies.get("BookDescription"));
    setBookImage(localStorage.getItem("BookImage"));
  }, []);

  const [img, setImg] = useState([]);

  const imgToBase64 = (files) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (files) {
        reader.readAsDataURL(files);
      }
      reader.onload = () => {
        setImg(reader.result);
      };
    });
  };

  const handleImage = async (e, setFieldValue) => {
    const files = e.target.files[0];

    const base64Img = await imgToBase64(files);
    setFieldValue("bookImage", base64Img);
  };

  const handleSubmit = async (values) => {
    if (!values.bookName) {
      values.bookName = BookName;
    }
    if (!values.bookCategoryId) {
      values.bookCategoryId = BookCategoryId;
    }
    if (!values.bookDescription) {
      values.bookDescription = BookDescription;
    }
    if (!values.bookPrice) {
      values.bookPrice = BookPrice;
    }

    if (!img) {
      var image = BookImage;
    } else {
      var image = img;
    }

    const payload = {
      id: BookId,
      name: values.bookName,
      description: values.bookDescription,
      price: values.bookPrice,
      categoryId: values.bookCategoryId,
      base64image: img,
    };
    console.log(payload);

    await bookService
      .EditBook(payload)
      .then((response) => {
        toast.success("Book Edited Sucsessfully", { position: "top-right" });
        navigate("/AllBooks");
        Cookies.remove("BookId");
        Cookies.remove("BookPrice");
        Cookies.remove("BookName");
        Cookies.remove("BookCategory");
        Cookies.remove("BookCategoryId");
        Cookies.remove("BookDescription");
        localStorage.removeItem("BookImage");
      })
      .catch((error) => {
        toast.error("Something Went Wrong!!!", { position: "top-right" });
        console.log(error);
      });
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div id="addbook-main-container">
        <Typography variant="h3">
          <u>Edit Book</u>
        </Typography>{" "}
        <br /> <br />
        <p>Enter Details You Want to Change Otherwise Leave It</p>
        <div id="addbook-container">
          <Formik
            initialValues={{
              bookId: "",
              bookName: "",
              bookPrice: "",
              bookCategoryId: "",
              bookDescription: "",
              bookImage: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors, handleBlur }) => {
              console.log(errors);
              return (
                <Form>
                  <div id="addbook-components">
                    <h4>Book ID : </h4>

                    <TextField
                      disabled
                      id="bookId"
                      name="bookId"
                      type=""
                      variant="outlined"
                      value={BookId}
                      sx={{
                        width: 150,
                      }}
                    />

                    <br />
                    <div id="addbook-components-row">
                      <h4>Book Name : {BookName}</h4>
                      <h4>Book Price : {BookPrice}</h4>
                    </div>
                    <div id="addbook-components-row">
                      <TextField
                        id="bookName"
                        // label="Enter Name of Book"
                        name="bookName"
                        type=""
                        variant="outlined"
                        value={values.bookName}
                        onChange={(e) => {
                          setFieldValue("bookName", e.target.value);
                        }}
                        onBlur={handleBlur}
                        sx={{
                          width: 400,
                        }}
                      />

                      <TextField
                        id="bookPrice"
                        label="Enter Price of Book"
                        name="bookPrice"
                        type=""
                        variant="outlined"
                        value={values.bookPrice}
                        onChange={(e) =>
                          setFieldValue("bookPrice", e.target.value)
                        }
                        onBlur={handleBlur}
                        sx={{
                          width: 400,
                        }}
                      />
                    </div>
                    <br />
                    <div id="addbook-components-row">
                      <h4>Book Category : {BookCategory}</h4>
                      <h4>Book Image :</h4>
                    </div>
                    <InputLabel id="Category" />
                    <div id="addbook-components-row">
                      <Select
                        sx={{
                          width: 400,
                        }}
                        name="bookCategory"
                        id="bookCategory"
                        value={values.bookCategory}
                        onChange={(e) => {
                          setFieldValue("bookCategory", e.target.value);
                        }}
                      >
                        {categories?.map((categories, index) => {
                          return (
                            <MenuItem key={index} value={categories.id}>
                              {categories.name}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <Input
                        type="file"
                        id="bookImage"
                        name="bookImage"
                        value={values.bookImage}
                        onChange={(e) => {
                          handleImage(e, setFieldValue);
                        }}
                        sx={{
                          width: 400,
                        }}
                      />
                    </div>
                    <br />

                    <div>
                      <h4>Book Description : {BookDescription}</h4>
                      <TextField
                        id="bookDescription"
                        type=""
                        label="Enter description of Book..."
                        name="bookDescription"
                        variant="outlined"
                        value={values.bookDescription}
                        onChange={(e) =>
                          setFieldValue("bookDescription", e.target.value)
                        }
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </div>
                    <br />
                    <div>
                      <Button
                        type="submit"
                        className="pink-btn btn"
                        variant="contained"
                        sx={{
                          ":hover": {
                            bgcolor: "#008094",
                            color: "white",
                          },
                        }}
                      >
                        Edit Now
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditBook;

// import React, { useState, useContext, useEffect, useRef } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import axios from "axios";
// import Contextpage from "../../../ContextPage";

// const EditBooks = () => {
//   const { id } = useParams();

//   // const category = useContext(Contextpage);

//   const navigate = useNavigate();

//   const initialValues = {
//     id: id,
//     name: "",
//     description: "",
//     price: 1000,
//     categoryId: 6,
//     base64image: "",
//   };

//   const { values, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     onSubmit: (values, action) => {
//       var config = {
//         method: "put",
//         maxBodyLength: Infinity,
//         url: "https://book-e-sell-node-api.vercel.app/api/book",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify(values),
//       };

//       axios(config)
//         .then(function () {
//           toast.success("Book Edit successfully");
//           navigate("/books");
//         })
//         .catch(function () {
//           toast.error("Invalid");
//         });

//       action.resetForm();
//     },
//   });

//   return (
//     <div className="py-8">
//       <div className="flex justify-center flex-col items-center p-4">
//         <h1 className="text-4xl font-bold text-center p-3">Edit Book</h1>
//         <div className="w-40 h-1 bg-red-400 rounded-full"></div>
//       </div>

//       {/* <====== SignUp Form ===========> */}
//       <form
//         method="PUT"
//         onSubmit={handleSubmit}
//         className="flex justify-center items-center gap-5"
//       >
//         <div className="border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]">
//           <TextField
//             type="text"
//             id="outlined-basic"
//             label="Book Name"
//             variant="outlined"
//             name="name"
//             className="w-full"
//             autoComplete="off"
//             value={values.name}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <TextField
//             type="text"
//             id="outlined-basic"
//             label="Description"
//             variant="outlined"
//             name="description"
//             className="w-full"
//             autoComplete="off"
//             value={values.description}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <FormControl>
//             <InputLabel id="demo-simple-select-autowidth-label">
//               Category
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-autowidth-label"
//               id="demo-simple-select-autowidth"
//               label="roles"
//               value={values.categoryId}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               name="categoryId"
//             >
//               {/* {category.map((value) => (
//                 <MenuItem value={value.id}>{value.name}</MenuItem>
//               ))} */}
//             </Select>
//           </FormControl>

//           <TextField
//             id="outlined-basic"
//             label="Price"
//             variant="outlined"
//             className="w-full"
//             name="price"
//             autoComplete="off"
//             value={values.price}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <TextField
//             id="outlined-basic"
//             label="Book cover page"
//             variant="outlined"
//             name="base64image"
//             className="w-full"
//             autoComplete="off"
//             value={values.base64image}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />
//           <p className="text-green-600">Copy image address and paste it here</p>

//           <Button type="submit" variant="contained">
//             Add Book
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditBooks;
