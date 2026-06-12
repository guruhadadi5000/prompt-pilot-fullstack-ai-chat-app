import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { useState } from "react";
import { assets } from "./assets/assets";
import Loading from "./pages/Loading";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading") {
    return <Loading />;
  }

  return (
    <>
      {!isMenuOpen && (
        <img
          onClick={() => setIsMenuOpen(true)}
          src={assets.menu_icon}
          alt="menu"
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
        />
      )}
      <div className="dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
