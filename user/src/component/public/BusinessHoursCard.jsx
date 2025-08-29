import React, { useState } from "react";
import { Clock, Calendar, X } from "lucide-react";
import AppointmentForm from "./AppointmentForm.jsx";
import ImageComponent from "./ImageComponent.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const BusinessHoursCard = ({ profile, user }) => {
  const { theme } = useTheme();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  if (user?.role !== "corporate") return null;

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-6 rounded-xl h-full overflow-hidden`}
    >
      <div className={`flex flex-col items-center gap-6`}>
        {/* Left side - Business Hours */}
        <div
          className={`flex flex-col items-center sm:flex-row sm:items-center gap-5 text-center sm:text-left`}
        >
          <div
            className={`w-14 h-14 bg-gradient-to-br ${theme.skillBgColor}  rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            <Clock className={`w-7 h-7 ${theme.iconColor}`} />
          </div>

          <div>
            <h2 className={`${theme.text} mb-1 tracking-wide`}>
              BUSINESS HOURS
            </h2>
            <div className={`${theme.text} text-base sm:text-lg`}>
              <div className={`font-semibold`}>
                {profile.businessDay.start} - {profile.businessDay.end}:
              </div>
              <div className={`font-light`}>
                {profile.businessHours.start} - {profile.businessHours.end}{" "}
                {profile.businessTimeZone}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Appointment Button */}
        <div>
          <button
            onClick={handleOpen}
            className={`bg-gradient-to-r ${theme.skillBgColor} ${theme.text} px-6 py-3 rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 whitespace-nowrap cursor-pointer`}
          >
            <Calendar className={`w-6 h-6`} />
            <span>Appointment</span>
          </button>
        </div>

        {/* Custom Dialog with AppointmentForm */}
        {openDialog && (
          <div
            className="fixed inset-0  bg-opacity-10 flex justify-center items-center z-50"
            onClick={handleClose}
          >
            <div
              className={`${theme.connectFormBg} rounded-2xl shadow-2xl w-full max-w-md m-4 overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6 text-center">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 cursor-pointer text-red-500"
                  aria-label="close"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <ImageComponent
                    imageName={profile?.profilePhoto}
                    className="h-32 w-32 object-cover rounded-full border-4 border-gray-600"
                  />
                  <h3 className={`text-xl font-semibold ${theme.text}`}>
                    Set Appointment With {user.fullName}
                  </h3>
                </div>
              </div>
              <div className="px-6 pb-6">
                <AppointmentForm userId={user._id} onSuccess={handleClose} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessHoursCard;