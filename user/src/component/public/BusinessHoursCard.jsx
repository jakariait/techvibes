import React, { useState } from "react";
import { Clock, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentForm from "./AppointmentForm.jsx";
import ImageComponent from "./ImageComponent.jsx";

const BusinessHoursCard = ({ profile, user }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  if (user?.role !== "corporate") return null;

  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl h-full overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Left side - Business Hours */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5 text-center sm:text-left">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <Clock className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-white mb-1 tracking-wide">BUSINESS HOURS</h2>
            <div className="text-gray-300 text-base sm:text-lg">
              <div className="font-semibold">
                {profile.businessDay.start} - {profile.businessDay.end}:
              </div>
              <div className="font-light">
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
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-6 h-6" />
            <span>Appointment</span>
          </button>
        </div>
        {/* MUI Dialog with ConnectForm */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: "#212F35", // light cyan
            },
          }}
        >
          <DialogTitle className="relative text-white px-6 pt-6 pb-4">
            {/* Close button absolutely positioned in top right */}
            <IconButton
              onClick={handleClose}
              className="!absolute top-2 right-2"
              aria-label="close"
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>

            {/* Centered content */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <ImageComponent
                imageName={profile?.profilePhoto}
                className="h-40 w-40 object-cover rounded-full"
              />
              <p>Set Appointmen With {user.fullName}</p>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <AppointmentForm userId={user._id} onSuccess={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BusinessHoursCard;
