import React from "react";
import Button from "./Button";
import Card from "./Card";

import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.removeError}></div>
      <Card className={classes.modal}>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.removeError}>Ok</Button>
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default ErrorModal;
