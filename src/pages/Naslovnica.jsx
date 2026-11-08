import { useEffect, useState } from "react";
import KontaktCTA from "../components/KontaktCTA";
import { Link } from "react-router";
import { Button } from "../components/Button";
import Kartica from "../components/Kartica";
import KarticaMotocikla from "../components/KarticaMotocikla";
import { kategorije } from "../konstante";
import { apiRequest } from "../api";

const Naslovnica = () => {
  const [motocikli, setMotocikli] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);

  // Motocikli se dohvaćaju isto kao auti na stranici Vozila.
  // limit=4 traži od API-ja samo četiri motocikla.
  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        const podatci = await apiRequest(
          "products/category/motorcycle?limit=4",
        );
        setMotocikli(podatci.products);
      } catch {
        setGreska("Dohvat motocikala nije uspio.");
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

  return (
    <>
      <section className="section">
        <h2>Pouzdan oslonac za vaše vozilo</h2>
        <p>
          Od redovitog održavanja do provjere kvarova. Pošaljite upit i
          dogovorite termin.
        </p>
        <div className="kartice">
          {kategorije.map((kategorija) => (
            <Kartica key={kategorija.naslov} stavka={kategorija} />
          ))}
        </div>
        <div className="actions">
          <Link className="gumb" to="/kontakt">
            Pošaljite upit
          </Link>
          <Link className="gumb" to="/usluge">
            Pogledajte usluge
          </Link>
        </div>
      </section>
      <section className="section">
        <p className="oznaka">Uskoro u ponudi</p>
        <h2>Motocikli</h2>
        <p>
          Uz aute uskoro nudimo i motocikle. Ovo su prvi modeli koje pripremamo.
        </p>
        {ucitavanje && <p>Učitavanje motocikala...</p>}
        {greska && (
          <>
            <p className="greska">{greska}</p>
            <Button onClick={ponoviDohvat}>Pokušajte ponovno</Button>
          </>
        )}
        <div className="kartice">
          {/* Četiri motocikla prikazuju se po dva u redu. */}
          {motocikli.map((motocikl) => (
            <KarticaMotocikla key={motocikl.id} motocikl={motocikl} />
          ))}
        </div>
      </section>
      <KontaktCTA
        naslov="Niste sigurni odakle početi?"
        opis="Pošaljite kratak opis i dogovorimo koji pregled ima smisla za vaše vozilo."
      />
    </>
  );
};

export default Naslovnica;
