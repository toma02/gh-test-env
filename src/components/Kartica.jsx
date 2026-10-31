import { Link } from "react-router";

const Kartica = ({ stavka, putanja, varijanta = "osnovna" }) => {
  return (
    <div className={`kartica kartica-${varijanta}`}>
      {stavka.slika && (
        <img
          className="kartica-slika"
          src={stavka.slika}
          alt={stavka.opisSlike}
        />
      )}
      <div className="kartica-sadrzaj">
        {stavka.trajanje && (
          <p className="oznaka-stranice">{stavka.trajanje}</p>
        )}
        {stavka.naslov && <h3>{stavka.naslov}</h3>}
        <p>{stavka.opis}</p>
        {stavka.cijena && (
          <p className="cijena-kartice">Okvirna cijena: {stavka.cijena} €</p>
        )}
        {putanja && (
          <Link className="gumb" to={putanja}>
            Detalji
          </Link>
        )}
      </div>
    </div>
  );
};

export default Kartica;
