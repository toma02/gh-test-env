import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import NotFound from "./NotFound";
import CijenaVozila from "../components/CijenaVozila";
import GalerijaVozila from "../components/GalerijaVozila";
import KomentarVozila from "../components/KomentarVozila";
import OcjenaVozila from "../components/OcjenaVozila";
import { zahtjev } from "../api";

const DetaljiVozila = () => {
  const { id } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [ucitavanje, setUcitavanje] = useState(true);

  useEffect(() => {
    async function dohvati() {
      try {
        setVozilo(await zahtjev(`products/${id}`));
      } catch {
        // Bez dohvaćenog auta stranica prikazuje NotFound.
      } finally {
        setUcitavanje(false);
      }
    }
    dohvati();
  }, [id]);

  if (ucitavanje)
    return (
      <section className="section">
        <p role="status">Učitavanje auta...</p>
      </section>
    );

  if (!vozilo)
    return (
      <NotFound
        naslov="Auto nije pronađen"
        povratak="/vozila"
        tekstPovratka="Natrag na aute"
      />
    );

  return (
    <>
      <section className="section detalji-usluge">
        <GalerijaVozila
          slike={vozilo.images}
          naziv={`${vozilo.brand} ${vozilo.title}`}
        />
        <div className="detalji-sadrzaj detalji-vozila">
          <p className="oznaka-stranice">{vozilo.brand}</p>
          <h2>{vozilo.title}</h2>
          <OcjenaVozila vozilo={vozilo} />
          <CijenaVozila vozilo={vozilo} />
          <Link className="gumb" to="/kontakt">
            Pošaljite upit
          </Link>
          <p>{vozilo.description}</p>
          <Link className="povratak-vozila" to="/vozila">
            Natrag na aute
          </Link>
        </div>
      </section>
      <section className="section">
        <h2>Recenzije kupaca</h2>
        <ul className="komentari">
          {vozilo.reviews.map((recenzija) => (
            <KomentarVozila
              key={recenzija.reviewerEmail}
              recenzija={recenzija}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default DetaljiVozila;
