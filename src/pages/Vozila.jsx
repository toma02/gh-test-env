import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import FilterVozila from "../components/FilterVozila";
import KarticaVozila from "../components/KarticaVozila";
import UsporedbaVozila from "../components/UsporedbaVozila";
import { apiRequest } from "../api";
import { najviseUsporedbe } from "../konstante";

const pocetniFilteri = {
  pojamPretrage: "",
  odabranaMarka: "Sve",
  cijenaOd: "",
  cijenaDo: "",
  najmanjaOcjena: "0",
  redoslijed: "zadano",
};

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);
  const [filteri, setFilteri] = useState(pocetniFilteri);
  const [usporedba, setUsporedba] = useState([]);

  // Marka ostaje u popisu samo kad joj je ovo prvo pojavljivanje.
  const sveMarke = vozila.map((vozilo) => vozilo.brand);
  const marke = [
    "Sve",
    ...sveMarke.filter((marka, indeks) => sveMarke.indexOf(marka) === indeks),
  ];

  // Najbolja ocjena i najniža cijena traže se među svim autima, a ne samo među filtriranima.
  // reduce prolazi kroz aute i zadržava boljeg od dva uspoređena auta.
  const najboljeOcijenjeno = vozila.reduce(
    (najbolje, vozilo) => (vozilo.rating > najbolje.rating ? vozilo : najbolje),
    vozila[0],
  );
  const najjeftinije = vozila.reduce(
    (najjeftinije, vozilo) =>
      vozilo.price < najjeftinije.price ? vozilo : najjeftinije,
    vozila[0],
  );

  const pojam = filteri.pojamPretrage.trim().toLowerCase();
  const rezultati = vozila.filter(
    (vozilo) =>
      `${vozilo.brand} ${vozilo.title}`.toLowerCase().includes(pojam) &&
      (filteri.odabranaMarka === "Sve" ||
        vozilo.brand === filteri.odabranaMarka) &&
      vozilo.price >= Number(filteri.cijenaOd) &&
      (filteri.cijenaDo === "" || vozilo.price <= Number(filteri.cijenaDo)) &&
      vozilo.rating >= Number(filteri.najmanjaOcjena),
  );

  if (filteri.redoslijed === "najjeftiniji") {
    rezultati.sort((prvo, drugo) => prvo.price - drugo.price);
  }
  if (filteri.redoslijed === "najskuplji") {
    rezultati.sort((prvo, drugo) => drugo.price - prvo.price);
  }
  if (filteri.redoslijed === "najboljaOcjena") {
    rezultati.sort((prvo, drugo) => drugo.rating - prvo.rating);
  }

  // Promjena broja pokušaja ponovno pokreće useEffect i poziva API.
  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        const podatci = await apiRequest("products/category/vehicle");
        setVozila(podatci.products);
      } catch {
        setGreska("Dohvat auta nije uspio.");
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiPodatke();
  }, [brojPokusaja]);

  function ponoviDohvat() {
    setUcitavanje(true);
    setGreska("");
    setBrojPokusaja(brojPokusaja + 1);
  }

  function promijeniFilter(event) {
    setFilteri({ ...filteri, [event.target.name]: event.target.value });
  }

  // Isti gumb dodaje auto u usporedbu ili ga iz nje uklanja.
  function promijeniUsporedbu(vozilo) {
    if (usporedba.some((odabrano) => odabrano.id === vozilo.id)) {
      setUsporedba(usporedba.filter((odabrano) => odabrano.id !== vozilo.id));
    } else {
      setUsporedba([...usporedba, vozilo]);
    }
  }

  return (
    <>
      {/* Izdvojeni auti prikazuju se u zasebnoj sekciji tek kad su auti dohvaćeni. */}
      {vozila.length > 0 && (
        <section className="section">
          <h2>Izdvojeno iz ponude</h2>
          <p>Auto s najboljom ocjenom kupaca i najjeftiniji auto u ponudi.</p>
          <div className="kartice kartice-vozila">
            <KarticaVozila
              vozilo={najboljeOcijenjeno}
              usporedba={usporedba}
              onUsporedi={promijeniUsporedbu}
            />
            <KarticaVozila
              vozilo={najjeftinije}
              usporedba={usporedba}
              onUsporedi={promijeniUsporedbu}
            />
          </div>
        </section>
      )}
      <section className="section">
        <h2>Auti na prodaju</h2>
        <p>Svaki auto prolazi pregled u našoj radionici prije prodaje.</p>
        {ucitavanje && <p>Učitavanje auta...</p>}
        {greska && (
          <>
            <p className="greska">{greska}</p>
            <Button onClick={ponoviDohvat}>Pokušajte ponovno</Button>
          </>
        )}
        <FilterVozila
          filteri={filteri}
          marke={marke}
          onPromijeni={promijeniFilter}
          onPonisti={() => setFilteri(pocetniFilteri)}
        />
        {!ucitavanje && !greska && (
          <p>
            {rezultati.length > 0
              ? `Pronađeno auta: ${rezultati.length}`
              : "Nema auta za odabrane filtre."}
          </p>
        )}
        {usporedba.length > 0 && (
          <p>
            Odabrano za usporedbu: {usporedba.length} od {najviseUsporedbe}.{" "}
            {/* Poveznica na id sekcije pomiče stranicu do usporedbe ispod auta. */}
            <a href="#usporedba">Otvorite usporedbu</a>
          </p>
        )}
        {usporedba.length === najviseUsporedbe && (
          <p>Usporedba je puna. Uklonite auto da biste dodali drugi.</p>
        )}
        <div className="kartice kartice-vozila">
          {rezultati.map((vozilo) => (
            <KarticaVozila
              key={vozilo.id}
              vozilo={vozilo}
              usporedba={usporedba}
              onUsporedi={promijeniUsporedbu}
            />
          ))}
        </div>
      </section>
      {usporedba.length > 0 && (
        <UsporedbaVozila
          usporedba={usporedba}
          onUkloni={promijeniUsporedbu}
          onOcisti={() => setUsporedba([])}
        />
      )}
    </>
  );
};

export default Vozila;
