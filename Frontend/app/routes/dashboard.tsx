import React from 'react';
import Sidebar from '../components/sidebar';
import {
    CloudIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from '@heroicons/react/24/solid'
const currDate = new Date().toLocaleDateString();

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '200px', padding: '20px' }}>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>Welcome back, Username</h1>
                    <div className='my-5 px-10 py-20 bg-gray-300'>
                        <h1 className='text-4xl font-bold'>Dress Smarter, Live Stylishly</h1>
                        <p className='pr-200'>Tap into the future of fashion with Outfit Oracle - your AI powered wardrobe assistant. Effortlessly organize, track, and style your outfits with smart, personalized reccomendations.</p>
                    </div>

                    <section className='flex flex-row gap-5'>
                        <div className='basis-3/5'>
                            <div className='bg-blue-300 py-2'><h2 className='text-lg font-bold text-center'>Quick Outfits</h2></div>
                            <div className='flex items-center p-2 justify-center border-4 border-blue-300'>
                                    <ArrowLeftIcon className='h-6 w-6 text-gray-800 cursor-pointer' />
                                    <div className='grid grid-rows-5 gap-4 mx-4'>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index} className='text-center'>
                                            <img src={`https://via.placeholder.com/150?text=Image+${index + 1}`} alt={`Image ${index + 1}`} className='w-full' />
                                            <p className='mt-2'>Label {index + 1}</p>
                                        </div>
                                    ))}
                                </div>
                                <ArrowRightIcon className='h-6 w-6 text-gray-800 cursor-pointer' />
                        
                        </div>
                        
                        </div>
                        <div className='basis-2/5'>
                            <div className='bg-red-300 py-2'><h2 className='text-lg font-bold text-center'>Today is {currDate}</h2></div>
                            <div className='border-red-300 border-4 p-2 text-center'>
                                <h3 className='font-bold text-lg'>Weather Forecast:</h3>
                                <p>FORECAST HERE</p>
                                <hr />

                                <h3 className='font-bold text-lg'>Upcoming Events:</h3>
                                <p>EVENT 1 HERE</p>
                                <p>EVENT 2 HERE</p>
                                <p>EVENT 3 HERE</p>
                                <p>EVENT 4 HERE</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;