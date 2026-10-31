import { Link } from "react-router";

const PozivNaKontakt = ({ naslov, opis }) => {
  return (
    <section className="section poziv-kontakt">
      <div className="poziv-tekst">
        <p className="oznaka-stranice">Dogovorite sljedeći korak</p>
        <h2>{naslov}</h2>
        <p>{opis}</p>
      </div>
      <div className="poziv-radnja">
        <p>Pošaljite pitanje ili dogovorite pregled vozila.</p>
        <Link className="gumb" to="/kontakt">
          Javite nam se
        </Link>
      </div>
    </section>
  );
};

export default PozivNaKontakt;
