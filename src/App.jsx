import Admin from "./pages/Admin.jsx";
import NotFoundLayout from "./layouts/NotFoundLayout";
import Potvrda from "./pages/Potvrda.jsx";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout.jsx";
import PotvrdaLayout from "./layouts/PotvrdaLayout.jsx";
import Naslovnica from "./pages/Naslovnica.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Usluge from "./pages/Usluge.jsx";
import DetaljiUsluge from "./pages/DetaljiUsluge.jsx";
import Vozila from "./pages/Vozila.jsx";
import DetaljiVozila from "./pages/DetaljiVozila.jsx";
import NotFound from "./pages/NotFound";
import ONama from "./pages/ONama.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Naslovnica />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/usluge" element={<Usluge />} />
        <Route path="/usluge/:id" element={<DetaljiUsluge />} />
        <Route path="/vozila" element={<Vozila />} />
        <Route path="/vozila/:id" element={<DetaljiVozila />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/o-nama" element={<ONama />} />
      </Route>
      <Route element={<PotvrdaLayout />}>
        <Route path="/potvrda" element={<Potvrda />} />
        <Route path="/novosti/potvrda" element={<Potvrda />} />
      </Route>
      <Route element={<NotFoundLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
