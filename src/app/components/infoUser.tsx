"use client";

import { manageAuth } from "@/app/action/manage-auth";
import { redirect } from "next/navigation";
export default function InfoUser({ profileData }: { profileData: any }) {
    if (!profileData) return null;

    const handleLogout = async () => {
        await manageAuth();
    }
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <img
          src={profileData.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-600"
        />
        <h1 className="text-2xl font-semibold">{profileData.name}</h1>
        <p className="text-gray-400">{profileData.email}</p>

        <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      </div>
    );
  }
  