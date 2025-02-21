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

export default router;
