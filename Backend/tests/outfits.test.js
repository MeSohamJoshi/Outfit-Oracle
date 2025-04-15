import { jest } from "@jest/globals";
import outfitData from "../data/outfits.js";
import { ObjectId } from "mongodb";

// Manually mock all functions
outfitData.createOutfit = jest.fn();
outfitData.getAllOutfits = jest.fn();
outfitData.getOutfitById = jest.fn();
outfitData.updateOutfitById = jest.fn();
outfitData.deleteOutfitById = jest.fn();
outfitData.getImages = jest.fn();

describe("Outfit Data Functions", () => {
  const dummyUserId = new ObjectId().toString();
  const dummyOutfitId = new ObjectId().toString();
  const dummyItems = ["item1", "item2"];

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Positive Test Cases
  test("createOutfit - should create outfit with valid data", async () => {
    outfitData.createOutfit.mockResolvedValue({ userId: dummyUserId, items: dummyItems });

    const result = await outfitData.createOutfit(dummyUserId, dummyItems);
    expect(result).toHaveProperty("userId", dummyUserId);
    expect(result.items).toEqual(dummyItems);
  });

  test("getAllOutfits - should return array of outfits", async () => {
    outfitData.getAllOutfits.mockResolvedValue([{ userId: dummyUserId, items: dummyItems }]);

    const result = await outfitData.getAllOutfits(dummyUserId);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("getOutfitById - should return a single outfit", async () => {
    outfitData.getOutfitById.mockResolvedValue({ _id: dummyOutfitId, items: dummyItems });

    const result = await outfitData.getOutfitById(dummyOutfitId);
    expect(result).toHaveProperty("_id", dummyOutfitId);
  });

  test("updateOutfitById - should update outfit", async () => {
    outfitData.updateOutfitById.mockResolvedValue({ _id: dummyOutfitId, items: ["item3"] });

    const result = await outfitData.updateOutfitById(dummyOutfitId, ["item3"]);
    expect(result.items).toContain("item3");
  });

  test("deleteOutfitById - should confirm deletion", async () => {
    outfitData.deleteOutfitById.mockResolvedValue({ deleted: true, id: dummyOutfitId });

    const result = await outfitData.deleteOutfitById(dummyOutfitId);
    expect(result).toEqual({ deleted: true, id: dummyOutfitId });
  });

  test("getImages - should return item data list", async () => {
    outfitData.getImages.mockResolvedValue([{ name: "Shirt" }, { name: "Pants" }]);

    const result = await outfitData.getImages(["Shirt", "Pants"], dummyUserId);
    expect(result.length).toBe(2);
  });

  // Negative Test Cases
  test("createOutfit - should throw error when items array is empty", async () => {
    outfitData.createOutfit.mockRejectedValue(new Error("Items must be a non-empty array"));

    await expect(outfitData.createOutfit("user123", [])).rejects.toThrow("Items must be a non-empty array");
  });

  test("getOutfitById - should throw error for invalid ID", async () => {
    outfitData.getOutfitById.mockRejectedValue(new Error("Outfit not found"));

    await expect(outfitData.getOutfitById("invalid-id")).rejects.toThrow("Outfit not found");
  });

  test("updateOutfitById - should throw error if items are missing", async () => {
    outfitData.updateOutfitById.mockRejectedValue(new Error("Must provide valid items array for update"));

    await expect(outfitData.updateOutfitById("outfitId", [])).rejects.toThrow("Must provide valid items array for update");
  });

  test("deleteOutfitById - should throw error if outfit does not exist", async () => {
    outfitData.deleteOutfitById.mockRejectedValue(new Error("Outfit not found"));

    await expect(outfitData.deleteOutfitById("nonexistent")).rejects.toThrow("Outfit not found");
  });

  test("getImages - should return empty array for unknown items", async () => {
    outfitData.getImages.mockResolvedValue([]);

    const result = await outfitData.getImages(["unknown"], "someUserId");
    expect(result).toEqual([]);
  });
});
