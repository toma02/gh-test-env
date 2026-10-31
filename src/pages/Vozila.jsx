import { useEffect, useState } from "react";
import KarticaVozila from "../components/KarticaVozila";
import { zahtjev } from "../api";

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    async function dohvati() {
      try {
        const podatci = await zahtjev("products/category/vehicle");
        setVozila(podatci.products);
      } catch {
        setGreska("Dohvat auta nije uspio. Osvježite stranicu.");
      } finally {
        setUcitavanje(false);
      }
    }
    dohvati();
  }, []);

  return (
    <section className="section">
      <h2>Auti na prodaju</h2>
      <p>Svaki auto prolazi pregled u našoj radionici prije prodaje.</p>
      {ucitavanje && <p role="status">Učitavanje auta...</p>}
      {greska && (
        <p className="greska" role="alert">
          {greska}
        </p>
      )}
      {!ucitavanje && !greska && vozila.length === 0 && (
        <p>Trenutačno nema auta na prodaju.</p>
      )}
      <div className="kartice kartice-vozila">
        {vozila.map((vozilo) => (
          <KarticaVozila key={vozilo.id} vozilo={vozilo} />
        ))}
      </div>
    </section>
  );
};

export default Vozila;
