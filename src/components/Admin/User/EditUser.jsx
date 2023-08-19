import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userinfo.css";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import userService from "../../../services/userService";
import Cookies from "js-cookie";

const EditUser = () => {
  const [userId, setUserId] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRoleId, setUserRoleId] = useState();
  const [userRole, setUserRole] = useState();
  const [userPassword, setUserPassword] = useState();

  useEffect(() => {
    setUserId(Cookies.get("userId"));
    setUserFirstName(Cookies.get("userFirstName"));
    setUserLastName(Cookies.get("userLastName"));
    setUserEmail(Cookies.get("userEmail"));
    setUserRoleId(Cookies.get("userRoleId"));
    setUserRole(Cookies.get("userRole"));
    setUserPassword(Cookies.get("userPassword"));
  }, []);

  const handleEdit = async (values) => {
    if (!values.userFirstName) {
      values.userFirstName = userFirstName;
    }
    if (!values.userLastName) {
      values.userLastName = userLastName;
    }
    if (!values.userEmail) {
      values.userEmail = userEmail;
    }
    if (!values.userPassword) {
      values.userPassword = userPassword;
    }
    if (!values.userRoleId) {
      values.userRoleId = userRoleId;
    }
    if (values.userRoleId === 2) {
      values.userRole = "seller";
    }
    if (values.userRoleId === 3) {
      values.userRole = "buyer";
    }

    const payload = {
      id: userId,
      email: values.userEmail,
      firstName: values.userFirstName,
      lastName: values.userLastName,
      roleId: values.userRoleId,
      role: values.userRole,
      password: values.userPassword,
    };

    console.log(payload);

    await userService
      .EditUser(payload)
      .then((response) => {
        Cookies.remove("userId");
        Cookies.remove("userFirstName");
        Cookies.remove("userLastName");
        Cookies.remove("userEmail");
        Cookies.remove("userRoleId");
        Cookies.remove("userRole");
        Cookies.remove("userPassword");
        toast.success("user Edited Sucsessfully", { position: "top-right" });
        navigate("/Userinfo");
      })
      .catch((error) => {
        toast.error("Something Went Wrong!!!", { position: "top-right" });
        console.log(error);
      });
  };

  const navigate = useNavigate();

  return (
    <div id="addbook-main-container">
      <Typography variant="h3">
        <u>Edit user</u>
      </Typography>
      <br /> <br />
      <p>Enter Details You Want to Change Otherwise Leave It</p>
      <div id="addbook-container">
        <Formik
          initialValues={{
            userId: "",
            userFirstName: "",
            userLastName: "",
            userRoleId: "",
            userEmail: "",
            userRole: "",
            userPassword: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => handleEdit(values)}
        >
          {({ values, setFieldValue, errors, handleBlur }) => {
            console.log(errors);
            return (
              <Form>
                <div id="addbook-components">
                  <h2>User Id : </h2>
                  <TextField
                    disabled
                    type=""
                    id="userId"
                    name="userId"
                    variant="outlined"
                    value={userId}
                    sx={{
                      width: 150,
                    }}
                  />
                  <br />
                  <br />
                  <div id="addbook-components-row">
                    <h4>First Name : {userFirstName}</h4>
                    <h4>Last Name : {userLastName}</h4>
                  </div>
                  <div id="addbook-components-row">
                    <TextField
                      id="userFirstName"
                      type=""
                      label="First Name"
                      name="userFirstName"
                      variant="outlined"
                      value={values.userFirstName}
                      error={errors.userFirstName}
                      onChange={(e) =>
                        setFieldValue("userFirstName", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />
                    <TextField
                      id="userLastName"
                      label="Last Name"
                      type=""
                      name="userLastName"
                      variant="outlined"
                      value={values.userLastName}
                      error={errors.userLastName}
                      onChange={(e) =>
                        setFieldValue("userLastName", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />
                  </div>

                  <div id="addbook-components-row">
                    <h4>Email : {userEmail}</h4>
                    <h4>Password : {userPassword}</h4>
                  </div>
                  <div id="addbook-components-row">
                    <TextField
                      id="userEmail"
                      label="Email"
                      type=""
                      name="userEmail"
                      variant="outlined"
                      value={values.userEmail}
                      error={errors.userEmail}
                      onChange={(e) =>
                        setFieldValue("userEmail", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />
                    <TextField
                      id="userPassword"
                      label="Password"
                      name="userPassword"
                      variant="outlined"
                      type=""
                      value={values.userPassword}
                      error={errors.userPassword}
                      onChange={(e) =>
                        setFieldValue("userPassword", e.target.value)
                      }
                      onBlur={handleBlur}
                      sx={{
                        width: 400,
                      }}
                    />
                  </div>
                  <InputLabel id="Role" />
                  <h4>Role : {userRole}</h4>
                  <br />
                  <Select
                    variant="standard"
                    id="userRole"
                    labelId="Role"
                    name="userRole"
                    value={values.userRoleId}
                    error={errors.userRoleId}
                    onChange={(e) =>
                      setFieldValue("userRoleId", e.target.value)
                    }
                    onBlur={handleBlur}
                    sx={{
                      width: 400,
                    }}
                  >
                    <MenuItem value={2}>Seller</MenuItem>
                    <MenuItem value={3}>Buyer</MenuItem>
                  </Select>

                  <br />
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
  );
};

export default EditUser;
