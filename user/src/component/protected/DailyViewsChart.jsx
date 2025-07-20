import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL;

const DailyViewsChart = ({ userId, token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDailyViews = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/profile/${userId}/views/daily`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dailyViews = response.data.dailyViews || [];

      // Format and sort the data by date
      const sortedData = dailyViews
        .map((entry) => ({
          date: entry._id,
          count: entry.count,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setData(sortedData);
    } catch (err) {
      console.error("Failed to fetch daily views:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchDailyViews();
    }
  }, [userId, token]);

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Last 30 Days Views
      </h3>

      {loading ? (
        <p className="text-gray-400">Loading chart...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No view data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#2f3b44" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(parseISO(date), "MMM d")}
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <YAxis
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              labelStyle={{ color: "#f3f4f6" }}
              itemStyle={{ color: "#60a5fa" }}
              labelFormatter={(label) => format(parseISO(label), "yyyy-MM-dd")}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#60a5fa" }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyViewsChart;
