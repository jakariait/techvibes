import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import EcoImpactSections from "../component/componentGeneral/EcoImpactSections.jsx";
import WhyChooseUs from "../component/componentGeneral/WhyChooseUs.jsx";
import PaperVsNfc from "../component/componentGeneral/PaperVsNFC.jsx";
import AtAGlance from "../component/componentGeneral/AtAGlance.jsx";
import DigitalProfileDemo from "../component/componentGeneral/DigitalProfileDemo.jsx";
import HowWorks from "../component/componentGeneral/HowWorks.jsx";
import PricingCard from "../component/componentGeneral/PricingCard.jsx";
import TestingCode from "../component/TestingCode.jsx";

const FinalDesignPage = () => {
  return (
    <Layout>
      <div className="w-full max-w-[781px] mx-auto p-4">
        <TestingCode />
      </div>
      <AtAGlance />
      <DigitalProfileDemo />
      <WhyChooseUs />
      <PaperVsNfc />
      <PricingCard />
      <HowWorks />
      <EcoImpactSections />
    </Layout>
  );
};

export default FinalDesignPage;
