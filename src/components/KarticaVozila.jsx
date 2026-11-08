import { Link } from "react-router";
import { Button } from "./Button";
import { najviseUsporedbe } from "../konstante";

const KarticaVozila = ({ vozilo, usporedba, onUsporedi }) => {
  const uUsporedbi = usporedba.some((odabrano) => odabrano.id === vozilo.id);

  return (
    <div
      className={
        uUsporedbi
          ? "kartica kartica-usluga u-usporedbi"
          : "kartica kartica-usluga"
      }
    >
      <img
        className="kartica-slika"
        src={vozilo.thumbnail}
        alt={vozilo.title}
      />
      <div className="kartica-sadrzaj">
        <p className="oznaka">{vozilo.brand}</p>
        <h3>{vozilo.title}</h3>
        <p>Ocjena kupaca: {vozilo.rating} / 5</p>
        <p className="cijena-kartice">
          {vozilo.price.toLocaleString("hr-HR")} €
        </p>
        <div className="actions">
          <Link className="gumb" to={`/vozila/${vozilo.id}`}>
            Detalji
          </Link>
          {/* Odabrani auto ima tamni gumb za uklanjanje, a ostali svijetli gumb za dodavanje. */}
          <Button
            className={uUsporedbi ? "gumb gumb-ukloni" : "gumb gumb-povratak"}
            disabled={usporedba.length === najviseUsporedbe && !uUsporedbi}
            onClick={() => onUsporedi(vozilo)}
          >
            {uUsporedbi ? "Uklonite iz usporedbe" : "Dodajte u usporedbu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KarticaVozila;
