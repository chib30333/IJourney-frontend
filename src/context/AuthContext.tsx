// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    onAuthStateChanged,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import toast from 'react-hot-toast';
import type { UserProfile } from '../lib/types';
import { auth } from '../firebaseConfig';
import { getProfile } from '../controllers/userController';
import { login } from '../controllers/authController';

type AuthContextValue = {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    getIdToken: () => Promise<string | null>;
    loginWithEmailPassword: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // keep user in sync
    useEffect(() => {
        const unsub1 = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            setLoading(false);

            if (u) {
                try {
                    const profile = await getProfile();
                    setUserProfile(profile as UserProfile);
                } catch (err) {
                    console.error("Failed to fetch backend profile:", err);
                }
            } else {
                setUserProfile(null);
            }
        });
        const unsub2 = onIdTokenChanged(auth, (u) => setUser(u)); // updates when token refreshes
        return () => {
            unsub1();
            unsub2();
        };
    }, []);

    const getIdToken = async () => (user ? user.getIdToken() : null);

    const loginWithEmailPassword = async (email: string, password: string) => {
        setLoading(true);
        try {
            // Firebase sign in
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await cred.user.getIdToken();

            // Hit backend /api/auth/login to get full user doc
            const data = await login(idToken);
            setUserProfile(data.user as UserProfile);

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // 3) Logout
    const logout = async () => {
        await signOut(auth);
        setUserProfile(null);
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            userProfile,
            loading,
            getIdToken,
            loginWithEmailPassword,
            logout,
        }),
        [user, userProfile, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
