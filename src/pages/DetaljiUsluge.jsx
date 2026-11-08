import { useParams, Link } from "react-router";
import { usluge } from "../konstante";
import NotFound from "./NotFound";
import RezervacijaTermina from "../components/RezervacijaTermina";

const DetaljiUsluge = () => {
  const { id } = useParams();
  const usluga = usluge.find((stavka) => stavka.id === Number(id));

  if (!usluga)
    return (
      <NotFound
        naslov="Usluga nije pronađena"
        povratak="/usluge"
        tekstPovratka="Natrag na usluge"
      />
    );

  return (
    <>
      <section className="section detalji-usluge">
        <div className="detalji-slika">
          <img
            className="slika-usluge"
            src={usluga.slika}
            alt={usluga.opisSlike}
          />
        </div>
        <div className="detalji-sadrzaj">
          <p className="oznaka">{usluga.trajanje}</p>
          <h2>{usluga.naslov}</h2>
          <h3>Što obuhvaća usluga?</h3>
          <p>{usluga.opis}</p>
          <p className="cijena-usluge">{usluga.cijena} €</p>
          <p>
            Cijena je okvirna. Točan iznos ovisi o vozilu i potrebnim
            dijelovima, a dogovaramo ga prije početka radova.
          </p>
          <div className="actions">
            <Link className="gumb" to="/kontakt">
              Pošaljite upit
            </Link>
            <Link className="gumb gumb-povratak" to="/usluge">
              Natrag na usluge
            </Link>
          </div>
        </div>
      </section>
      <RezervacijaTermina usluga={usluga} />
    </>
  );
};

export default DetaljiUsluge;
