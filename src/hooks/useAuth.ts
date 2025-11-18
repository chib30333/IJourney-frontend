// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import type { User } from "firebase/auth"; // type-only import
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig"; // your initialized auth

export function useAuth(): User | null {
    const [user, setUser] = useState<User | null>(null); // <-- explicit typing

    useEffect(() => {
        // onAuthStateChanged returns an unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // currentUser is User | null, matches our state type
        });

        // cleanup when component unmounts
        return () => unsubscribe();
    }, []);

    return user;
}
