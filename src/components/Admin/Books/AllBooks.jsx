import React, { useEffect, useState } from "react";
import "../Category/Categoryinfo.css";
import bookService from "../../../services/bookService";
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
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function AllBooks() {
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

  const [books, setBooks] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getBooks = () => {
    bookService.GetAllBooks().then((response) => {
      setBooks(response.data.result);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = (id) => {
    bookService.DeleteBook(id).then(() => {
      toast.success("Delete Sucsessfully");
      getBooks();
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
          <u>All Books</u>
        </h1>
        <br />
        <a href="/AddBooks">
          Add Book
          <IconButton aria-label="Addbook" size="large" sx={{ color: "coral" }}>
            <AddIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </a>

        <div id="books-table">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <b>Id</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Name</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Price</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Category</b>
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
                {books
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell>{book.category}</TableCell>
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
                              navigate("/EditBooks");
                              Cookies.set("BookId", book.id);
                              Cookies.set("BookName", book.name);
                              Cookies.set("BookPrice", book.price);
                              Cookies.set("BookCategory", book.category);
                              Cookies.set("BookCategoryId", book.categoryId);
                              Cookies.set("BookDescription", book.description);
                              localStorage.setItem(
                                "BookImage",
                                book.base64image
                              );
                            }}
                          >
                            edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="Delete"
                            variant="contained"
                            onClick={() => {
                              deleteBook(book.id);
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
            count={books.length}
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
export default AllBooks;

// import React, { useState, useEffect, useContext } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Contextpage from "../../../ContextPage";
// import { toast } from "react-toastify";
// import { Button } from "@mui/material";

// function Books() {
//   const [books, setBooks] = useState([]);

//   const getAllBookdata = () => {
//     var config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `https://book-e-sell-node-api.vercel.app/api/book/all`,
//       headers: { "Content-Type": "application/json" },
//     };

//     axios(config)
//       .then(function (response) {
//         setBooks(response.data.result);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const deleteBook = (bookid) => {
//     var config = {
//       method: "delete",
//       maxBodyLength: Infinity,
//       url: `https://book-e-sell-node-api.vercel.app/api/book?id=${bookid}`,
//       headers: {},
//     };
//     console.log("Bookid", bookid);
//     axios(config)
//       .then(function () {
//         toast.success("Book Delete successfully");
//         getAllBookdata();
//       })
//       .catch(function (error) {
//         console.log(error);
//         toast.error("error");
//       });
//   };

//   useEffect(() => {
//     getAllBookdata();
//   }, []);

//   const columns = [
//     {
//       field: "id",
//       headerName: "Id",
//       width: 70,
//     },
//     {
//       field: "name",
//       headerName: "Book Name",
//       width: 450,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       type: "number",
//       width: 150,
//     },
//     {
//       field: "category",
//       headerName: "Category",
//       width: 150,
//     },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 200,
//       renderCell: (row) => (
//         <>
//           <Link
//             to={`/EditBooks/${row.id}`}
//             sx={{
//               color: "white",
//               bgcolor: "green",
//             }}
//             l
//             className="bg-green-500/60 px-5 py-2 font-semibold hover:bg-green-500/40 rounded-lg mx-2"
//           >
//             Edit
//           </Link>

//           <Button
//             onClick={() => deleteBook(row.id)}
//             varient="outlined"
//             sx={{
//               color: "white",
//               bgcolor: "pink",
//             }}
//           >
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="flex justify-center flex-col items-center p-4">
//         <h1 className="text-4xl font-bold text-center p-3">Books</h1>
//         <div className="w-40 h-1 bg-red-400 rounded-full"></div>
//       </div>

//       <div className="flex justify-center items-center flex-col">
//         <div className="flex">
//           <Link
//             to="/a"
//             className="bg-blue-400 p-2 rounded-lg hover:bg-blue-300 font-semibold text-white"
//           >
//             Add Books
//           </Link>
//         </div>

//         <div className="w-auto m-10">
//           <DataGrid
//             rows={books}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 5 },
//               },
//             }}
//             pageSizeOptions={[5, 10]}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Books;
