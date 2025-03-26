import React from 'react';
import { 
    HomeIcon,
    RectangleGroupIcon,
    CpuChipIcon,
    CalendarIcon,
    ClockIcon,
    Cog6ToothIcon
 } from '@heroicons/react/24/solid'
import Home from '~/routes/home';

const Sidebar = () => {
    return (
        <div className='w-48 bg-gray-800 fixed h-full px-4 py-2'>
            <div className='my-2 mb-4'>
                <h1 className='text-2xl text-white font-bold'>Outfit Oracle</h1>
            </div>
            <hr className='text-white'/>
            <ul className='mt-3 text-white font-bold'>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='/dashboard' className='px-3'>
                        <HomeIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        Dashboard
                    </a>
                </li>

                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='/wardrobe' className='px-3'>
                        <RectangleGroupIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        Wardrobe
                    </a>
                </li>

                {/* <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='#' className='px-3'>
                        <CpuChipIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        Styling
                    </a>
                </li> */}

                {/* <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='#' className='px-3'>
                        <CalendarIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        Events
                    </a>
                </li> */}

                {/* <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='#' className='px-3'>
                        <ClockIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        History
                    </a>
                </li> */}

                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href='/login' className='px-3'>
                        <Cog6ToothIcon className='inline-block w-6 h-6 mr-2 -mt-2'/>
                        Login
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;