import React from "react";
import imgRectangle5276 from "../../assets/PaperVsNFC/rectangle5276.png";
import imgRectangle5277 from "../../assets/PaperVsNFC/rectangle5277.png";
import imgMdiInformation from "../../assets/PaperVsNFC/mdiInformation.svg";
import imgMaterialSymbolsAdGroupOff from "../../assets/PaperVsNFC/materialSymbolsAdGroupOff.svg";
import imgSiCloseCircleFill from "../../assets/PaperVsNFC/siCloseCircleFill.svg";
import imgSiCheckCircleFill from "../../assets/PaperVsNFC/siCheckCircleFill.svg";
import imgMaterialSymbolsAddCircleRounded from "../../assets/PaperVsNFC/materialSymbolsAddCircleRounded.svg";
import imgGroup from "../../assets/PaperVsNFC/group.svg";
import imgStreamlineInvestmentSelectionRemix from "../../assets/PaperVsNFC/streamlineInvestmentSelectionRemix.svg";
import imgSiCheckCircleFill1 from "../../assets/PaperVsNFC/siCheckCircleFill1.svg";

const PaperVsNfc = () => {
  return (
    <div className={"pb-15"}>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          color: "#4E52FB",
          fontSize: 36,
          fontWeight: "400",
          wordWrap: "break-word",
        }}
        className={"py-10"}
      >
        Paper Business Card VS NFC Card
      </h1>

      <div className="bg-[#4b4c79] rounded-[12px] p-4 flex flex-col items-center gap-8 max-w-3xl mx-auto">
        <div className="flex md:flex-row flex-col gap-8">
          <div className="bg-[#2d2d5f] rounded-[12px] flex flex-col gap-4 flex-1">
            <p className=" text-[#d1d2f1] text-2xl py-2 text-center">
              Paper Business Card
            </p>
            <img
              alt=""
              className="rounded-[8px] h-[200px] w-full"
              src={imgRectangle5276}
            />
            <div className="flex flex-col gap-4 px-10 py-4">
              <div className="flex items-center gap-4">
                <img alt="" className="w-9 h-9" src={imgMdiInformation} />
                <div className="text-white">
                  <p className="text-sm">Information</p>
                  <p className="text-xs">Limited (Name, Phone, Email)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  className="w-9 h-9"
                  src={imgMaterialSymbolsAdGroupOff}
                />
                <div className="text-white">
                  <p className="text-sm">Reprint Need</p>
                  <p className="text-xs">Hand to Hand</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img alt="" className="w-9 h-9" src={imgSiCloseCircleFill} />
                <div className="text-white">
                  <p className="text-sm">Paper Waste</p>
                  <p className="text-xs">Easy to Dammage</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img alt="" className="w-9 h-9" src={imgSiCheckCircleFill} />
                <p className=" text-sm text-white">Passive</p>
              </div>
            </div>
          </div>
          <div className="bg-[#050b23] rounded-[12px]  flex flex-col gap-4 flex-1">
            <p className=" text-[#d1d2f1] text-2xl text-center py-2">
              NFC Card
            </p>
            <img
              alt=""
              className="rounded-[8px] h-[200px] w-full"
              src={imgRectangle5277}
            />
            <div className="flex flex-col gap-4 px-10 py-4">
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  className="w-9 h-9"
                  src={imgMaterialSymbolsAddCircleRounded}
                />
                <div className=" text-[#d1d2f1]">
                  <p className="text-sm">Information</p>
                  <p className="text-xs">UnLimited</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img alt="" className="w-9 h-9" src={imgGroup} />
                <div className="text-[#d1d2f1]">
                  <p className="text-sm">Update anytime digitally</p>
                  <p className="text-xs">Tap or Scan</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  alt=""
                  className="w-9 h-9"
                  src={imgStreamlineInvestmentSelectionRemix}
                />
                <p className=" text-sm text-[#d1d2f1]">One Time Investment</p>
              </div>
              <div className="flex items-center gap-4">
                <img alt="" className="w-9 h-9" src={imgSiCheckCircleFill1} />
                <p className="text-sm text-[#d1d2f1]">Resuable & paperless</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#271a42] rounded-[4px] p-4">
          <p className="text-[#d1d2f1] text-2xl text-center">
            Upgrade From paper to smart NFC business Card today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaperVsNfc;
