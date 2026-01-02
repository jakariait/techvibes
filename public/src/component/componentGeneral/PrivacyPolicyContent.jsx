import React from "react";

const PrivacyPolicyContent = () => {
  return (
    <div className={"p-4 text-[#FFF5F5]"}>
      <div className={" flex flex-col items-center justify-center pb-6 gap-2"}>
        <h1 className={"text-[16px]"}>Privacy Policy – TechVibes</h1>
        <span className={"text-[12px]"}>Last Updated: [Add Date]</span>
        <p className={"text-[10px]"}>
          At TechVibes, your privacy is important to us. This Privacy Policy
          explains how we collect, use, protect, and share your information when
          you use our NFC-based digital services and website.
        </p>
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>1. Information We Collect</span>
            <span>We may collect the following types of information:</span>
          </div>

          <ul className={" pt-2 pl-6"}>
            <li className={"list-disc"}>
              <span>Personal Information:</span>
              <p className={"pl-2"}>
                Name, email address, phone number, company name, job title, and
                profile details you choose to share through NFC cards or our
                platform.
              </p>
            </li>
            <li className={"list-disc"}>
              <span>Usage Information:</span>
              <p className={"pl-2"}>
                Device type, browser, IP address, pages visited, and interaction
                data to improve our services.
              </p>
            </li>
            <li className={"list-disc"}>
              <span>NFC Interaction Data:</span>
              <p className={"pl-2"}>
                Information shared when someone taps your NFC card or scans your
                QR code.
              </p>
            </li>
          </ul>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>2. Data Sharing & Disclosure</span>
            <span>
              We do not sell or rent your personal information.
              <br /> We may share data only when:
            </span>
          </div>

          <ul className={" pt-2 pl-6"}>
            <li className={"list-disc"}>
              <span>Required by law or legal process</span>
            </li>
            <li className={"list-disc"}>
              <span>
                Necessary to protect TechVibes, users, or public safety
              </span>
            </li>
            <li className={"list-disc"}>
              <span>
                Working with trusted service providers under confidentiality
                agreements
              </span>
            </li>
          </ul>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>3. Data Security</span>
            <span>
              We implement industry-standard security measures to protect your
              information. However, no digital platform can guarantee 100%
              security.
            </span>
          </div>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>4. Your Rights</span>
            <span>You have the right to:</span>
          </div>

          <ul className={" pt-2 pl-6"}>
            <li className={"list-disc"}>
              <span>Access, update, or delete your personal data</span>
            </li>
            <li className={"list-disc"}>
              <span>Control what information is shared via NFC</span>
            </li>
            <li className={"list-disc"}>
              <span>
                Request data removal or account deactivation <br /> To exercise
                these rights, contact us at: 📧 [your-email@techvibes.com]
              </span>
            </li>
          </ul>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>5. Cookies & Tracking</span>
            <span>
              TechVibes may use cookies and similar technologies to enhance
              functionality and analyze website traffic. You can manage cookie
              settings through your browser.
            </span>
          </div>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>6. Changes to This Policy</span>
            <span>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date.
            </span>
          </div>
        </div>

        <div className={"flex flex-col text-[16px]"}>
          <div className={"flex flex-col gap-2"}>
            <span>7. Contact Us</span>
            <span>
              If you have any questions about this Privacy Policy, please
              contact us:
              <br /> TechVibes 📧 Email: [your-email@techvibes.com] <br />
               🌐 Website: www.techvibes.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
