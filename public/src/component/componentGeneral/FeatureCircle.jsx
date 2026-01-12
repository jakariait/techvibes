import React from "react";
import imgVector7 from "../../assets/feature/lucide_nfc.svg";
import imgVector1 from "../../assets/feature/lucide_nfc (1).svg";
import imgVector from "../../assets/feature/ic_round-phone-iphone.svg";
import imgEllipse203 from "../../assets/feature/imgEllipse203.svg";
import imgVector2 from "../../assets/feature/imgVector2.svg";
import imgVector3 from "../../assets/feature/imgVector3.svg";
import img from "../../assets/feature/img.svg";
import imgVector4 from "../../assets/feature/imgVector4.svg";
import imgVector5 from "../../assets/feature/imgVector5.svg";
import imgVector6 from "../../assets/feature/imgVector6.svg";
import imgVector8 from "../../assets/feature/imgVector8.svg";
import imgVector9 from "../../assets/feature/imgVector9.svg";
import imgVector10 from "../../assets/feature/imgVector10.svg";

const FeatureCircle = () => {
  return (
    <div
      className="w-full max-w-[781px] relative"
      style={{ paddingTop: "100%" }}
    >
      <div
        data-node-id="1:141"
        className="absolute top-0 left-0 w-full h-full "
      >
        {/* Outer Circle (Text) - Rotating Counter-Clockwise */}
        <div className="absolute inset-0 animate-spin-reverse-slow pointer-events-none">
          {/* Text Bubble 1 */}
          <div className="absolute inset-[89.76%_44.87%_0_44.87%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Support NFC Smartphone
            </p>
          </div>
          {/* Text Bubble 2 */}
          <div className="absolute inset-[0_44.87%_89.76%_44.87%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Adhesive 3M Sticker
            </p>
          </div>
          {/* Text Bubble 3 */}
          <div className="absolute inset-[44.94%_89.74%_44.81%_0] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Trigger SwitchBot
            </p>
          </div>
          {/* Text Bubble 4 */}
          <div className="absolute inset-[14.21%_12.31%_75.54%_77.44%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Easy To Used
            </p>
          </div>
          {/* Text Bubble 5 */}
          <div className="absolute inset-[75.67%_76.15%_14.08%_13.59%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              High quality Chip
            </p>
          </div>
          {/* Text Bubble 6 */}
          <div className="absolute inset-[14.21%_76.15%_75.54%_13.59%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Waterproof
            </p>
          </div>
          {/* Text Bubble 7 */}
          <div className="absolute inset-[75.67%_13.33%_14.08%_76.41%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Respo-nsive
            </p>
          </div>
          {/* Text Bubble 8 */}
          <div className="absolute inset-[44.94%_0_44.81%_89.74%] flex items-center justify-center bg-[#4e52fb] rounded-[12px] p-1">
            <p className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic text-white text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] text-center whitespace-pre-wrap animate-spin-slow">
              Support ios & Android
            </p>
          </div>
        </div>

        {/* CSS Circles */}
        {/* Outer Dashed Circle */}
        <div className="absolute inset-[5.25%_5.13%_5.12%_5.13%] animate-spin-slow">
          <div className="w-full h-full rounded-full border border-dashed border-indigo-500/50" />
        </div>
        {/* Inner Dashed Circle */}
        <div className="absolute inset-[24.46%_24.36%_24.33%_24.36%] animate-spin-reverse-slow">
          <div className="w-full h-full rounded-full border border-dashed border-indigo-500/50" />
        </div>

        {/* Inner Circle (Icons) - Rotating Clockwise */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          <div className="absolute inset-[36.75%_69.74%_56.85%_23.85%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector2} />
            </div>
          </div>
          <div className="absolute inset-[69.27%_57.31%_24.33%_36.28%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector3} />
            </div>
          </div>
          <div className="absolute inset-[57.49%_23.59%_36.11%_70%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={img} />
            </div>
          </div>
          <div className="absolute inset-[23.56%_57.31%_70.04%_36.28%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector4} />
            </div>
          </div>
          <div className="absolute inset-[23.56%_36.03%_70.04%_57.56%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector5} />
            </div>
          </div>
          <div className="absolute inset-[36.75%_23.59%_56.85%_70%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector6} />
            </div>
          </div>
          <div className="absolute inset-[57.49%_69.74%_36.11%_23.85%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-full h-full p-2" alt="" src={imgVector8} />
            </div>
          </div>
          <div className="absolute inset-[23.56%_57.31%_70.04%_36.28%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector9} />
            </div>
          </div>
          <div className="absolute inset-[69.27%_35.13%_24.33%_58.46%]">
            <img
              className="absolute w-full h-full animate-spin-reverse-slow"
              alt=""
              src={imgEllipse203}
            />
            <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slow">
              <img className="w-1/2 h-1/2" alt="" src={imgVector10} />
            </div>
          </div>
        </div>

        {/* Center Icons (Static) */}
        <div className="absolute aspect-square w-[25%] top-[37.5%] left-[37.5%]">
          <div className={"flex items-center justify-center gap-3"}>
            <img className="w-full h-full" alt="" src={imgVector1} />

            <img
              className="w-full h-full -ml-10 -mr-10"
              alt=""
              src={imgVector}
            />
            <img className="w-full h-full" alt="" src={imgVector7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCircle;
