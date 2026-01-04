import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import NewCorporateHero from "../component/componentGeneral/NewCorporateHero.jsx";
import ChosenBy from "../component/componentGeneral/ChosenBy.jsx";
import ComparePackage from "../component/componentGeneral/ComparePackage.jsx";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";
import QuotaSection from "../component/componentGeneral/QuotaSection.jsx";
import EcoImpactSections from "../component/componentGeneral/EcoImpactSections.jsx";
import WhyChooseUs from "../component/componentGeneral/WhyChooseUs.jsx";
import PaperVsNfc from "../component/componentGeneral/PaperVsNFC.jsx";

const CorporatePage = () => {
  return (
    <Layout>
      <PaperVsNfc />
      <WhyChooseUs />
      <NewCorporateHero />
      <ChosenBy />
      <ComparePackage />
      <AddressGrid />
      <QuotaSection />
      <EcoImpactSections />
    </Layout>
  );
};

export default CorporatePage;
