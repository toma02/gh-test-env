import HeroSekcija from "../components/HeroSekcija";
import { Outlet } from "react-router";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <HeroSekcija />
      <main id="glavni-sadrzaj">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
