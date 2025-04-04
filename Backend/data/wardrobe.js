import { ObjectId } from "mongodb";
import { wardrobeItems } from "../config/mongoCollections.js";
import {
  validateId,
  validateCategory,
  checkIsProperString,
} from "../helpers.js";
// Function to create a new wardrobe item
const createWardrobeItem = async (userId, category, name, image) => {
  userId = validateId(userId);
  category = validateCategory(category);
  name = checkIsProperString(name, "Name");

  try {
    const wardrobeCollection = await wardrobeItems();
    const newWardrobeItem = {
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      category,
      name,
      image,
      createdAt: new Date(),
    };

    const result = await wardrobeCollection.insertOne(newWardrobeItem);
    if (!result.acknowledged || !result.insertedId) {
      throw new Error("Failed to create wardrobe item.");
    }
    return { ...newWardrobeItem, _id: result.insertedId };
  } catch (error) {
    throw new Error(`Error creating wardrobe item: ${error.message}`);
  }
};

// Function to read all wardrobe items for a user
const getAllWardrobeItems = async (userId) => {
  userId = validateId(userId);
  try {
    const wardrobeCollection = await wardrobeItems();
    const userItems = await wardrobeCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    if (!userItems || userItems.length === 0) {
      throw new Error(`No wardrobe items found for user ID ${userId}.`);
    }
    return userItems;
  } catch (error) {
    throw new Error(`Error fetching wardrobe items: ${error.message}`);
  }
};

// Function to read a specific wardrobe item by ID
const getWardrobeItemById = async (itemId) => {
  itemId = validateId(itemId);
  try {
    const wardrobeCollection = await wardrobeItems();
    const item = await wardrobeCollection.findOne({
      _id: new ObjectId(itemId),
    });
    if (!item) throw new Error(`No wardrobe item found with ID ${itemId}.`);
    return item;
  } catch (error) {
    throw new Error(`Error fetching wardrobe item by ID: ${error.message}`);
  }
};

// Function to update a wardrobe item
const updateWardrobeItem = async (itemId, category, name, image) => {
  itemId = validateId(itemId);
  if (category) category = validateCategory(category);
  if (name) name = checkIsProperString(name, "Name");

  try {
    const updateFields = {};
    if (category) updateFields.category = category;
    if (name) updateFields.name = name;
    if (image) updateFields.image = image;

    const wardrobeCollection = await wardrobeItems();
    const updateResult = await wardrobeCollection.updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { ...updateFields, updatedAt: new Date() } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error(`No changes made or item not found with ID ${itemId}.`);
    }

    return { message: `Wardrobe item ${itemId} updated successfully.` };
  } catch (error) {
    console.error(`Error updating wardrobe item: ${error.message}`);
    throw error;
  }
};

// Function to delete a wardrobe item
const deleteWardrobeItem = async (itemId) => {
  itemId = validateId(itemId);
  try {
    const wardrobeCollection = await wardrobeItems();
    const deleteResult = await wardrobeCollection.deleteOne({
      _id: new ObjectId(itemId),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error(`No wardrobe item found with ID ${itemId}`);
    }

    return { message: `Wardrobe item ${itemId} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting wardrobe item: ${error.message}`);
    throw error;
  }
};

export default {
  createWardrobeItem,
  getAllWardrobeItems,
  getWardrobeItemById,
  updateWardrobeItem,
  deleteWardrobeItem,
};
