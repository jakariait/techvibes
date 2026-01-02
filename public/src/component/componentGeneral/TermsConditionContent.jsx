import React from "react";

const TermsConditionContent = () => {
  return (
    <div className={"p-4 text-[#FFF5F5]"}>
      <div className={"flex  flex-col gap-4"}>
        <h1 className={"text-[16px]"}>Terms & Conditions – TechVibes</h1>
        <span className={"text-[12px]"}>Last Updated: [Add Date]</span>
        <p className={"text-[10px]"}>
          Welcome to TechVibes. By accessing or using our website, NFC digital
          business cards, and related services, you agree to be bound by these
          Terms & Conditions. Please read them carefully.
        </p>
      </div>

      <div className={"pt-5"}>
        <ol className="list-decimal list-inside flex flex-col gap-4">
          <li>
            Acceptance of Terms <br />
            <span className={"text-[10px]"}>
              By using TechVibes services, you confirm that you have read,
              understood, and agreed to these Terms. If you do not agree, please
              do not use our services.
            </span>
          </li>

          <li>
            Services Overview <br />
            <span className={"text-[10px]"}>
              TechVibes provides NFC-based digital business card solutions and
              related digital tools that allow users to share professional
              information electronically
            </span>
          </li>

          <li>
            User Responsibilities <br />
            <span className={"text-[10px]"}>
              You agree to:
              <br /> Provide accurate and up-to-date information
              <br /> Use the platform only for lawful purposes
              <br /> Not misuse, hack, or attempt to disrupt our services <br />{" "}
              Respect the privacy and rights of other users
            </span>
          </li>

          <li>
            Account & Data <br />
            <span className={"text-[10px]"}>
              You are responsible for maintaining the confidentiality of your
              account
              <br /> You control what information is shared through your NFC
              card
              <br /> TechVibes is not responsible for information you
              voluntarily share with others
            </span>
          </li>

          <li>
            Intellectual Property <br />
            <span className={"text-[10px]"}>
              All content, branding, designs, logos, and technology used on
              TechVibes are the property of TechVibes.
              <br />
              You may not copy, reproduce, or distribute any content without
              written permission.
            </span>
          </li>

          <li>
            Payments & Subscriptions (If Applicable) <br />
            <span className={"text-[10px]"}>
              Paid plans are billed as described on the website
              <br />
              Fees are non-refundable unless stated otherwise
              <br />
              TechVibes reserves the right to modify pricing with prior notice
            </span>
          </li>

          <li>
            Contact Information <br />
            <span className={"text-[10px]"}>
              If you have any questions about these Terms & Conditions, contact
              us: <br />
              TechVibes
              <br />
              📧 Email: [your-email@techvibes.com]
              <br />
              🌐 Website: www.techvibes.com
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsConditionContent;
