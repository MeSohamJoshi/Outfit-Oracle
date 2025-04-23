// aiOutfitService.test.js
import { generateAIOutfit } from "../services/aiOutfitService.js";
import { jest } from "@jest/globals";
import { wardrobeData, outfitData } from "../services/index.js";
import { getWeatherData } from "../helpers.js";
import OpenAI from "openai";

jest.mock("../services/index.js", () => ({
  wardrobeData: { getAllWardrobeItems: jest.fn() },
  outfitData: { createOutfit: jest.fn() }
}));

jest.mock("../helpers.js", () => ({
  getWeatherData: jest.fn()
}));

jest.mock("openai");

describe("generateAIOutfit", () => {
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
    choices: [
      {
        message: {
          content: JSON.stringify({
            outfits: [
              {
                name: "Casual Look",
                description: "Perfect for sunny days",
                items: ["item1", "item2"],
                images: ["img1.jpg", "img2.jpg"]
              }
            ]
          })
        }
      }
    ]
  };

  beforeEach(() => {
    wardrobeData.getAllWardrobeItems.mockResolvedValue(wardrobeItems);
    getWeatherData.mockResolvedValue(weatherData);
    OpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockAIResponse)
        }
      }
    }));
    outfitData.createOutfit.mockResolvedValue({});
  });

  it("should generate outfits and save them", async () => {
    const result = await generateAIOutfit(mockUserId, mockLocation);
    expect(result).toHaveLength(1);
    expect(outfitData.createOutfit).toHaveBeenCalledWith(
      mockUserId,
      ["item1", "item2"],
      expect.stringContaining("(AI Generated)"),
      "Perfect for sunny days"
    );
  });

  it("should throw error if OpenAI fails", async () => {
    OpenAI.mockImplementation(() => ({
      chat: { completions: { create: jest.fn().mockRejectedValue(new Error("API fail")) } }
    }));

    await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow("Failed to generate outfits from AI.");
  });

  it("should throw error on invalid AI response", async () => {
    OpenAI.mockImplementation(() => ({
      chat: { completions: { create: jest.fn().mockResolvedValue({ choices: [{ message: { content: "{}" } }] }) } }
    }));

    await expect(generateAIOutfit(mockUserId, mockLocation)).rejects.toThrow();
  });
});
