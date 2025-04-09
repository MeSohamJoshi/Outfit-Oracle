import usersRoutes from "./users.js";
import wardrobeRoutes from "./wardrobe.js";
import outfitRoutes from "./outfits.js";
const constructorMethod = (app) => {
  app.use("/users", usersRoutes);
  app.use("/wardrobe", wardrobeRoutes);
  app.use("/outfits", outfitRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
