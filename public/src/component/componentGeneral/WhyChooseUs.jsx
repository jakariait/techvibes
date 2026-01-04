import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="flex flex-col items-center gap-[71px] w-full max-w-[1321px]">
        <h2 className="text-center text-[#4E52FB] text-4xl md:text-5xl font-bold">
          Why Choose Us
        </h2>

        {/* This div will be the relative parent for absolute positioning on larger screens */}
        <div className="relative w-full lg:h-[495px]">
          {/* Platform Header - Absolute position for larger screens, fluid for small */}
          <div
            className="lg:absolute lg:top-0 lg:left-[69px] lg:w-[1167px]
                          flex flex-col md:flex-row md:justify-between md:items-center
                          text-white text-base font-normal mb-4 lg:mb-0"
          >
            <div className="mb-2 md:mb-0">Platform</div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-[50px] lg:gap-[51px]">
              <div>One Tap</div>
              <div>Editable</div>
              <div>Reusable</div>
              <div>ECO-Friendly</div>
              <div>Technology</div>
            </div>
          </div>

          {/* Cards Container - Absolute position for larger screens, fluid for small */}
          <div
            className="lg:absolute lg:top-[43px] lg:left-0 lg:w-[1321px]
                          flex flex-col gap-3 mt-4 lg:mt-0"
          >
            {/* TechVibes NFC Card */}
            <div
              className="self-stretch h-auto lg:h-[220px] px-8 md:px-16 py-8 md:py-[59px]
                            bg-gradient-to-b from-[rgba(2.49,85.05,107.88,0.20)] to-[rgba(167.33,49.79,235.38,0.20)] bg-[#171025]
                            rounded-lg border-l-4 border-t-4 border-r border-b border-[#93C2EF]
                            flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 lg:gap-[72px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden">
                  <div className="absolute top-[0.16px] left-0 w-[100px] h-[99.68px] bg-[#1597D3]"></div>
                </div>
                <div className="flex flex-col items-start gap-3 w-auto lg:w-[288px]">
                  <div className="text-white text-2xl font-normal break-words">
                    TechVibes NFC{" "}
                  </div>
                  <div className="text-white text-sm font-normal break-words">
                    A smart card that shares digital information when tapped on
                    a smartphone
                  </div>
                </div>
              </div>

              {/* Icons for NFC Card */}
              <div className="flex flex-wrap justify-start lg:justify-between items-center gap-4 lg:gap-[72px]">
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[20px] top-[25px] w-[40px] h-[31.5px] bg-[#11F254]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[20px] top-[25px] w-[40px] h-[31.5px] bg-[#11F254]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[20px] top-[25px] w-[40px] h-[31.5px] bg-[#11F254]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[20px] top-[25px] w-[40px] h-[31.5px] bg-[#11F254]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[20px] top-[25px] w-[40px] h-[31.5px] bg-[#11F254]"></div>
                </div>
              </div>
            </div>

            {/* Business Card */}
            <div
              className="self-stretch h-auto lg:h-[220px] px-8 md:px-16 py-8 md:py-[60px]
                            bg-[rgba(157.47,143.15,186.10,0.09)] shadow-lg rounded-lg outline outline-1 outline-offset-[-1px] outline-[#91BFED]
                            flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 lg:gap-[72px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden">
                  <div className="absolute left-0 top-[14.29px] w-[100px] h-[71.43px] bg-[#7F31EE]"></div>
                </div>
                <div className="flex flex-col items-start gap-3 w-auto lg:w-[288px]">
                  <div className="text-white text-2xl font-normal break-words">
                    Business Card
                  </div>
                  <div className="text-white text-sm font-normal break-words">
                    A printed card made of paper or plastic
                  </div>
                </div>
              </div>

              {/* Icons for Business Card */}
              <div className="flex flex-wrap justify-start lg:justify-between items-center gap-4 lg:gap-[72px]">
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[21.69px] top-[21.69px] w-[36.62px] h-[36.62px] bg-[#FF0000]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[21.69px] top-[21.69px] w-[36.62px] h-[36.62px] bg-[#FF0000]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[21.69px] top-[21.69px] w-[36.62px] h-[36.62px] bg-[#FF0000]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[21.69px] top-[21.69px] w-[36.62px] h-[36.62px] bg-[#FF0000]"></div>
                </div>
                <div className="w-[80px] h-[80px] relative overflow-hidden flex-shrink-0">
                  <div className="absolute left-[21.69px] top-[21.69px] w-[36.62px] h-[36.62px] bg-[#FF0000]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
