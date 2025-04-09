import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from "../Context/AuthContext.jsx";

const Outfits = () => {
    const [outfits, setOutfits] = useState([]);
    const [data, setData] = useState([]);
     const { authState } = useAuth();

    if (!authState.isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
                Please login to view your wardrobe.
            </div>
        );
    }

    const fetchAIGeneratedOutfits = async () => {
        try{
            const response = await axios.post("http://localhost:3000/outfits/ai-generate", {location: "Hoboken", userId: authState.user._id});
            console.log("Here");
            console.log(response.data);
            setData(response.data);
            fetchUserOutfitImages();
        }catch(error){
            console.error(error);
            alert(error.message);
        }
    }


    const dummyData = [
        {
            userId: "67e464783f89c35b229a223b",
            items: [
                "Silver Modern Pants",
                "Classic White Shirt",
                "Denim Blue Jacket",
                "Black Leather Boots",
                "Bold Red Scarf"
            ],
            createdAt: "2025-04-09T18:57:02.397Z",
            _id: "67f6c2fe11179e59ffa85d34"
        },
        {
            userId: "67e464783f89c35b229a223b",
            items: [
                "Navy Slim Pants",
                "Graphic Black Tee",
                "Flannel Checked Shirt",
                "White Sneakers"
            ],
            createdAt: "2025-04-09T18:57:02.398Z",
            _id: "67f6c2fe11179e59ffa85d35"
        },
        {
            userId: "67e464783f89c35b229a223b",
            items: [
                "Silver Modern Pants",
                "Graphic Black Tee",
                "Puffer Winter Jacket",
                "Black Leather Boots"
            ],
            createdAt: "2025-04-09T18:57:02.399Z",
            _id: "67f6c2fe11179e59ffa85d36"
        }
    ];

    const fetchUserOutfitImages = async () => {
        try {
            // if(data.length === 0) {
            //     return;
            // }
            const response = await axios.post("http://localhost:3000/outfits/getOutfitImages", {oData: dummyData, userId: authState.user._id});
            setOutfits(response.data); // API returns an array of outfit arrays
        } catch (error) {
            console.error("Error fetching outfit images:", error);
        }
    };



    useEffect(() => {
        // fetchAIGeneratedOutfits();
        fetchUserOutfitImages();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-12 px-6 lg:px-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">AI Suggested Outfits</h2>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {outfits.map((outfit, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-sm text-gray-500 mb-2">{`Outfit ${index + 1}`}</p>
                            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                                {outfit.length} Item{outfit.length > 1 ? 's' : ''}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {outfit.map((item) => (
                                    <div key={item._id} className="text-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-32 object-cover rounded-lg shadow-sm mb-2"
                                        />
                                        <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Outfits;
