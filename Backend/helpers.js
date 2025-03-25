import { ObjectId } from "mongodb";
import moment from "moment";

import validator from "validator";

export const checkIsProperFirstOrLastName = (name, nameVar) => {
  isInputProvided(name, nameVar);
  name = checkIsProperString(name, nameVar);
  if (/[0-9]/.test(name))
    throw new Error(`Error: ${nameVar} contains a number.`);
  if (name.length < 2)
    throw new Error(`Error: ${nameVar} should have at least 2 charaters.`);
  if (name.length > 25)
    throw new Error(`Error: ${nameVar} should not be more than 25 charaters.`);
  return name;
};

export const isInputProvided = (variable, variableName) => {
  if (variable === undefined || variable === null)
    throw new Error(`Error: ${variableName || "variable"} not provided`);
};

export const checkIsProperString = (str, strName) => {
  isInputProvided(str, strName);
  if (typeof str !== "string")
    throw new Error(`Error: ${strName || "provided variable"} is not a string`);
  str = str.trim();
  if (str.length === 0)
    throw new Error(
      `Error: ${strName || "provided variable"} is a empty string`
    );
  return str;
};

export const validateEmail = (email) => {
  checkIsProperString(email, "email");

  if (!validator.isEmail(email))
    throw new Error("Error: Email address is invalid");

  isInputProvided(email, "Email");
  email = checkIsProperString(email, "Email");
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) throw new Error("Error: Invalid email format.");

  return email;
};

export const checkIsProperPassword = (password) => {
  isInputProvided(password, "Password");
  password = checkIsProperString(password, "Password");
  if (password.includes(" ") || password.length < 8)
    throw new Error(`Error: Password must be at least 8 characters long.`);
  if (password === password.toLowerCase())
    throw new Error(
      `Error: Password should have at least one uppercase letter.`
    );
  if (!/\d/.test(password))
    throw new Error(`Error: Password should have at least one number.`);
  // got regex from google
  if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
    throw new Error(
      `Error: Password should have at least one special character.`
    );

  return password;
};
