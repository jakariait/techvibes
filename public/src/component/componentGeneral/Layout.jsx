import Menu from "./Menu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import TechVibesFooter from "./TechVibesFooter.jsx";
import backgroundImages from "../../assets/background.jpg";

const Layout = ({ children }) => {
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
        <div className="flex flex-col min-h-screen ">
          <Menu />

          {/* Main Content */}
          <main className="grow">{children}</main>

          <FooterMenu />
          <TechVibesFooter />
        </div>
      </div>
    </div>
  );
};

export default Layout;
