// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Chatbot from '../components/Chatbot';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen  bg-gray-100 ">
            <Header />
            <main className='relative'>
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Layout;