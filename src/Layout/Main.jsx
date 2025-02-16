import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavNext from "../component/Shared/Navbar/NavNext";
import Footer from "../component/Shared/Footer/Footer";
// import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      <div>
        <Toaster />
      </div>
      {noHeaderFooter || <NavNext />}
      {/* {noHeaderFooter || <Navbar></Navbar>} */}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
