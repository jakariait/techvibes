import React, { useState } from "react";

const QuotaForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    projectBudget: "",
    projectDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor="fullName"
            className="leading-normal text-[#fffafa] text-xl w-full whitespace-pre-wrap"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jack Mahid"
            className="bg-[rgba(38,34,34,0.2)] border-[#fffafa] border-[0.5px] border-solid rounded-md h-14 px-5 text-[#dacbcb] text-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row gap-6 items-center w-full">
            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="email"
                className=" leading-normal text-[#fffafa] text-xl w-full whitespace-pre-wrap"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="asdhg87@gmail.com"
                className="bg-[rgba(38,34,34,0.2)] border-[#fffafa] border-[0.5px] border-solid rounded-md h-14 px-5 text-[rgba(223,213,213,0.8)] text-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="whatsapp"
                className=" leading-normal text-[#fffafa] text-xl w-full whitespace-pre-wrap"
              >
                WhatsApp
              </label>
              <input
                type="tel" // Use type="tel" for phone numbers
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="01997897...."
                className="bg-[rgba(38,34,34,0.2)] border-[#fffafa] border-[0.5px] border-solid rounded-md h-14 px-5 text-[rgba(223,213,213,0.8)] text-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className=" leading-normal text-[#fffafa] text-xl w-full whitespace-pre-wrap">
              Project Budget
            </p>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
                {[
                  "Less Than $5K",
                  "$5K - $10K",
                  "$10K - $20K",
                  "$20K - $50K",
                  "More Than $50K",
                ].map((budget, index) => (
                  <label
                    key={index}
                    className={`bg-[rgba(38,34,34,0.2)] border-[#fffafa] border-[0.5px] border-solid rounded-md px-4 py-3 flex items-center justify-center cursor-pointer transition-all duration-200
                      ${
                        formData.projectBudget === budget
                          ? "bg-blue-600 border-blue-600"
                          : "hover:border-blue-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="projectBudget"
                      value={budget}
                      checked={formData.projectBudget === budget}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className=" leading-normal text-[#dacaca] text-base text-center">
                      {budget}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor="projectDetails"
            className="leading-normal text-[#fffafa] text-xl w-full whitespace-pre-wrap"
          >
            Project Details
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            placeholder="Description"
            rows={6}
            className="bg-[rgba(38,34,34,0.2)] border-[#fffafa] border-[0.5px] border-solid rounded-xl px-5 py-4 text-[#dacbcb] text-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-b from-[#b1eaf5] to-[#5c22e9] border-[#9c43ca] border-b-2 rounded-xl shadow-[2px_2px_21.1px_0px_#6b519d] p-3 text-[#ebecff] text-base  leading-normal text-center w-auto self-start hover:from-[#5c22e9] hover:to-[#b1eaf5] transition-all duration-300"
        >
          Let’s Connect
        </button>
      </div>
    </form>
  );
};

export default QuotaForm;
