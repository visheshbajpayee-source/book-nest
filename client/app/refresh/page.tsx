"use client";

import { useState } from "react";

export default function RefreshPage() {
  const [message, setMessage] = useState("");

  const handleRefreshToken = () => {
    const refreshToken = localStorage.getItem("booknest_refresh_token");

    if (!refreshToken) {
      setMessage("No refresh token found. Please login again.");
      return;
    }

    const newAccessToken = "new-dummy-access-token";

    localStorage.setItem("booknest_token", newAccessToken);

    setMessage("Access token refreshed successfully.");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-10">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#4E2F28]">Refresh Token</h1>

        <p className="mt-3 text-gray-500">
          This page simulates refreshing the access token.
        </p>

        <button
          onClick={handleRefreshToken}
          className="mt-6 w-full bg-[#4E2F28] text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Refresh Access Token
        </button>

        {message && (
          <p className="mt-5 text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
