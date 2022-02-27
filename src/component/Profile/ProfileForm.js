import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";

import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const newEnteredPassword = newPasswordInputRef.current.value;
    const data = {
      idToken: authCtx.token,
      password: newEnteredPassword,
      returnSecureToken: false,
    };

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-pVzNEVIiUhXh88mhQW2crYl5yX-uecw";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      history.push("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.actions}>
        <Button type="submit">Change Password</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
