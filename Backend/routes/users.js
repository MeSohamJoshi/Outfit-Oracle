import { Router } from "express";
const router = Router();
import { usersData } from "../data/index.js";

router.route("/").get(async (req, res) => {
  try {
    const users = await usersData.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a user by ID
router.route("/:id").get(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usersData.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// .patch(async (req, res) => {
//   const userId = req.params.id;
//   const { firstName, lastName, email } = req.body;
//   try {
//     if (!firstName && !lastName && !email) {
//       return res
//         .status(400)
//         .json({ error: "At least one field must be provided for update" });
//     }

//     const updatedUser = await updateUser(userId, {
//       firstName,
//       lastName,
//       email,
//     });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })
// .delete(async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const deleteMessage = await deleteUser(userId);
//     res.status(200).json(deleteMessage);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
