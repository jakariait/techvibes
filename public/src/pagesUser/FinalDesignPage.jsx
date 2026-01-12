import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import EcoImpactSections from "../component/componentGeneral/EcoImpactSections.jsx";
import WhyChooseUs from "../component/componentGeneral/WhyChooseUs.jsx";
import PaperVsNfc from "../component/componentGeneral/PaperVsNFC.jsx";
import AtAGlance from "../component/componentGeneral/AtAGlance.jsx";
import DigitalProfileDemo from "../component/componentGeneral/DigitalProfileDemo.jsx";
import HowWorks from "../component/componentGeneral/HowWorks.jsx";
import PricingCard from "../component/componentGeneral/PricingCard.jsx";
import Feature from "../component/componentGeneral/Feature.jsx";
import AtAGlanceGraphic from "../component/componentGeneral/AtAGlanceGraphic.jsx";

const FinalDesignPage = () => {
  return (
    <Layout>
      <div className={"px-4 max-w-7xl mx-auto py-50"}>
        <AtAGlanceGraphic />
      </div>

      <Feature />
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
