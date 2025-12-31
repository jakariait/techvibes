import Menu from "./component/componentGeneral/Menu.jsx";
import NewCorporateHero from "./component/componentGeneral/NewCorporateHero.jsx";
import ChosenBy from "./component/componentGeneral/ChosenBy.jsx";
import backgroundImages from "../src/assets/background.jpg";
import TestMCP from "./component/componentGeneral/TestMCP.jsx";
import ComparePackage from "./component/componentGeneral/ComparePackage.jsx";
import AddressGrid from "./component/componentGeneral/AddressGrid.jsx";
import QuotaSection from "./component/componentGeneral/QuotaSection.jsx";

function App() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#0c0d19] to-[#131832]">
      <div className="blur-[25px] filter absolute inset-0">
        <div className="absolute inset-0 opacity-[0.33] overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[281.45%] left-[-80.42%] max-w-none top-[-166.4%] w-[341.87%]"
            src={backgroundImages}
          />
        </div>
      </div>
      <div className={"xl:container xl:mx-auto relative z-10"}>
        <Menu />
        <NewCorporateHero />
        <ChosenBy />
        <ComparePackage />
        <AddressGrid />
        <QuotaSection />
        {/*<TestMCP />*/}
      </div>
    </div>
  );
}

export default App;
