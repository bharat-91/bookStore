import {
  Button,
  FormHelperText,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../Navbar/LoginNavbar";
import Footer from "../Footer/Footer";
import authService from "../../services/authService";
import * as Yup from "yup";
function SignUp() {
  const navigate = useNavigate("/");

  const validationSchema = Yup.object().shape({
    userFirstName: Yup.string().min(3, "Enter Proper Name,"),
    userLastName: Yup.string().min(3, "Enter Proper Name,"),
    userEmail: Yup.string()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Enter Proper Email, "
      )
      .required("Enter Email, "),
    userPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter Strong Password,"
      )
      .required("Enter Password,"),
    userRoleId: Yup.mixed().required("Select Role."),
  });

  const handleSubmit = async (values) => {
    const payload = {
      firstName: values.userFirstName,
      lastName: values.userLastName,
      email: values.userEmail,
      roleId: values.userRoleId,
      password: values.userPassword,
    };
    console.log("!11", payload);

    await authService
      .Register(payload)
      .then((response) => {
        console.log("data added sucessfully");
        toast.success("Registration Sucsessful", { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid Details!!!", { position: "top-right" });
        console.log(error);
      });
  };

  //   const [data, setData] = useState();
  //   const navigate = useNavigate();

  //   const URL = "https://book-e-sell-node-api.vercel.app/api/user";

  //   const handleSubmit = (values) => {
  //     const payload = {
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       email: values.Email,
  //       roleId: values.age,
  //       password: values.password,
  //     };

  //     axios
  //       .post(URL, payload)
  //       .then((res) => {
  //         console.log("data added sucessfully");
  //         if (res) {
  //           toast.success("Data Added Successfully", { position: "top-right" });
  //           navigate("/");
  //         }
  //       })
  //       .catch(() => {
  //         console.log("error occurs");
  //       });

  //     // console.log(values);
  //   };

  //   const validationSchema = Yup.object().shape({
  //     firstName: Yup.string().min(3, "Enter Proper Name,"),
  //     lastName: Yup.string().min(3, "Enter Proper Name,"),
  //     email: Yup.string()
  //       .matches(
  //         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  //         "Enter Proper Email, "
  //       )
  //       .required("Enter Email, "),
  //     password: Yup.string()
  //       .matches(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //         "Enter Strong Password,"
  //       )
  //       .required("Enter Password,"),
  //     userRoleId: Yup.mixed().required("Select Role."),
  //   });

  //   const getRequestData = async () => {
  //     await axios
  //       .get(`${URL}/all`)
  //       .then((res) => {
  //         setData(res.data);
  //       })
  //       .catch(() => {
  //         console.log("Data not found");
  //       });
  //   };

  //   console.log(data);

  //   useEffect(() => {
  //     getRequestData();
  //   }, []);

  return (
    <div>
      <LoginNavbar />
      <Formik
        initialValues={{
          userFirstName: "",
          userLastName: "",
          userRoleId: "",
          userEmail: "",
          userRole: "",
          userPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, setFieldValue, handleBlur }) => {
          return (
            <Form>
              <div className="form">
                <div className="form-data">
                  <Typography variant="h4" className="fancy">
                    Register
                  </Typography>
                  <div className="field">
                    <TextField
                      onBlur={handleBlur}
                      error={errors.userFirstName}
                      name="userFirstName"
                      size="small"
                      type=""
                      label="firstName"
                      variant="outlined"
                      value={values.userFirstName}
                      onChange={(e) =>
                        setFieldValue("userFirstName", e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="userFirstName" />
                    </FormHelperText>
                    <TextField
                      onBlur={handleBlur}
                      error={errors.userLastName}
                      name="userLastName"
                      size="small"
                      type=""
                      label="lastName"
                      variant="outlined"
                      value={values.userLastName}
                      onChange={(e) =>
                        setFieldValue("userLastName", e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="userLastName" />
                    </FormHelperText>
                    <TextField
                      onBlur={handleBlur}
                      error={errors.userEmail}
                      name="userEmail"
                      size="small"
                      type=""
                      label="Email"
                      variant="outlined"
                      value={values.userEmail}
                      onChange={(e) =>
                        setFieldValue("userEmail", e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="userEmail" />
                    </FormHelperText>
                    <TextField
                      onBlur={handleBlur}
                      type="password"
                      error={errors.userPassword}
                      name="userPassword"
                      size="small"
                      label="Password"
                      variant="outlined"
                      value={values.userPassword}
                      onChange={(e) =>
                        setFieldValue("userPassword", e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="userPassword" />
                    </FormHelperText>
                    <Select
                      variant="standard"
                      id="userRoleId"
                      labelId="Role"
                      name="userRoleId"
                      value={values.userRoleId}
                      error={errors.userRoleId}
                      onChange={(e) =>
                        setFieldValue("userRoleId", e.target.value)
                      }
                      sx={{
                        width: 400,
                      }}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={2}>Seller</MenuItem>
                      <MenuItem value={3}>Buyer</MenuItem>
                    </Select>
                  </div>
                  <Button variant="contained" type="submit" className="lbtn">
                    Login
                    <ToastContainer autoClose={5000} />
                  </Button>
                  <h4 className="signup">
                    Already a User{" "}
                    <span className="signup-opt">
                      {" "}
                      <Link to={"/"}>Sign In</Link>
                    </span>{" "}
                    here
                  </h4>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUp;
