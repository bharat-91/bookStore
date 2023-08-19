import React, { useState } from "react";
import "./AddBooks.css";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  makeStyles,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import bookService from "../../../services/bookService";
import { toast } from "react-toastify";
import categoryService from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const AddBooks = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    bookName: Yup.string().required("Enter Book Name, "),
    bookDescription: Yup.string().required("Enter Valid Description, "),
    bookPrice: Yup.number().required("Enter Price, "),
    bookCategory: Yup.number().required("Choose Category, "),
  });

  const [img, setImg] = useState([]);
  const [categories, setCategories] = useState([]);

  const GetAllCategories = () => {
    categoryService.GetAllCategories().then((response) => {
      setCategories(response.data.result);
    });
  };

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
    setFieldValue("image", base64Img);
  };

  const handleSubmit = async (values) => {
    const payload = {
      base64image: img,
      categoryId: values.bookCategory,
      description: values.bookDescription,
      name: values.bookName,
      price: values.bookPrice,
    };

    await bookService
      .AddBook(payload)
      .then(() => {
        toast.success("Book Added Sucsessful", { position: "top-right" });
        navigate("/AllBooks");
      })
      .catch((error) => {
        toast.error("Something Went Wrong!!!", { position: "top-right" });
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div id="addbook-main-container">
        <Typography variant="h3">
          <u>Add Book</u>
        </Typography>{" "}
        <br /> <br />
        <div id="addbook-container">
          <Formik
            initialValues={{
              bookName: "",
              bookPrice: "",
              bookCategory: "",
              bookDescription: "",
              bookImage: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors, handleBlur }) => {
              console.log(errors);
              return (
                <Form>
                  <div id="addbook-components">
                    <div id="addbook-components-row">
                      <TextField
                        id="bookName"
                        label="Enter Name of Book"
                        name="bookName"
                        type=""
                        variant="outlined"
                        value={values.bookName}
                        error={errors.bookName}
                        onChange={(e) => {
                          GetAllCategories();
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
                        variant="outlined"
                        autoComplate="off"
                        type=""
                        value={values.bookPrice}
                        error={errors.bookPrice}
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

                      {/* <Select
                                            id="bookCategory"
                                            label="Choose Cetegory"
                                            name="bookCategory"
                                            value={values.bookCategory}
                                            error={errors.bookCategory}
                                            onChange={(e) => setFieldValue("bookCategory", e.target.value)}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 400,
                                            }}
                                        >
                                            <MenuItem value={2}>Historical Fiction</MenuItem>
                                            <MenuItem value={3}>Fantasy</MenuItem>
                                            <MenuItem value={4}>Horror</MenuItem>
                                            <MenuItem value={5}>Thriller</MenuItem>
                                            <MenuItem value={6}>Essayyyy</MenuItem>
                                            <MenuItem value={7}>Graphic novel</MenuItem>
                                            <MenuItem value={8}>Comic book</MenuItem>
                                            <MenuItem value={9}>Spirituality</MenuItem>
                                            <MenuItem value={10}>Temp Category</MenuItem>
                                            <MenuItem value={11}>Essay New</MenuItem>
                                        </Select> */}

                      <Input
                        type="file"
                        id="bookImage"
                        name="bookImage"
                        onChange={(e) => {
                          handleImage(e, setFieldValue);
                          // const files = e.target.files;
                          // setFieldValue("bookImage", e.target.value)

                          // console.log(files);
                          // const selectedFile = files[0];
                          // const reader = new FileReader();
                          // reader.readAsDataURL(selectedFile);
                        }}
                        sx={{
                          width: 400,
                        }}
                      />
                    </div>
                    <br />
                    <br />

                    <div>
                      <TextField
                        id="bookDescription"
                        label="Enter description of Book..."
                        name="bookDescription"
                        variant="outlined"
                        type=""
                        value={values.bookDescription}
                        error={errors.bookDescription}
                        onChange={(e) =>
                          setFieldValue("bookDescription", e.target.value)
                        }
                        rows={3}
                        onBlur={handleBlur}
                        sx={{
                          width: 300,
                          height: 50,
                        }}
                      />
                    </div>
                    <br />

                    <FormHelperText error>
                      <ErrorMessage name="bookName" />
                      <ErrorMessage name="bookPrice" />
                      <ErrorMessage name="bookCategory" />
                      <ErrorMessage name="bookDescription" />
                    </FormHelperText>

                    <br />
                    <br />
                    <div>
                      <Button
                        type="submit"
                        className="pink-btn Abtn"
                        variant="contained"
                        disableElevation
                        sx={{
                          bgcolor: "#AA336A",
                          color: "white",
                          ":hover": {
                            bgcolor: "#008094",
                            color: "white",
                          },
                        }}
                      >
                        ADD
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

export default AddBooks;

// import React, { useState, useContext, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import axios from "axios";
// // import Contextpage from "../../ContextPage";
// import Navbar from "../../Navbar/Navbar";
// import "./AddBooks.css";
// const initialValues = {
//   name: "",
//   description: "",
//   price: "",
//   categoryId: 3,
//   base64image: "",
// };

// const AddBooks = () => {
//   // const { category } = useContext(Contextpage);
//   const navigate = useNavigate();

//   const { values, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     onSubmit: (values, action) => {
//       var config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: "https://book-e-sell-node-api.vercel.app/api/book",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify(values),
//       };

//       axios(config)
//         .then(function () {
//           toast.success("Book added successfully");
//           navigate("/books");
//         })
//         .catch(function () {
//           toast.error("Invalid");
//         });

//       action.resetForm();
//     },
//   });

//   useEffect(() => {}, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="titleContainer">
//         <h1 className="titletext">Add New Book</h1>
//       </div>

//       <div className="formcontrol">
//         <form method="POST" onSubmit={handleSubmit}>
//           <div className="innerform">
//             <TextField
//               type=""
//               size="small"
//               id="outlined-basic"
//               label="Book Name"
//               variant="outlined"
//               name="name"
//               autoComplete="off"
//               value={values.name}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />

//             <TextField
//               type=""
//               size="small"
//               id="outlined-basic"
//               label="Description"
//               variant="outlined"
//               name="description"
//               autoComplete="off"
//               value={values.description}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />

//             <FormControl>
//               <InputLabel>
//                 {/* id="demo-simple-select-autowidth-label" */}
//                 {/* "demo-simple-select-autowidth-label" */}
//                 {/* "demo-simple-select-autowidth" */}
//                 Category
//               </InputLabel>
//               <Select
//                 labelId=""
//                 id=""
//                 label="roles"
//                 value={values.categoryId}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 name="categoryId"
//               >
//                 {/* {category.map((value) => (
//                 <MenuItem value={value.id}>{value.name}</MenuItem>
//               ))} */}
//               </Select>
//             </FormControl>

//             <TextField
//               id="outlined-basic"
//               label="Price"
//               type=""
//               size="small"
//               variant="outlined"
//               name="price"
//               autoComplete="off"
//               value={values.price}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />

//             <TextField
//               id="outlined-basic"
//               label=""
//               type="file"
//               size="small"
//               variant="outlined"
//               name="base64image"
//               autoComplete="off"
//               value={values.base64image}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             <Button type="submit" variant="contained">
//               Add Book
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBooks;
