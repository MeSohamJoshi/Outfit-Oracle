import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext.jsx";

const Outfits = () => {
  const { authState } = useAuth();
  const [outfits, setOutfits] = useState([]);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = authState?.user?._id;

  const fetchAIGeneratedOutfits = async () => {
    if (!city || !userId) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/outfits/ai-generate",
        {
          location: city,
          userId: userId,
        }
      );
      setData(response.data);
      fetchUserOutfitImages(response.data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOutfitImages = async (oData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/outfits/getOutfitImages",
        {
          oData: oData,
          userId: userId,
        }
      );
      setOutfits(response.data);
    } catch (error) {
      console.error("Error fetching outfit images:", error);
    }
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please login to view your wardrobe.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-12 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        AI Suggested Outfits
      </h2>

      <div className="max-w-md mx-auto mb-12 text-center">
        <input
          type="text"
          placeholder="Enter your city (e.g. Hoboken)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-md w-full mb-4"
        />
        <button
          onClick={fetchAIGeneratedOutfits}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Generate Outfits
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center text-gray-500 text-lg">
          Generating outfits...
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {outfits.map((outfit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-2">{`Outfit ${
                  index + 1
                }`}</p>
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  {outfit.length} Item{outfit.length > 1 ? "s" : ""}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {outfit.map((item) => (
                    <div key={item._id} className="text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg shadow-sm mb-2"
                      />
                      <p className="text-sm font-medium text-gray-700">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Outfits;
