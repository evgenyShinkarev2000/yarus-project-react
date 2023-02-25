import React, { FormEvent, FormEventHandler, useEffect, useState } from "react"
import { useSelector } from "react-redux/es/exports";
import styles from "./Auth.module.scss";
import { login, loginAsync } from "store/AuthSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { AuthForm, AuthFormData } from "./AuthForm";


export function Auth()
{
  const authReducer = useSelector(state => (state as any).authReducer);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const doLogin = (authData: AuthFormData) =>
  {
    dispatch(loginAsync({ login: authData.login }));
  };

  if (authReducer.loginStatus === "logined")
  {
    setTimeout(() => navigate(location.state?.pathname ?? "/"), 1000);
  }

  return (
    <div className={styles.wrapper}>
      <AuthForm onSubmit={doLogin}></AuthForm>
    </div>
  )
}