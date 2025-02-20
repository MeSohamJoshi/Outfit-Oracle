import usersRoutes from "./users.js";

const constructorMethod = (app) => {
  app.use("/users", usersRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
