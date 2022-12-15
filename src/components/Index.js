import React from 'react'
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home/Home";
import Register from "../pages/Forms/Register";
import Login from "../pages/Forms/Login";
import Logout from "../pages/Logout/Logout";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Messenger from '../pages/messenger/Index';
import SavedPosts from '../pages/SavedPosts';
import { createGlobalStyle } from "styled-components";
import Settings from '../pages/settings/Settings';
import Contact from '../pages/Help & support/Contact';
import Display from '../pages/Display/Display';
import ImagePage from '../pages/Profile/ImagePage';
import LoadingIndicator from './common/LoadingIndicator';
import Notification from '../pages/notifications/Notification';


const GlobalStyles = createGlobalStyle`
  
  
  ::-webkit-scrollbar{
      width: 5px;
    }
  
    ::-webkit-scrollbar-track{
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb{
      background-color: gray;
      border-radius: 10px;
    }
      
  
  `


const Index = ({ state, dispatch }) => {


  const user = state.user
  const theme = state.theme

  if (state.jwtUser && !user) return <LoadingIndicator />

  return (
    <React.Fragment>
      <GlobalStyles />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login user={state.jwtUser} />} />
        <Route path="/home" element={<Home user={state.jwtUser} />} />
        <Route path="/profile/:id" element={<Profile dispatch={dispatch} state={state} />} />
        <Route path="/profile/:id/:text" element={<Profile dispatch={dispatch} state={state} />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/register" element={<Register user={state.jwtUser} />} />
        <Route path="/signout" element={<Logout />} />
        <Route path="/savedposts" element={<SavedPosts user={user} />} />
        <Route path="/messenger" element={<Messenger dispatch={dispatch} state={state} />} />
        <Route path="/notifications" element={<Notification dispatch={dispatch} state={state} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/display" element={<Display dispatch={dispatch} theme={theme} />} />
        <Route path="/help" element={<Contact theme={theme} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </React.Fragment>)
}

export default Index