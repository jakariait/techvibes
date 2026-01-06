import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";
import imgProperty1Default from "../assets/eclipse.png";
import PrivacyPolicyContent from "../component/componentGeneral/PrivacyPolicyContent.jsx";

function Ellipse({ className }) {
  return (
    <div data-node-id="1:2555" className={className}>
      <div className="absolute inset-[-4.19%]">
        <img
          className="block max-w-none size-full"
          alt=""
          height="1560.6"
          src={imgProperty1Default}
          width="1560.6"
        />
      </div>
    </div>
  );
}

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <PrivacyPolicyContent />

        <Ellipse className="absolute  left-0 size-[1440px] globe-bg" />

        <div className={"pt-20"}>
          <AddressGrid isBackground={false} />
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
