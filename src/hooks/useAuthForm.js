import { useState } from "react";

const useAuthForm = (validateValue) => {
  const [enteredvalue, setEnteredValue] = useState("");

  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredvalue);

  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const onBlurChangeHandler = () => {
    setIsTouched(true);
  };

  const resetForm = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredvalue,
    isValid: enteredValueIsValid,
    hasError: hasError,
    resetForm: resetForm,
    valueChangeHandler,
    onBlurChangeHandler,
  };
};

export default useAuthForm;
