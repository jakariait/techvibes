import React from "react";
import imgIxUserProfileFilled from "../../assets/imgIxUserProfileFilled.svg";
import imgMdiEmail from "../../assets/imgMdiEmail.svg";
import imgMdiPassword from "../../assets/imgMdiPassword.svg";
import imgRoentgenPhone from "../../assets/imgRoentgenPhone.svg";

const CreateProfileForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic goes here
    console.log("Create Profile button clicked");
  };

  return (
    <div className="flex items-center justify-center py-20 p-4 ">
      <div className="w-full max-w-xl">
        <div className="text-center mb-12">
          <p
            className="bg-clip-text bg-linear-to-r from-[#4e52fb] to-[#20acf7] text-3xl font-bold"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Create Your Digital Profile
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[rgba(255,255,255,0)] border-[#9c9ce1] border-[3px] border-solid rounded-xl shadow-[4px_4px_16.7px_0px_#fff8f8] p-6 sm:p-12 md:p-20"
        >
          <div className="flex flex-col gap-8">
            <div className="relative flex items-center">
              <img
                alt="full name"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-11"
                src={imgIxUserProfileFilled}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-16 pl-20 pr-4 py-2 rounded-lg bg-[rgba(159,158,165,0.2)] text-[#d8d8eb] text-xl placeholder:text-[#d8d8eb] focus:outline-none focus:ring-2 focus:ring-[#4e52fb]"
              />
            </div>
            <div className="relative flex items-center">
              <img
                alt="email"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-11"
                src={imgMdiEmail}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-16 pl-20 pr-4 py-2 rounded-lg bg-[rgba(159,158,165,0.2)] border border-[rgba(216,216,235,0.42)] border-solid text-[#d8d8eb] text-xl placeholder:text-[#d8d8eb] focus:outline-none focus:ring-2 focus:ring-[#4e52fb]"
              />
            </div>
            <div className="relative flex items-center">
              <img
                alt="password"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-11"
                src={imgMdiPassword}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-16 pl-20 pr-4 py-2 rounded-lg bg-[rgba(159,158,165,0.2)] border border-[rgba(216,216,235,0.42)] border-solid text-[rgba(216,216,235,0.42)] text-xl placeholder:text-[rgba(216,216,235,0.42)] focus:outline-none focus:ring-2 focus:ring-[#4e52fb]"
              />
            </div>
            <div className="relative flex items-center">
              <img
                alt="phone number"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-11"
                src={imgRoentgenPhone}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full h-16 pl-20 pr-4 py-2 rounded-lg bg-[rgba(159,158,165,0.2)] text-[#d8d8eb] text-xl placeholder:text-[#d8d8eb] focus:outline-none focus:ring-2 focus:ring-[#4e52fb]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-8 bg-linear-to-b from-[#b1ebf6] to-[#5718f0] border-b-2 border-[#9c43ca] rounded-md shadow-[2px_2px_21.1px_0px_#6b519d] text-[#ebecff] text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfileForm;
