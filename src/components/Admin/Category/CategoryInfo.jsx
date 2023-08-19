import React, { useEffect, useState } from "react";
// import "./CategoryInfo.css";
import "./Categoryinfo.css";
import WithAuth from "../../../layout/WithAuth";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { toast } from "react-toastify";
// import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import categoryService from "../../../services/categoryService";
import Cookies from "js-cookie";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function CategoryInfo() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    // [`&.${tableCellClasses.body}`]: {
    //   fontSize: 20,
    // },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [categories, setCategories] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const GetAllCategories = () => {
    categoryService.GetAllCategories().then((response) => {
      setCategories(response.data.result);
    });
  };

  useEffect(() => {
    GetAllCategories();
  }, []);

  const deleteCategory = (id) => {
    categoryService.DeleteCategory(id).then(() => {
      toast.success("Delete Sucsessfully");
      GetAllCategories();
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div id="main-container">
        <br />
        <br />
        <h1>
          <u>All Categroies</u>
        </h1>
        <br />

        <a href="/AddCategory">
          Add Category
          <IconButton
            aria-label="Add Category"
            size="large"
            sx={{ color: "coral" }}
          >
            {/* <AddIcon sx={{ fontSize: 35 }} /> */}
          </IconButton>
        </a>

        <div id="books-table">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <b>Category Id</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Category Name</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Edit</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Delete</b>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((categories, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <TableCell>{categories.id}</TableCell>
                        <TableCell>{categories.name}</TableCell>
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
                              Cookies.set("categoryId", categories.id);
                              Cookies.set("categoryName", categories.name);
                              navigate("/EditCategory");
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="Delete"
                            variant="contained"
                            onClick={() => {
                              deleteCategory(categories.id);
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
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={categories.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default CategoryInfo;
