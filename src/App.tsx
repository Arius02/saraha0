import { Route, BrowserRouter, Routes } from "react-router-dom";

import { Home, Messages, Settings, SettingsDetails, SignIn, SignUp, SendMessage, Notfound } from "./pages";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { useAuth } from "./context/authContext";
import { useEffect, useMemo } from "react";
import { ProtectedRoute } from "./components/ProtectedRoutes";


const  App = ()=> {
const {setToken, user, getUser,token}= useAuth()
useEffect(()=>{
  setToken(localStorage.getItem("token"))
},[])

useMemo(()=>{
  getUser()
},[token])
  return <>
                <BrowserRouter>
                  <Navbar/>
                  <Routes>
                  <Route path="/" Component={Home} />
                  <Route path="/settings" element={<ProtectedRoute component={Settings}/>}/>
                  <Route path="/messages" element={<ProtectedRoute component={Messages}/>}/>
                  <Route path="/settings/:id"  element={<ProtectedRoute component={SettingsDetails}/>}/>
                  <Route path="/:username"  Component={SendMessage}/>
                  <Route path="*"  Component={Notfound}/>
                  <Route path="/signin" Component={SignIn}/>
                  <Route path="/signup" Component={SignUp}/>
                  </Routes>
              <ToastContainer 
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
              </BrowserRouter>


 </>   
}

export default App;
