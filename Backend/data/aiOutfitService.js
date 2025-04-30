// backend/services/aiOutfitService.js
import OpenAI from "openai";
import { getWeatherData } from "../helpers.js";
import { wardrobeData, outfitData } from "./index.js";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIOutfit = async (userId, location) => {
  // 1. Get User's Wardrobe
  const wardrobeItems = await wardrobeData.getAllWardrobeItems(userId);

  // 2. Get Weather Data
  const weather = await getWeatherData(location);

  // 3. Prepare AI Prompt
  // const prompt = `Generate 3 outfit combinations using these clothing items:
  // ${wardrobeItems.map((item) => `${item.category}: ${item.name}`).join(", ")}

  // Weather Conditions:
  // - Temperature: ${weather.temp}°C
  // - Weather: ${weather.condition}
  // - Humidity: ${weather.humidity}%

  // Return only JSON format:
  // {
  //   "outfits": [{
  //     "name": "Outfit Name",
  //     "description": "Style description",
  //     "items": ["item_id_1", "item_id_2", ...]
  //   }]
  // }`;

  const prompt = `Generate 3 outfit combinations using these clothing items: 
${wardrobeItems
  .map((item) => `${item.category}: ${item.name} (Image: ${item.image})`)
  .join(", ")}

Weather Conditions:
- Temperature: ${weather.temp}°C
- Weather: ${weather.condition}
- Humidity: ${weather.humidity}%

Return only JSON format:
{
  "outfits": [{
    "description": "Style description",
    "name": "Outfit Name",
    "items": ["item_id_1", "item_id_2", ...],
    "images": ["image_url_1", "image_url_2", ...]
  }]
}`;

  // 4. Call OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "assistant",
        content:
          "You are an smart outfit agent who suggests outfits based on users thier wadrobe items, looking at weather conditions and what fits best return the exact names",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  // 5. Parse and Save Outfits
  const aiOutfits = JSON.parse(response.choices[0].message.content).outfits;

  return await Promise.all(
    aiOutfits.map(
      async (outfit) =>
        await outfitData.createOutfit(
          userId,
          outfit.items,
          `${outfit.name} (AI Generated)`,
          outfit.description
        )
    )
  );
};
