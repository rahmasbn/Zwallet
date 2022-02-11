export const validateSignup = (values) => {
  let errors = {};
  const validName = new RegExp(/^([a-zA-Z'\-])+$/);
  const validEmail = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const validPass = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/);

  // firstName
  if (!values.firstName.trim()) {
    errors.firstName = "Firstname required";
  } else if (!validName.test(values.firstName)) {
    errors.firstName = "Name is invalid";
  }

  // lastName
  if (!values.lastName.trim()) {
    errors.lastName = "Lastname required";
  } else if (!validName.test(values.lastName)) {
    errors.lastName = "Name is invalid";
  }

  // email
  if (!values.email) {
    errors.email = "Email required";
  } else if (!validEmail.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  // password
  if (!values.password) {
    errors.password = "Password required";
  } else if (!validPass.test(values.password)) {
    errors.password =
      "Password must be at least 6 characters, including uppercase letter and numbers";
  }

  return errors;
};

export const validateLogin = (values) => {
  let errors = {};

  const validEmail = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const validPass = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/);

  // email
  if (!values.email) {
    errors.email = "Email required";
  } else if (!validEmail.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  // password
  if (!values.password) {
    errors.password = "Password required";
  } else if (!validPass.test(values.password)) {
    errors.password =
      "Password must be at least 6 characters, including lowercase, uppercase letter and numbers";
  }

  return errors;
};

export const validateNumber = (values) => {
  let errors = {};

  const validNumber = new RegExp("^([0-9]{10,12})$");
  if (!validNumber) {
    errors.noTelp = "Phone Number is required";
  } else if (!validNumber.test(values.noTelp)) {
    errors.noTelp = "Phone number must contain 10-12 digits";
  }
};

