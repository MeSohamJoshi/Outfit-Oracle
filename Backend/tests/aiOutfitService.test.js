// aiOutfitService.test.js - Comprehensive Testing Suite
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

describe("generateAIOutfit - Unit & Integration Tests", () => {
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
    expect(outfitData.createOutfit).toHaveBeenCalled();
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

  it("should handle empty wardrobe gracefully", async () => {
    wardrobeData.getAllWardrobeItems.mockResolvedValue([]);
    await expect(generateAIOutfit(mockUserId, mockLocation)).resolves.toEqual([]);
  });
});

describe("generateAIOutfit - Security, Edge Case, and Negative Tests", () => {
  it("should not expose API key in error", async () => {
    OpenAI.mockImplementation(() => ({
      chat: { completions: { create: jest.fn().mockImplementation(() => { throw new Error("Sensitive info") }) } }
    }));
    await expect(generateAIOutfit("user123", "city")).rejects.toThrow("Failed to generate outfits from AI.");
  });

  it("should throw if location is null", async () => {
    await expect(generateAIOutfit("user123", null)).rejects.toThrow();
  });

  it("should throw if wardrobe service fails", async () => {
    wardrobeData.getAllWardrobeItems.mockRejectedValue(new Error("Wardrobe DB error"));
    await expect(generateAIOutfit("user123", "city")).rejects.toThrow("Wardrobe DB error");
  });

  it("should throw if weather service fails", async () => {
    getWeatherData.mockRejectedValue(new Error("Weather API error"));
    await expect(generateAIOutfit("user123", "city")).rejects.toThrow("Weather API error");
  });

  it("should throw if outfit saving fails", async () => {
    outfitData.createOutfit.mockRejectedValue(new Error("DB write failed"));
    await expect(generateAIOutfit("user123", "city")).rejects.toThrow("DB write failed");
  });
});
