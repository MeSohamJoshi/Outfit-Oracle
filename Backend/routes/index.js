import usersRoutes from "./users.js";
import wardrobeRoutes from "./wardrobe.js";

const constructorMethod = (app) => {
  app.use("/users", usersRoutes);
  app.use("/wardrobe", wardrobeRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
