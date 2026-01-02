import React from "react";

const ReturnPolicyContent = () => {
  return (
    <div className={"text-[#FFF5F5] flex flex-col gap-6 p-4"}>
      <div className={"flex flex-col gap-6"}>
        <h1>Return & Refund Policy – TechVibes</h1>
        <ul className={"flex flex-col gap-2 text-[10px]"}>
          <li>
            Activated digital products or NFC services are non-refundable.
          </li>
          <li>
            Physical NFC cards can be returned only if they are damaged,
            defective, or incorrect.
          </li>
          <li>
            Return requests must be made within 7 days of delivery with proof.
          </li>
          <li>
            Customized or personalized products are not eligible for return.
          </li>
          <li>Approved refunds will be processed within 7–10 business days.</li>
          <li>Shipping charges are non-refundable.</li>
        </ul>
      </div>

      <div>
        <h1 className={"text-[16px]"}>
          For support, contact us at: [your-email@techvibes.com]
        </h1>
        <span className={"text-[12px]"}>Include:</span>

        <ul className={"text-[10px] pl-4 list-disc"}>
          <li>Order ID</li>
          <li>Reason for return</li>
          <li>Supporting images/videos</li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPolicyContent;
