import { Router } from "express";
const router = Router();
import { wardrobeData } from "../data/index.js";

router.route("/").post(async (req, res) => {
  try {
    const { userId, category, name, image } = req.body;
    if (!userId || !category || !name || !image) {
      return res.status(400).json({
        error: "All fields (userId, category, name, image) are required",
      });
    }
    const newWardrobeItem = await wardrobeData.createWardrobeItem(
      userId,
      category,
      name,
      image
    );
    res.status(201).json(newWardrobeItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/:userId").get(async (req, res) => {
  try {
    const userId = req.params.userId; // Expecting userId as a query parameter
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const wardrobeItems = await wardrobeData.getAllWardrobeItems(userId);
    res.status(200).json(wardrobeItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const itemId = req.params.id;
      const wardrobeItem = await wardrobeData.getWardrobeItemById(itemId);
      if (!wardrobeItem) {
        return res.status(404).json({ error: "Wardrobe item not found" });
      }
      res.status(200).json(wardrobeItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const itemId = req.params.id;
      const { category, name, image } = req.body;

      if (!category && !name && !image) {
        return res.status(400).json({
          error:
            "At least one field (category, name, image) must be provided for update",
        });
      }

      const updatedMessage = await wardrobeData.updateWardrobeItem(
        itemId,
        category,
        name,
        image
      );
      res.status(200).json(updatedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const itemId = req.params.id;
      const deleteItem = await wardrobeData.deleteWardrobeItem(itemId);
      res.status(200).json(deleteItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
