import Menu from "./component/componentGeneral/Menu.jsx";
import backgroundImage from "../src/assets/background.jpg";

function App() {
  return (
    <>
      <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
        <Menu />
      </div>
    </>
  );
}

export default App;
