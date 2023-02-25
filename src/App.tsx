import React from 'react';
import logo from "logo.svg";
import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Auth } from 'pages/Auth/Auth';
import { Main } from 'pages/Main';
import { RequireAuth } from 'hoc/RequireAuth';

function App()
{
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/main"/>}></Route>
        <Route path="/main" element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </>
  );
}

export default App;
