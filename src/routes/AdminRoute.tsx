// src/components/AdminRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (loading) return;
            if (!user) return setAllowed(false);
            try {
                // hit any admin endpoint to verify role (server checks custom claims)
                await api(`/api/admin/analytics`, { method: "GET" });
                if (mounted) setAllowed(true);
            } catch {
                if (mounted) setAllowed(false);
            }
        })();
        return () => { mounted = false; };
    }, [loading, user]);

    if (loading || allowed === null) return <div className="p-6">Checking access…</div>;
    if (!allowed) return <Navigate to="/" replace />;
    return children;
}
