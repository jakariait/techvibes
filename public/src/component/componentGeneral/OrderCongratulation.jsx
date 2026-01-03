import React from "react";

import imgChatGptImageDec192025064142PmRemovebgPreview1 from "../../assets/imgChatGptImageDec192025064142PmRemovebgPreview1.png";
import imgPngPngtreeRemovebgPreview1 from "../../assets/imgPngPngtreeRemovebgPreview1.png";
import imgMaterialSymbolsOrderApprove from "../../assets/imgMaterialSymbolsOrderApprove.svg";
import imgCryptocurrencyUsd from "../../assets/imgCryptocurrencyUsd.svg";
import imgIconamoonDeliveryFastFill from "../../assets/imgIconamoonDeliveryFastFill.svg";
import imgFluentNextFrame24Filled from "../../assets//imgFluentNextFrame24Filled.svg";

const OrderCongratulation = () => {
  return (
    <div className="flex flex-col pb-40 gap-8 items-center w-full p-4 overflow-x-hidden">
      {/* Image and congratulations text section */}
      <div className="relative w-full max-w-179.5 aspect-718/755">
        {/* Bottom decoration image */}
        <div className="absolute h-[31%] left-1/2 top-[49.5%] -translate-x-1/2 w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[577.36%] left-[-12.31%] max-w-none top-[-148.11%] w-[125.54%]"
              src={imgChatGptImageDec192025064142PmRemovebgPreview1}
            />
          </div>
        </div>
        {/* Top celebration image */}
        <div className="absolute h-[70.7%] left-1/2 top-0 -translate-x-1/2 w-[95.3%]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[127.89%] left-0 max-w-none top-0 w-full"
              src={imgPngPngtreeRemovebgPreview1}
            />
          </div>
        </div>
        {/* Congratulations Text */}
        <div className="absolute flex flex-col gap-5 items-center text-center left-1/2 top-[83%] -translate-x-1/2 w-[92.2%]">
          <p
            className="bg-clip-text bg-linear-to-r from-[#4e52fb] to-[#20acf7] text-4xl sm:text-5xl md:text-6xl w-full"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Congratulations!
          </p>
          <p className="text-[#f2ecec] text-lg sm:text-xl md:text-2xl w-full">
            Your NFC Card is on the way!
          </p>
        </div>
      </div>

      {/* Contact info section */}
      <p className="text-[#f2f8ff] text-lg sm:text-xl md:text-2xl text-center max-w-2xl">
        {`Our designer will contact you through WhatsApp `}
        <br />
        Or Send Text us - 01906906000
      </p>

      {/* Order details section */}
      <div className="flex flex-col gap-8 items-start w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-lg bg-[rgba(0,0,0,0.1)] ">
        <div className="flex flex-col gap-4 w-full">
          {/* Order Number */}
          <div className="bg-[rgba(24,20,44,0.2)] border border-[#d8d8eb] border-solid flex items-center gap-3 p-3 rounded-lg w-full">
            <img
              alt="Order"
              className="shrink-0 size-10"
              src={imgMaterialSymbolsOrderApprove}
            />
            <p className="text-[#d8d8eb] text-base sm:text-lg">
              Order Number: #123455
            </p>
          </div>
          {/* Total Amount */}
          <div className="bg-[rgba(24,20,44,0.2)] border border-[#d8d8eb] border-solid flex items-center gap-3 p-3 rounded-lg w-full">
            <img
              alt="Amount"
              className="shrink-0 size-10"
              src={imgCryptocurrencyUsd}
            />
            <p className=" text-[#d8d8eb] text-base sm:text-lg">
              Total Amount: 200
            </p>
          </div>
          {/* Estimated Delivery */}
          <div className="bg-[rgba(24,20,44,0.2)] border border-[#d8d8eb] border-solid flex items-center gap-3 p-3 rounded-lg w-full">
            <img
              alt="Delivery"
              className="shrink-0 size-10"
              src={imgIconamoonDeliveryFastFill}
            />
            <p className=" text-[#d8d8eb] text-base sm:text-lg">
              Estimated Delivery: 3-5 Business Days
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <img
            alt="Track"
            className="shrink-0 size-8"
            src={imgFluentNextFrame24Filled}
          />
          <p className="text-[#d8d8eb] text-sm">
            Track your order through the email confirmation sent to you.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center w-full pt-4">
          <button className="bg-linear-to-b from-[#b0eaf5] to-[#5516ee] border-b-2 border-[#9c43ca] rounded-md shadow-[2px_2px_21.1px_0px_#6b519d] w-full max-w-md py-2.5 px-4">
            <p className=" text-[#ebecff] text-base text-center">
              Back to Home
            </p>
          </button>
          <p className=" text-[#d8d8eb] text-xs text-center w-full">
            Get started by creating your digital profile now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCongratulation;
