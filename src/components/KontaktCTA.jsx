import { Link } from "react-router";

const KontaktCTA = ({ naslov, opis }) => {
  return (
    <section className="section poziv-kontakt">
      <div className="poziv-tekst">
        <p className="oznaka">Dogovorite sljedeći korak</p>
        <h2>{naslov}</h2>
        <p>{opis}</p>
      </div>
      <div className="poziv-box">
        <p>Pošaljite pitanje ili dogovorite pregled vozila.</p>
        <Link className="gumb" to="/kontakt">
          Javite nam se
        </Link>
      </div>
    </section>
  );
};

export default KontaktCTA;
