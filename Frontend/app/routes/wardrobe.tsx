import React from 'react';
import Sidebar from '../components/sidebar';

const items = [
    { id: 1, title: 'Orange Shirt', imageUrl: 'https://content.mycutegraphics.com/graphics/clothing/orange-tshirt.png' },
    { id: 2, title: 'Jeans', imageUrl: 'https://img.freepik.com/free-vector/pair-jeans-white-background_1308-74150.jpg' },
    { id: 3, title: 'Hat', imageUrl: 'https://img.freepik.com/premium-vector/yellow-orange-hat-with-red-ribbon-it_782516-37885.jpg?semt=ais_hybrid' },
    { id: 4, title: 'Polo', imageUrl: 'https://cdn.creazilla.com/cliparts/7813149/polo-shirt-clipart-lg.png' },
    { id: 5, title: 'Sneakers', imageUrl: 'https://cdn.creazilla.com/cliparts/34782/sneakers-shoes-clipart-original.png' },
    { id: 6, title: 'Jacket', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NJi0u3xZDblMfm46XwcxTAY1FlqOpxVllg&s' },
];

const Wardrobe = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '200px', padding: '20px' }}>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>Username's wardrobe</h1>
                    <div className='grid grid-cols-5 gap-4 mt-5'>
                        {items.map(item => (
                            <div key={item.id} className='bg-gray-300 text-center justify-center content-center p-2'>
                                <img src={item.imageUrl} alt={item.title} className='content-center justify-center h-25' />
                                <p className='mt-2 font-bold text-lg'>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wardrobe;