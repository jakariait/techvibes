import React from 'react';
import Layout from "../component/componentGeneral/Layout.jsx";
import AboutUs from "../component/componentGeneral/AboutUs.jsx";
import Inception from "../component/componentGeneral/Inception.jsx";
import TheGoal from "../component/componentGeneral/TheGoal.jsx";

const AboutUsPage = () => {
  return (
    <Layout>
      <AboutUs/>
      <Inception />
      <TheGoal />
    </Layout>
  );
};

export default AboutUsPage;