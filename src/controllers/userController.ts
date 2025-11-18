// src/controllers/userController.ts
import { api } from "../lib/api";
import type { UserProfile } from "../lib/types";

export const getProfile = () => api<UserProfile>("/api/user/profile");

export const updateProfile = (payload: Partial<UserProfile>) =>
    api<{ success: boolean; message: string }>("/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
    });

/**
 * NOTE: your backend has two shapes for progress.
 * This consumes the aggregated one in userController.getUserProgress.
 */
export const getUserProgress = () =>
    api<{ milestones: any[]; summary: { total: number; completed: number; currentMilestone: number } }>(
        "/api/user/progress"
    );

export const getDashboardData = () =>
    api<{ profile: UserProfile; progressSummary: any; totalMilestones: number }>(
        "/api/user/dashboard"
    ); // if you expose it; else build from the two above
