import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import "./LoginFrom.css";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import LoginNavbar from "../Navbar/LoginNavbar";
function LoginForm() {
  // const navigate = useNavigate();
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().required("Username Should not be Empty"),
  //   password: Yup.string().min(4).required("Minimum 4 Characters"),
  // });

  // const handleSubmit = async (values) => {
  //   const payload = {
  //     email: values.email,
  //     password: values.password,
  //   };

  //   await authService
  //     .Login(payload)
  //     .then((response) => {
  //       console.log("data added sucessfully");
  //       toast.success("Login Sucsessful", { position: "top-right" });
  //       navigate("/HomePage");
  //       Cookies.set("auth_email", values.email);
  //     })
  //     .catch((error) => {
  //       toast.error("Invalid Details!!!", { position: "top-right" });
  //       console.log(error);
  //     });
  // };

  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Enter valid Password.")
      .required("Enter Valid Password."),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Enter valid Email."
      )
      .required("Enter valid Email."),
  });

  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    await authService
      .Login(payload)
      .then((response) => {
        console.log("data added sucessfully");
        toast.success("Login Sucsessful", { position: "top-right" });
        navigate("/HomePage");
        Cookies.set("auth_email", values.email);
        userContext.setUser(response.data.result);
      })
      .catch((error) => {
        toast.error("Invalid Details!!!", { position: "top-right" });
        console.log(error);
        // console.log(payload)
      });
  };

  return (
    <div className="main">
      <LoginNavbar />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, errors, setFieldValue, handleBlur }) => {
          console.log(values);
          return (
            <Form>
              <div className="form">
                <div className="form-data">
                  <Typography variant="h4" className="fancy">
                    Login
                  </Typography>
                  <div className="field">
                    <TextField
                      onBlur={handleBlur}
                      type=""
                      color="secondary"
                      error={errors.email}
                      name="email"
                      size="small"
                      label="Email"
                      variant="outlined"
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="email" />
                    </FormHelperText>
                    <TextField
                      onBlur={handleBlur}
                      type="password"
                      error={errors.password}
                      name="password"
                      size="small"
                      defaultValue="small"
                      label="Password"
                      variant="outlined"
                      value={values.password}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="password" />
                    </FormHelperText>
                  </div>
                  <Button
                    className="lbtn"
                    variant="primary"
                    type="submit"
                    sx={{
                      borderRadius: 50,
                    }}
                    size="large"
                  >
                    Login
                  </Button>
                  <h4 className="signup">
                    Don't Have account{" "}
                    <span className="signup-opt">
                      {" "}
                      <a href="/SignUp">Sign Up</a>
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

export default LoginForm;
