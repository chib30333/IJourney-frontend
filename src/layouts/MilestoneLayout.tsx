import { Outlet } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Chatbot from '../components/Chatbot';

function MilestoneLayout() {
    return (
        <div className="flex flex-col min-h-screen  bg-gray-50 ">
            <Header />
            <div className="mt-[70px] mx-auto container font-ib-1 p-4">
                <div className={`flex flex-row gap-10`}>
                    <Sidebar />
                    <main className='relative w-full lg:ml-[300px] mt-10 px-8 py-10'>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Chatbot />
        </div>
    )
}

export default MilestoneLayout