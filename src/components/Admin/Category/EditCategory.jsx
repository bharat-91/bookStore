import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './userinfo.css'
import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import categoryService from "../../../services/categoryService";
import Cookies from "js-cookie";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const EditCategory = () => {
  const [editCategoryId, setEditCategoryId] = useState();
  const [editCategoryName, setEditCategoryName] = useState();

  useEffect(() => {
    setEditCategoryId(Cookies.get("categoryId"));
    setEditCategoryName(Cookies.get("categoryName"));
  }, []);

  const handleSubmit = async (values) => {
    if (!values.categoryId) {
      values.categoryId = editCategoryId;
    }
    if (!values.categoryName) {
      values.categoryName = editCategoryName;
    }

    const payload = {
      id: editCategoryId,
      name: values.categoryName,
    };
    console.log(payload);

    await categoryService
      .EditCategory(payload)
      .then((res) => {
        toast.success("Category Edited Sucsessfully", {
          position: "top-right",
        });
        navigate("/CategoryInfo");
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
          <u>Edit Category</u>
        </Typography>
        <br /> <br />
        <div id="addbook-container">
          <Formik
            initialValues={{ categoryName: "", categoryId: "" }}
            // validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors, handleBlur }) => {
              console.log(errors);
              return (
                <Form>
                  <div id="addbook-components">
                    <h2>Category Id : </h2>
                    <TextField
                      disabled
                      id="categoryId"
                      name="categoryId"
                      type=""
                      variant="outlined"
                      value={editCategoryId}
                      sx={{
                        width: 150,
                      }}
                    />
                    <br />
                    <br />

                    <h4>Category Name : {editCategoryName}</h4>

                    <TextField
                      defaultValue={editCategoryName}
                      id="categoryName"
                      label="Category Name"
                      name="categoryName"
                      variant="outlined"
                      value={values.categoryName}
                      error={errors.categoryName}
                      type=""
                      onChange={(e) =>
                        setFieldValue("categoryName", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />

                    <br />
                    <br />
                    <br />
                    <div>
                      <Button
                        type="submit"
                        className="pink-btn btn"
                        variant="contained"
                        disableElevation
                        sx={{
                          ":hover": {
                            bgcolor: "#008094",
                            color: "white",
                          },
                        }}
                      >
                        Make Changes
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

export default EditCategory;

// import React, { useState, useContext, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import axios from "axios";
// import Contextpage from "../../../ContextPage";

// const EditCategory = () => {
//   const { id } = useParams();

//   const { LoadinContainer, getCategory } = useContext(Contextpage);
//   const [getCategoryid, setCategory] = useState([]);

//   const navigate = useNavigate();

//   const getCategorybyId = () => {
//     var config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `https://book-e-sell-node-api.vercel.app/api/category/byId?id=${id}`,
//       headers: {},
//     };

//     axios(config)
//       .then(function (response) {
//         setCategory(response.data.result);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     getCategorybyId();
//     LoadinContainer();
//   }, []);

//   const initialValues = {
//     id: id,
//     name: "",
//   };

//   const { values, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     onSubmit: (values, action) => {
//       var config = {
//         method: "put",
//         maxBodyLength: Infinity,
//         url: "https://book-e-sell-node-api.vercel.app/api/category",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify(values),
//       };

//       axios(config)
//         .then(function () {
//           toast.success("Category Edit successfully");
//           getCategory();
//           navigate("/category");
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
//         <h1 className="text-4xl font-bold text-center p-3">Edit Category</h1>
//         <div className="w-40 h-1 bg-red-400 rounded-full"></div>
//       </div>

//       <form
//         method="POST"
//         onSubmit={handleSubmit}
//         className="flex justify-center items-center gap-5"
//       >
//         <div className="border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]">
//           <h1>Current Category : {getCategoryid.name}</h1>

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
//             Edit Category
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditCategory;
