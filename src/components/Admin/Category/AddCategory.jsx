import React from "react";
import "../Books/AddBooks.css";
import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import categoryService from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const AddCategory = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Enter Category Name, "),
  });

  const handleSubmit = async (values) => {
    const payload = {
      name: values.categoryName,
    };
    console.log(payload);

    await categoryService
      .AddCategory(payload)
      .then((response) => {
        toast.success("Category Added Sucsessful", { position: "top-right" });
        navigate("/CategoryInfo");
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
          <u>Add Category</u>
        </Typography>{" "}
        <br /> <br />
        <div id="addbook-container">
          <Formik
            initialValues={{ categoryName: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors, handleBlur }) => {
              console.log(errors);
              return (
                <Form>
                  <div id="addbook-components">
                    <br />
                    <br />
                    <br />
                    <br />
                    <TextField
                      id="categoryName"
                      label="Enter Name of Category....."
                      size="medium"
                      name="categoryName"
                      variant="outlined"
                      type=""
                      value={values.categoryName}
                      error={errors.categoryName}
                      onChange={(e) =>
                        setFieldValue("categoryName", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />

                    <FormHelperText error>
                      <ErrorMessage name="categoryName" />
                    </FormHelperText>
                    <br />

                    <div>
                      <Button
                        type="submit"
                        className="Cbtn"
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
                      <br />
                      <br />
                      <br />
                      <br />
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

export default AddCategory;

// import React, { useState, useContext, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Contextpage from "../../ContextPage";

// const initialValues = {
//   name: "",
// };

// const AddCategory = () => {
//   const { getCategory } = useContext(Contextpage);
//   const navigate = useNavigate();

//   const { values, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     onSubmit: (values, action) => {
//       var config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: "https://book-e-sell-node-api.vercel.app/api/category",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify(values),
//       };

//       axios(config)
//         .then(function () {
//           toast.success("Category added successfully");
//           getCategory();
//           navigate("/category");
//         })
//         .catch(function () {
//           toast.error("Invalid");
//         });

//       action.resetForm();
//     },
//   });

//   useEffect(() => {}, []);

//   return (
//     <div className="py-8">
//       <div className="flex justify-center flex-col items-center p-4">
//         <h1 className="text-4xl font-bold text-center p-3">Add New Category</h1>
//         <div className="w-40 h-1 bg-red-400 rounded-full"></div>
//       </div>

//       {/* <====== SignUp Form ===========> */}
//       <form
//         method="POST"
//         onSubmit={handleSubmit}
//         className="flex justify-center items-center gap-5"
//       >
//         <div className="border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]">
//           <TextField
//             type="text"
//             id="outlined-basic"
//             label="Category Name"
//             variant="outlined"
//             name="name"
//             className="w-full"
//             autoComplete="off"
//             value={values.name}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />

//           <Button type="submit" variant="contained">
//             Add Category
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;
