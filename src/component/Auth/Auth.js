import React, { useState } from "react";
import useAuthForm from "../../hooks/useAuthForm";
import ErrorModal from "../UI/ErrorModal";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    resetForm: resetEmailForm,
    valueChangeHandler: emailChangeHandler,
    onBlurChangeHandler: emailOnBlurHandler,
  } = useAuthForm((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    resetForm: resetPasswordForm,
    valueChangeHandler: passwordChangeHandler,
    onBlurChangeHandler: passwordOnBlurHandler,
  } = useAuthForm((value) => value.trim() !== "");

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const switchToggleHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);
    setError(null);

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-pVzNEVIiUhXh88mhQW2crYl5yX-uecw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-pVzNEVIiUhXh88mhQW2crYl5yX-uecw";
    }

    try {
      console.log("AUTH COMPONENT!!!");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something Went Wrong!!!");
      }
      const data = await response.json();
      console.log(data);
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      console.log(expirationTime);
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace("/");
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);

    resetEmailForm();
    resetPasswordForm();
  };

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  const removeErrorHandler = () => {
    setError(null);
  };

  return (
    <section className="auth">
      <h1> {isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailOnBlurHandler}
          />
        </div>
        {emailHasError && (
          <p className="error-text">Please enter a valid email Address</p>
        )}
        <div className={passwordClasses}>
          <label htmlFor="Password">Your Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordOnBlurHandler}
          />
        </div>
        {passwordHasError && (
          <p className="error-text">Please enter a valid Password</p>
        )}
        <div className="actions">
          {!isLoading && (
            <button disabled={!formIsValid}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request ...</p>}
          {!isLoading && error && (
            <ErrorModal message={error} removeError={removeErrorHandler} />
          )}
          <button
            className="toggle"
            type="button"
            onClick={switchToggleHandler}
          >
            {isLogin ? "Create New Account" : "Login With An Existing Account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
