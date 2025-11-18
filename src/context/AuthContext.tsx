// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    onAuthStateChanged,
    onIdTokenChanged,
    signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    getIdToken: () => Promise<string | null>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // keep user in sync
    useEffect(() => {
        const unsub1 = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        const unsub2 = onIdTokenChanged(auth, (u) => setUser(u)); // updates when token refreshes
        return () => {
            unsub1();
            unsub2();
        };
    }, []);

    const getIdToken = async () => (user ? user.getIdToken() : null);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            loading,
            getIdToken,
            logout: () => signOut(auth),
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
