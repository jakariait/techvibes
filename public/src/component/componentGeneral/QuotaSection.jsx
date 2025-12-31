import React from "react";
import imgStashCheckCircleSolid from "../../assets/imgStashCheckCircleSolid.svg";
import imgGroup1 from "../../assets/imgGroup1.svg";
import imgRectangle5240 from "../../assets/imgRectangle5240.jpeg";
import QuotaForm from "./QuotaForm"; // Import the new component

const QuotaSection = () => {
  return (
    <div className="flex flex-col gap-4 items-center relative w-full px-4 py-8 ">
      <p className=" leading-normal text-center text-white text-3xl md:text-4xl  whitespace-pre-wrap mb-8">
        To Get a Quote Please fill out the Form
      </p>
      <div className="bg-[rgba(19,4,21,0.23)] border-2 border-transparent border-solid rounded-xl p-6 md:p-12 w-full ">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start w-full">
          {/* Left Section - Contact Info */}
          <div className="flex flex-col gap-12 w-full md:w-6/12 lg:w-6/12">
            <div className="flex flex-col gap-6 w-full">
              <p className=" leading-normal text-[#fffafa] text-3xl md:text-4xl">
                Grow your brand. Tap smart.
              </p>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-2 items-center">
                  <div
                    className="size-10 shrink-0"
                    data-name="stash:check-circle-solid"
                  >
                    <img
                      alt="Check icon"
                      className="size-full"
                      src={imgStashCheckCircleSolid}
                    />
                  </div>
                  <p className=" leading-normal text-[#fffafa] text-lg md:text-xl">
                    24-Hour Response Time
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex gap-2 items-center">
                    <div
                      className="size-10 shrink-0"
                      data-name="stash:check-circle-solid"
                    >
                      <img
                        alt="Check icon"
                        className="size-full"
                        src={imgStashCheckCircleSolid}
                      />
                    </div>
                    <p className=" leading-normal text-[#fffafa] text-lg md:text-xl">
                      NDA on Request
                    </p>
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    <div
                      className="size-10 shrink-0"
                      data-name="stash:check-circle-solid"
                    >
                      <img
                        alt="Check icon"
                        className="size-full"
                        src={imgStashCheckCircleSolid}
                      />
                    </div>
                    <p className=" leading-normal text-[#fffafa] text-lg md:text-xl">
                      Dedicated NFC Specialists
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-72 w-full relative rounded-xl">
              <img
                alt="Jack Mahid"
                className="absolute inset-0 size-full object-cover rounded-xl"
                src={imgRectangle5240}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col  gap-1 leading-normal w-full whitespace-pre-wrap">
                <p className="text-[#fffafa] text-3xl md:text-4xl w-full">
                  Jack Mahid
                </p>
                <p className="text-[#dacbcb] text-sm md:text-base w-full">{`CEO & Co-Founder`}</p>
              </div>
              <div className="flex gap-3 items-center">
                <div
                  className="size-4 shrink-0 overflow-clip"
                  data-name="mingcute:whatsapp-fill"
                >
                  <div>
                    <img
                      alt="WhatsApp icon"
                      className="w-4 h-4"
                      src={imgGroup1}
                    />
                  </div>
                </div>
                <p className=" leading-normal text-xl text-[rgba(223,213,213,0.8)] text-center">
                  01997897....
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <QuotaForm />
        </div>
      </div>
    </div>
  );
};

export default QuotaSection;
