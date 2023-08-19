import React, { useEffect, useState } from "react";
import "./Userinfo.css";
import userService from "../../../services/userService";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import { toast } from "react-toastify";
import { useContext } from "react";
// import { AuthContext } from "../../../context/AuthContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function UserInfo() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const navigate = useNavigate();
  const User = useContext(AuthContext);
  const ID = User.user.id;

  const [users, serUsers] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUsers = () => {
    userService.GetAllUsers().then((response) => {
      serUsers(response.data.result);
    });
  };

  const deleteUser = (id) => {
    userService.DeleteUser(id).then(() => {
      toast.success("Delete Sucsessfully");
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <>
      <Navbar />
      <div id="main-container">
        <br />
        <h1>
          <u>All Users</u>
        </h1>

        <div id="books-table">
          {/* <TextField
            id="search"
            type="search"
            label="Search..."
            // onChange={handleChange}
          /> */}
          <br />
          <br />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>email</StyledTableCell>
                  <StyledTableCell>role</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Button
                            type="Edit"
                            variant="contained"
                            sx={{
                              border: "2px black solid",
                              bgcolor: "transparent",
                              color: "black",
                              borderColor: "green",
                              ":hover": {
                                bgcolor: "green",
                                color: "white",
                              },
                            }}
                            onClick={() => {
                              Cookies.set("userId", user.id);
                              Cookies.set("userFirstName", user.firstName);
                              Cookies.set("userLastName", user.lastName);
                              Cookies.set("userEmail", user.email);
                              Cookies.set("userRoleId", user.roleId);
                              Cookies.set("userRole", user.role);
                              Cookies.set("userPassword", user.password);

                              navigate("/EditUser");
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>

                        <TableCell>
                          {ID !== user.id && (
                            <Button
                              type="Delete"
                              variant="contained"
                              onClick={() => {
                                deleteUser(user.id);
                              }}
                              sx={{
                                border: "2px red solid",
                                bgcolor: "transparent",
                                color: "red",
                                ":hover": {
                                  bgcolor: "red",
                                  color: "white",
                                },
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50, 100, 500]}
            component="div"
            count={users.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <div></div>
      <Footer />
    </>
  );
}
export default UserInfo;
