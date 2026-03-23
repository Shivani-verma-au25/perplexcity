import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/features/auth/pages/Login";
import { Register } from "./components/features/auth/pages/Register";
import Dashboard from "./components/features/chat/pages/Dashboard";
import {Toaster} from 'react-hot-toast'
import { useAuth } from "./components/features/auth/hook/useAuth";
import Protected from "./components/features/auth/protected/Protected";


const App = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.handleGetMe()
  },[])
  return (

    <>
      <Routes>
        <Route path="/" element={
          <Protected>
            <Dashboard />
          </Protected>
          } />
          
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster/>
    </>
  );
};

export default App;
