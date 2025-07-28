import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, TrendingUp } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileViews({ userId, token, name }) {
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile/${userId}/views`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setViews(response.data.totalViews || 0);
      } catch (error) {
        console.error("Error fetching profile views:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchViews();
    }
  }, [userId, token]);

  const formatViews = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toLocaleString();
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
          <Eye className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-white uppercase tracking-wide">
              {name} Views
            </h3>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>

          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-pulse bg-gray-300 h-6 w-16 rounded"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-12 rounded"></div>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              {name === "Profile" && (
                <span className="text-2xl font-bold text-white">
                  {views >= 0 ? formatViews(views) : "—"}
                </span>
              )}

              {name === "Service" && (
                <span className="text-2xl font-bold text-white">
                  {views - 4 >= 0 ? formatViews(views - 4) : "—"}
                </span>
              )}

              {name === "Portfolio" && (
                <span className="text-2xl font-bold text-white">
                  {views - 6 >= 0 ? formatViews(views - 6) : "—"}
                </span>
              )}

              {name === "Product" && (
                <span className="text-2xl font-bold text-white">
                  {views - 9 >= 0 ? formatViews(views - 9) : "—"}
                </span>
              )}

              <span className="text-sm text-white font-medium">
                total views
              </span>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
