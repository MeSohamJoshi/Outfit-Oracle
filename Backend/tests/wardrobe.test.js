import { jest } from "@jest/globals";
import wardrobeData from "../data/wardrobe.js";
import { ObjectId } from "mongodb";

wardrobeData.createWardrobeItem = jest.fn();
wardrobeData.getAllWardrobeItems = jest.fn();
wardrobeData.getWardrobeItemById = jest.fn();
wardrobeData.updateWardrobeItem = jest.fn();
wardrobeData.deleteWardrobeItem = jest.fn();

describe("Wardrobe Data Functions", () => {
  const dummyUserId = new ObjectId().toString();
  const dummyItemId = new ObjectId().toString();

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Positive Cases
  test("createWardrobeItem - should create item with valid data", async () => {
    const item = { userId: dummyUserId, category: "Top", name: "T-Shirt", image: "tshirt.jpg" };
    wardrobeData.createWardrobeItem.mockResolvedValue(item);

    const result = await wardrobeData.createWardrobeItem(dummyUserId, "Top", "T-Shirt", "tshirt.jpg");
    expect(result).toEqual(item);
  });

  test("getAllWardrobeItems - should return items for a user", async () => {
    wardrobeData.getAllWardrobeItems.mockResolvedValue([{ name: "T-Shirt" }]);

    const result = await wardrobeData.getAllWardrobeItems(dummyUserId);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("getWardrobeItemById - should return item by ID", async () => {
    wardrobeData.getWardrobeItemById.mockResolvedValue({ _id: dummyItemId, name: "Jeans" });

    const result = await wardrobeData.getWardrobeItemById(dummyItemId);
    expect(result).toHaveProperty("_id", dummyItemId);
  });

  test("updateWardrobeItem - should update item", async () => {
    wardrobeData.updateWardrobeItem.mockResolvedValue({ message: "Item updated" });

    const result = await wardrobeData.updateWardrobeItem(dummyItemId, "Bottom", "Jeans", "jeans.jpg");
    expect(result).toHaveProperty("message");
  });

  test("deleteWardrobeItem - should confirm deletion", async () => {
    wardrobeData.deleteWardrobeItem.mockResolvedValue({ message: "Wardrobe item deleted successfully" });

    const result = await wardrobeData.deleteWardrobeItem(dummyItemId);
    expect(result).toHaveProperty("message");
  });

  //  Negative / Edge Cases
  test("createWardrobeItem - should throw error for invalid category", async () => {
    wardrobeData.createWardrobeItem.mockRejectedValue(new Error("Invalid category"));

    await expect(
      wardrobeData.createWardrobeItem("userId", "INVALID", "Shirt", "img.png")
    ).rejects.toThrow("Invalid category");
  });

  test("getAllWardrobeItems - should throw error if user ID is missing", async () => {
    wardrobeData.getAllWardrobeItems.mockRejectedValue(new Error("Invalid user ID"));

    await expect(wardrobeData.getAllWardrobeItems("")).rejects.toThrow("Invalid user ID");
  });

  test("getWardrobeItemById - should throw if item not found", async () => {
    wardrobeData.getWardrobeItemById.mockRejectedValue(new Error("No wardrobe item found"));

    await expect(wardrobeData.getWardrobeItemById("notreal")).rejects.toThrow("No wardrobe item found");
  });

  test("updateWardrobeItem - should throw if nothing is updated", async () => {
    wardrobeData.updateWardrobeItem.mockRejectedValue(new Error("No changes made"));

    await expect(
      wardrobeData.updateWardrobeItem("itemId", null, null, null)
    ).rejects.toThrow("No changes made");
  });

  test("deleteWardrobeItem - should throw for invalid ID", async () => {
    wardrobeData.deleteWardrobeItem.mockRejectedValue(new Error("No wardrobe item found"));

    await expect(wardrobeData.deleteWardrobeItem("invalid")).rejects.toThrow("No wardrobe item found");
  });
});
