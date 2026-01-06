import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import CreateProfileForm from "../component/componentGeneral/CreateProfileForm.jsx";
import imgProperty1Default from "../assets/eclipse.png";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";


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


const CreateProfilePage = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <CreateProfileForm />
        <Ellipse className="absolute  left-0 size-[1440px] globe-bg" />
        <div className={"pt-20"}>
          <AddressGrid isBackground={false} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateProfilePage;
