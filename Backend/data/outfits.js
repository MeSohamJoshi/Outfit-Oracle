import { ObjectId } from "mongodb";
import { outfits, wardrobeItems } from "../config/mongoCollections.js";
import { validateId } from "../helpers.js";

// Create new outfit
const createOutfit = async (userId, items) => {
  userId = validateId(userId);
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(
      "Items must be a non-empty array of valid wardrobe item IDs"
    );
  }
  try {
    const outfitCollection = await outfits();
    //const validItems = items.map((item) => new ObjectId(validateId(item)));

    const newOutfit = {
      userId: new ObjectId(userId),
      items: items,
      createdAt: new Date(),
    };

    const result = await outfitCollection.insertOne(newOutfit);
    return { ...newOutfit, _id: result.insertedId };
  } catch (error) {
    throw new Error(`Error creating outfit: ${error.message}`);
  }
};

// Get all outfits for a user
const getAllOutfits = async (userId) => {
  userId = validateId(userId);
  try {
    const outfitCollection = await outfits();
    return await outfitCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
  } catch (error) {
    throw new Error(`Error getting outfits: ${error.message}`);
  }
};

// Get outfit by ID
const getOutfitById = async (outfitId) => {
  outfitId = validateId(outfitId);
  try {
    const outfitCollection = await outfits();
    const outfit = await outfitCollection.findOne({
      _id: new ObjectId(outfitId),
    });
    if (!outfit) throw new Error("Outfit not found");
    return outfit;
  } catch (error) {
    throw new Error(`Error getting outfit: ${error.message}`);
  }
};

// Update outfit by ID
const updateOutfitById = async (outfitId, items) => {
  outfitId = validateId(outfitId);
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Must provide valid items array for update");
  }

  try {
    const outfitCollection = await outfits();
    // const validItems = items.map((item) => new ObjectId(validateId(item)));

    const updateResult = await outfitCollection.updateOne(
      { _id: new ObjectId(outfitId) },
      { $set: { items: items, createdAt: new Date() } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error("No outfits updated - outfit not found or data same");
    }
    return await getOutfitById(outfitId);
  } catch (error) {
    throw new Error(`Error updating outfit: ${error.message}`);
  }
};

// Delete outfit by ID
const deleteOutfitById = async (outfitId) => {
  outfitId = validateId(outfitId);
  try {
    const outfitCollection = await outfits();
    const deletionResult = await outfitCollection.deleteOne({
      _id: new ObjectId(outfitId),
    });
    if (deletionResult.deletedCount === 0) {
      throw new Error("Outfit not found");
    }
    return { deleted: true, id: outfitId };
  } catch (error) {
    throw new Error(`Error deleting outfit: ${error.message}`);
  }
};

const getImages = async (items, userId) => {
  const outfitCollection = await wardrobeItems();
  const res = [];
  for (let item of items) {
    const itemData = await outfitCollection.findOne({
      name: item,
      userId: ObjectId.createFromHexString(userId),
    });
    res.push(itemData);
  }
  return res;
};

export default {
  createOutfit,
  getAllOutfits,
  getOutfitById,
  updateOutfitById,
  deleteOutfitById,
  getImages,
};
