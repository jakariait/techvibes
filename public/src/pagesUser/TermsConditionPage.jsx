import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";
import TermsConditionContent from "../component/componentGeneral/TermsConditionContent.jsx";
import imgProperty1Default from "../assets/eclipse.png";
import GlobeEllipse from "../component/GlobeEllipse.jsx";

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

const TermsConditionPage = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <TermsConditionContent />

        <div className={"pt-20"}>
          <GlobeEllipse className="absolute left-0" />
          <AddressGrid isBackground={false} />
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditionPage;
