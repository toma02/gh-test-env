import { useEffect, useState } from "react";
import FilterVozila from "../components/FilterVozila";
import KarticaVozila from "../components/KarticaVozila";
import { cijenaSPopustom, zahtjev } from "../api";

const pocetniFilteri = {
  pojam: "",
  marka: "Sve",
  cijenaOd: "",
  cijenaDo: "",
  ocjena: "0",
  popust: "0",
  redoslijed: "zadano",
};

const poredak = {
  zadano: () => 0,
  najjeftiniji: (a, b) => cijenaSPopustom(a) - cijenaSPopustom(b),
  najskuplji: (a, b) => cijenaSPopustom(b) - cijenaSPopustom(a),
  najboljaOcjena: (a, b) => b.rating - a.rating,
};

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [filteri, setFilteri] = useState(pocetniFilteri);
  const pojam = filteri.pojam.trim().toLowerCase();
  const marke = ["Sve", ...new Set(vozila.map((vozilo) => vozilo.brand))];
  const rezultati = vozila
    .filter(
      (vozilo) =>
        `${vozilo.brand} ${vozilo.title}`.toLowerCase().includes(pojam) &&
        (filteri.marka === "Sve" || vozilo.brand === filteri.marka) &&
        (!filteri.cijenaOd || cijenaSPopustom(vozilo) >= filteri.cijenaOd) &&
        (!filteri.cijenaDo || cijenaSPopustom(vozilo) <= filteri.cijenaDo) &&
        vozilo.rating >= filteri.ocjena &&
        vozilo.discountPercentage >= filteri.popust,
    )
    .sort(poredak[filteri.redoslijed]);

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

  function promijeniFilter(event) {
    setFilteri({ ...filteri, [event.target.name]: event.target.value });
  }

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
      <FilterVozila
        filteri={filteri}
        marke={marke}
        onPromijeni={promijeniFilter}
        onPonisti={() => setFilteri(pocetniFilteri)}
      />
      {!ucitavanje && !greska && (
        <p role="status">Pronađeno auta: {rezultati.length}</p>
      )}
      {!ucitavanje && !greska && rezultati.length === 0 && (
        <p>Nema auta za odabrane filtre.</p>
      )}
      <div className="kartice kartice-vozila">
        {rezultati.map((vozilo) => (
          <KarticaVozila key={vozilo.id} vozilo={vozilo} />
        ))}
      </div>
    </section>
  );
};

export default Vozila;
