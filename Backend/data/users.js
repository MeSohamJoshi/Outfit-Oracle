import { users } from "../config/mongoCollections.js";
import admin from "firebase-admin";
import { ObjectId } from "mongodb";

const createUser = async (firstName, lastName, email, password) => {
  const userCollection = await users();
  const existingUser = await userCollection.findOne({ email: email.trim() });

  if (existingUser) throw new Error("User already exists");
  const userRecord = await admin.auth().createUser({
    email: email,
    password: password,
    displayName: `${firstName} ${lastName}`,
  });

  const toAddUser = {
    _id: new ObjectId(),
    firstName,
    lastName,
    email,
  };

  let addedUser = await userCollection.insertOne(toAddUser);

  if (!addedUser.acknowledged || !addedUser.insertedId) {
    throw new Error(`The user could not be added to the collection.`);
  }

  return { ...toAddUser, _id: addedUser.insertedId };
};

const verifyLogin = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  const email = decodedToken.email;
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  return {
    message: "Token verified successfully",
    _id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email,
  };
};

export default { createUser };
