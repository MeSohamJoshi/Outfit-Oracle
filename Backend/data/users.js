import { users } from "../config/mongoCollections.js";
import admin from "firebase-admin";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  checkIsProperFirstOrLastName,
  validateEmail,
  checkIsProperPassword,
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

export default { createUser, verifyLogin };
