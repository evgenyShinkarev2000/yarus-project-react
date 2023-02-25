import { Auth } from "pages/Auth/Auth";
import React from "react";
import { useSelector } from "react-redux";
import {Navigate, redirect, useLocation} from "react-router-dom"



export function RequireAuth(props: any){
  const currentUser = useSelector(state => (state as any).authReducer.currentUser);
  const localtion = useLocation();

  if (!currentUser){
    return <Navigate to="/auth" state={localtion}/>
  }
  
  return (
    <>
    {props.children}
    </>
  )
}