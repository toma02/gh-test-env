import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const PotvrdaLayout = () => {
  return (
    <>
      <Header />
      <main id="glavni-sadrzaj" className="potvrda-raspored">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PotvrdaLayout;
