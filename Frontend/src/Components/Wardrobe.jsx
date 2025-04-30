import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import axios from "axios";

const Wardrobe = () => {
  const { authState } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "",
    name: "",
    image: "",
  });

  const userId = authState?.user?._id;

  // Fetch items
  useEffect(() => {
    if (!userId) return;

    const fetchWardrobeItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/wardrobe/${userId}`
        );
        setWardrobeItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching wardrobe items:", err);
        setError("Failed to load wardrobe items.");
        setLoading(false);
      }
    };

    fetchWardrobeItems();
  }, [userId]);

  // Add item
  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:3000/wardrobe", {
        ...newItem,
        userId,
      });
      setWardrobeItems((prev) => [...prev, response.data]);
      setNewItem({ category: "", name: "", image: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wardrobe/${id}`);
      setWardrobeItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please login to view your wardrobe.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading wardrobe...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Your Wardrobe</h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={() => setShowModal(true)}
        >
          + Add Item
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wardrobeItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-xs text-gray-400 mt-auto">
              Added on {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleDelete(item._id)}
              className="mt-4 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Item
            </h3>
            <input
              type="text"
              placeholder="Category"
              className="w-full border rounded px-3 py-2 mb-3"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded px-3 py-2 mb-3"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border rounded px-3 py-2 mb-4"
              value={newItem.image}
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
