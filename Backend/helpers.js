import { ObjectId } from "mongodb";
import moment from "moment";
import axios from "axios";
import validator from "validator";

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    return {
      temp: response.data.main.temp,
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity,
    };
  } catch (error) {
    throw new Error(`Weather API error: ${error.message}`);
  }
};

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

export const validateId = (id) => {
  isInputProvided(id, "id");
  id = checkIsProperString(id, "id");

  if (!ObjectId.isValid(id)) throw new Error(`Error: Invalid object Id`);

  return id;
};

export const ClothingCategory = {
  TOPS: ["T-Shirt", "Shirt", "Sweater", "Hoodie", "Jacket"],
  BOTTOMS: ["Pants", "Jeans", "Shorts", "Skirt"],
  DRESSES: ["Dress"],
  OUTERWEAR: ["Jacket", "Coat"],
  FOOTWEAR: ["Sneakers", "Boots", "Sandals"],
  ACCESSORIES: ["Hat", "Scarf", "Belt", "Bag"],
  UNDERWEAR: ["Underwear", "Socks"],
  SWIMWEAR: ["Swimsuit"],
  SLEEPWEAR: ["Pajamas"],
  ATHLETIC: ["Sports Bra", "Leggings", "Shorts", "Tank Top"],
};

export const validateCategory = (category) => {
  const allCategories = Object.values(ClothingCategory).flat();
  if (!allCategories.includes(category)) {
    throw new Error(
      `Invalid category: ${category}. Please choose from: ${allCategories.join(
        ", "
      )}`
    );
  }
  return category;
};
