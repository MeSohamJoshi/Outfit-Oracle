import { Router } from "express";
const router = Router();
import { generateAIOutfit } from "../data/aiOutfitService.js";
import { outfitData } from "../data/index.js";

// Add this to existing routes
router.route("/ai-generate").post(async (req, res) => {
  try {
    const { userId, location } = req.body;
    const outfits = await generateAIOutfit(userId, location);
    return res.consstatus(201).json(outfits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.route("/getOutfitImages").post(async (req, res) => {
  try {
    const oData = req.body.oData;
    const userId = req.body.userId;
    const result = [];
    for (let outfit of oData) {
      const getImages = await outfitData.getImages(outfit.items, userId);
      result.push(getImages);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
