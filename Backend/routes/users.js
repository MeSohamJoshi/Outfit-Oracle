import { Router } from "express";
const router = Router();
import { usersData } from "../data/index.js";

router
  .route("/")
  .get(async (req, res) => {
    return res.send("GET request to http://localhost:3000/users");
  })
  .post(async (req, res) => {
    //console.log(req.body);
    return res.send("POST request to http://localhost:3000/users");
  })
  .delete(async (req, res) => {
    return res.send("DELETE request to http://localhost:3000/users");
  })
  .put(async (req, res) => {
    return res.send("PUT request to http://localhost:3000/users");
  })
  .patch(async (req, res) => {
    return res.send("PATCH request to http://localhost:3000/users");
  });

router.route("/login").post(async (req, res) => {
  const { token } = req.body;
  try {
    const user = await usersData.verifyLogin(token);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

router.route("/signup").post(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await usersData.createUser(
      firstName,
      lastName,
      email,
      password
    );
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

export default router;
