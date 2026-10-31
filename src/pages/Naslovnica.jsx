import PozivNaKontakt from "../components/PozivNaKontakt";
import { Link } from "react-router";
import Kartica from "../components/Kartica";
import { kategorije } from "../konstante";

const Naslovnica = () => {
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
      <PozivNaKontakt
        naslov="Niste sigurni odakle početi?"
        opis="Pošaljite kratak opis i dogovorimo koji pregled ima smisla za vaše vozilo."
      />
    </>
  );
};

export default Naslovnica;
