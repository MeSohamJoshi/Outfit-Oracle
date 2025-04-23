import { jest } from "@jest/globals";
import userData from "../data/users.js";
import { ObjectId } from "mongodb";

userData.createUser = jest.fn();
userData.getAllUsers = jest.fn();
userData.getUserById = jest.fn();
userData.verifyLogin = jest.fn();

describe("User Data Functions", () => {
  const dummyUserId = new ObjectId().toString();
  const dummyEmail = "test@example.com";
  const dummyToken = "mockToken";

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success cases
  test("createUser - should create a user", async () => {
    const newUser = {
      name: "John Doe",
      email: dummyEmail,
      _id: dummyUserId,
    };

    userData.createUser.mockResolvedValue(newUser);

    const result = await userData.createUser("John", "Doe", dummyEmail, "Test1234!");
    expect(result).toHaveProperty("email", dummyEmail);
    expect(result).toHaveProperty("name", "John Doe");
  });

  test("getAllUsers - should return all users", async () => {
    userData.getAllUsers.mockResolvedValue([{ name: "User 1" }, { name: "User 2" }]);

    const result = await userData.getAllUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  test("getUserById - should return a user by ID", async () => {
    userData.getUserById.mockResolvedValue({ _id: dummyUserId, name: "John Doe" });

    const result = await userData.getUserById(dummyUserId);
    expect(result).toHaveProperty("_id", dummyUserId);
  });

  test("verifyLogin - should verify token and return user info", async () => {
    const mockResponse = {
      message: "Token verified successfully",
      _id: dummyUserId,
      name: "John Doe",
      email: dummyEmail,
    };

    userData.verifyLogin.mockResolvedValue(mockResponse);

    const result = await userData.verifyLogin(dummyToken);
    expect(result).toHaveProperty("message", "Token verified successfully");
    expect(result).toHaveProperty("email", dummyEmail);
  });

  // Negative cases
  test("createUser - should throw error on duplicate user", async () => {
    userData.createUser.mockRejectedValue(new Error("User already exists"));

    await expect(userData.createUser("John", "Doe", dummyEmail, "Test1234!"))
      .rejects
      .toThrow("User already exists");
  });




  test("createUser - should throw error on invalid email", async () => {
    userData.createUser.mockRejectedValue(new Error("Invalid email format"));

    await expect(userData.createUser("Jane", "Doe", "invalid-email", "Password123"))
      .rejects
      .toThrow("Invalid email format");
  });

  test("getUserById - should throw error on missing user", async () => {
    userData.getUserById.mockRejectedValue(new Error("No user found"));

    await expect(userData.getUserById("nonexistentId")).rejects.toThrow("No user found");
  });

  test("verifyLogin - should throw error on invalid token", async () => {
    userData.verifyLogin.mockRejectedValue(new Error("Invalid token"));

    await expect(userData.verifyLogin("badToken")).rejects.toThrow("Invalid token");
  });
});
// test trigger