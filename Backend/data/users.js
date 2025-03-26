import { users } from "../config/mongoCollections.js";
import admin from "firebase-admin";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  checkIsProperFirstOrLastName,
  validateEmail,
  checkIsProperPassword,
  validateId,
} from "../helpers.js";

const createUser = async (firstName, lastName, email, password) => {
  firstName = checkIsProperFirstOrLastName(firstName, "First name");
  lastName = checkIsProperFirstOrLastName(lastName, "Last name");
  email = validateEmail(email);
  password = checkIsProperPassword(password);

  const userCollection = await users();
  const existingUser = await userCollection.findOne({ email: email.trim() });

  if (existingUser) throw new Error("User already exists");
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${lastName}`,
    });

    let hashedPassword = await bcrypt.hash(password, 10);

    const toAddUser = {
      _id: new ObjectId(),
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      firebaseUid: userRecord.uid,
    };

    let addedUser = await userCollection.insertOne(toAddUser);

    if (!addedUser.acknowledged || !addedUser.insertedId) {
      throw new Error(`The user could not be added to the collection.`);
    }

    return { ...toAddUser, _id: addedUser.insertedId };
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

// Function to get all users
const getAllUsers = async () => {
  try {
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
    if (!allUsers || allUsers.length === 0) {
      throw new Error("No users found.");
    }
    return allUsers;
  } catch (error) {
    throw new Error(`Error fetching all users: ${error.message}`);
  }
};

// Function to get a user by ID
const getUserById = async (userId) => {
  userId = validateId(userId);
  try {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new Error(`No user found with ID ${userId}.`);
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

const verifyLogin = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  const email = decodedToken.email;
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  return {
    message: "Token verified successfully",
    _id: user._id,
    name: user.name,
    email,
  };
};

export default { createUser, verifyLogin, getAllUsers, getUserById };
