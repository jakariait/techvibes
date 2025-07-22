import React from "react";
import { UserX, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0E191E] flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="animate-bounce mb-4">
        <UserX size={80} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold mb-2">User Not Found</h1>
      <p className="text-gray-300 max-w-md">
        We couldn't find the profile you’re looking for. It might have been
        removed or the link is incorrect.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-all duration-200"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>
    </div>
  );
};

export default UserNotFound;
