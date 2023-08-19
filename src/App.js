import React,{createContext} from 'react'
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import HomePage from './components/Home/HomePage'
import LoginForm from './components/Login/LoginForm'
import SignUp from './components/Registration/SignUp'
import PageNotFound from './components/NotFoundPage/PageNotFound'
import { ToastContainer } from 'react-toastify'
import './App.css'
import About from '../src/components/Home/About'
import Shopping from './components/Home/Shopping'
// import AuthWrapper from './context/authContext'
import BookList from './components/Home/BookList'
import AddBooks from './components/Admin/Books/AddBooks'
import AllBooks from './components/Admin/Books/AllBooks'
import EditBooks from './components/Admin/Books/EditBook'
import AddCategory from './components/Admin/Category/AddCategory'
import CategoryInfo from './components/Admin/Category/CategoryInfo'
import EditCategory from './components/Admin/Category/EditCategory'
import UserInfo from './components/Admin/User/Userinfo'
import EditUser from './components/Admin/User/EditUser'
import AuthWrapper from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'

 export const UserData = createContext()
function App() {


  const theme = createTheme({
    components: {
      MuiButton:{
        styleOverrides:{
          root:{
            backgroundColor: 'teal',
          }
        }
      }
    }
  })
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
       <AuthWrapper>
        <BrowserRouter>
        <ToastContainer autoClose={5000} />
        <div><NavLink to='/' ></NavLink></div>
        <div><NavLink to='/HomePage' ></NavLink></div>
        <div><NavLink to='/Shop' ></NavLink></div> 
        <div><NavLink to='/Cart' ></NavLink></div> 
        <div><NavLink to='/Books' ></NavLink></div> 
        <div><NavLink to='/About' ></NavLink></div>
        <div><NavLink to='/Book' ></NavLink></div>
        <div><NavLink to='/AddBooks' ></NavLink></div> 
        <div><NavLink to='/AllBooks' ></NavLink></div> 
        <div><NavLink to='/EditBooks' ></NavLink></div> 
        <div><NavLink to='/AddCategory' ></NavLink></div> 
        <div><NavLink to='/CategoryInfo' ></NavLink></div> 
        <div><NavLink to='/EditCategory' ></NavLink></div> 
        <div><NavLink to='/Userinfo' ></NavLink></div> 
        <div><NavLink to='/EditUser' ></NavLink></div> 
        <div><NavLink to='/cart' ></NavLink></div> 
        <div><NavLink to='*' ></NavLink></div> 
          <Routes>
            <Route path='/' element={<LoginForm />} />
            {/* <Route path='/HomePage' element={userContext?.user? <HomePage /> :< Navigate to={'/'} /> }/> */}
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/Shop' element={<Shopping />} />
            <Route path='/Book' element={<BookList />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/About' element={<About />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/AddBooks' element={<AddBooks />} />
            <Route path='/AllBooks' element={<AllBooks />} />
            <Route path='/EditBooks' element={<EditBooks />} />
            <Route path='/AddCategory' element={<AddCategory />} />
            <Route path='/CategoryInfo' element={<CategoryInfo />} />
            <Route path='/EditCategory' element={<EditCategory />} />
            <Route path='/Userinfo' element={<UserInfo />} />
            <Route path='/EditUser' element={<EditUser />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
       </AuthWrapper>
          
        
      </ThemeProvider>
    </div>
  )
}

export default App