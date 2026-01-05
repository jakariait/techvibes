import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";
import TermsConditionContent from "../component/componentGeneral/TermsConditionContent.jsx";
import imgProperty1Default from "../assets/eclipse.png";
import GlobeEllipse from "../component/GlobeEllipse.jsx";
import WorldGlobe from "../component/WorldGlobe.jsx";

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
      <WorldGlobe />
      <div className="relative overflow-hidden">
        <TermsConditionContent />

        <div className={"pt-20 relative w-full min-h-[500px] overflow-hidden"}>
          <GlobeEllipse className="absolute top-0 left-0 w-[200%] h-full z-[-1]" />
          <AddressGrid isBackground={false} />
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditionPage;
