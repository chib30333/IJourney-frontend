import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    if (loading) return <div className="p-6 bg-white min-w-screen min-h-screen">Loading…</div>;
    
    return children;
}

export default ProtectedRoute;