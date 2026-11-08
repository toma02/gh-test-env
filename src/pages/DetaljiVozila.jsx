import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "./NotFound";
import GalerijaVozila from "../components/GalerijaVozila";
import KalkulatorRata from "../components/KalkulatorRata";
import KomentarVozila from "../components/KomentarVozila";
import { apiRequest } from "../api";

const DetaljiVozila = () => {
  const { id } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [ucitavanje, setUcitavanje] = useState(true);

  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        setVozilo(await apiRequest(`products/${id}`));
      } catch {
        // Bez dohvaćenog auta stranica prikazuje NotFound.
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiPodatke();
  }, [id]);

  if (ucitavanje)
    return (
      <section className="section">
        <p>Učitavanje auta...</p>
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
      <GalerijaVozila vozilo={vozilo} />
      <KalkulatorRata cijena={vozilo.price} />
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
