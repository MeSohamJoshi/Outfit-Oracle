import { jest } from "@jest/globals";

// ✅ Correct class-based mocking for OpenAI
jest.mock("openai", () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});
import OpenAI from "openai";

import { generateAIOutfit } from "../data/aiOutfitService.js";
import { wardrobeData, outfitData } from "../data/index.js";
import { getWeatherData } from "../helpers.js";

// 🧹 Manual mock overrides for functions
wardrobeData.getAllWardrobeItems = jest.fn();
outfitData.createOutfit = jest.fn();
getWeatherData.mockResolvedValue = jest.fn();

describe("generateAIOutfit - Comprehensive Tests", () => {
  const mockUserId = "user123";
  const mockLocation = "New York";

  const wardrobeItems = [
    { category: "Shirt", name: "Blue Shirt", image: "img1.jpg" },
    { category: "Pants", name: "Black Jeans", image: "img2.jpg" }
  ];

  const weatherData = {
    temp: 22,
    condition: "Sunny",
    humidity: 40
  };

  const mockAIResponse = {
    choices: [{
      message: {
        content: JSON.stringify({
          outfit: [
            { category: "Shirt", item: "Blue Shirt" },
            { category: "Pants", item: "Black Jeans" }
          ]
        })
      }
    }]
  };

  let openAIInstance;

  beforeEach(() => {
    wardrobeData.getAllWardrobeItems.mockResolvedValue(wardrobeItems);
    outfitData.createOutfit.mockResolvedValue({ id: "outfit123", items: wardrobeItems });
    getWeatherData.mockResolvedValue(weatherData);

    openAIInstance = {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockAIResponse)
        }
      }
    };
    OpenAI.mockImplementation(() => openAIInstance);
  });

//   // ✅ Unit test
//   it("should generate an outfit successfully", async () => {
//     const result = await generateAIOutfit(mockUserId, mockLocation);
//     expect(result).toEqual({ id: "outfit123", items: wardrobeItems });
//   });

//   // 🔁 Integration-style: ensure AI is called with expected prompt
//   it("should pass correct prompts to OpenAI", async () => {
//     await generateAIOutfit(mockUserId, mockLocation);
//     expect(openAIInstance.chat.completions.create).toHaveBeenCalledWith(expect.objectContaining({
//       messages: expect.any(Array)
//     }));
//   });

//   // 🛡 Edge case: no wardrobe items
//   it("should throw error if no wardrobe items exist", async () => {
//     wardrobeData.getAllWardrobeItems.mockResolvedValue([]);
//     await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("No wardrobe items available");
//   });

//   // 🛡 Edge case: malformed AI response
//   it("should throw if AI response content is missing", async () => {
//     openAIInstance.chat.completions.create.mockResolvedValue({
//       choices: [{ message: {} }]
//     });
//     await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("AI response malformed");
//   });

//   // 💥 Negative: weather API failure
//   it("should handle weather service failure", async () => {
//     getWeatherData.mockRejectedValue(new Error("Weather API error"));
//     await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("Weather API error");
//   });

//   // 💥 Negative: OpenAI failure
//   it("should handle OpenAI service failure", async () => {
//     openAIInstance.chat.completions.create.mockRejectedValue(new Error("OpenAI crashed"));
//     await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("OpenAI crashed");
//   });

//   // 💥 Negative: DB failure on outfit save
//   it("should handle DB failure on outfit save", async () => {
//     outfitData.createOutfit.mockRejectedValue(new Error("DB error"));
//     await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("DB error");
