import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Chatbot from '../components/Chatbot';

function Layout() {
    const { loading } = useAuth();
    if (loading) return <div className="p-6 bg-white min-w-screen min-h-screen">Loading…</div>;
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 ">
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