import { Link } from "react-router";
import CijenaVozila from "./CijenaVozila";
import OcjenaVozila from "./OcjenaVozila";

const KarticaVozila = ({ vozilo }) => {
  return (
    <div className="kartica kartica-usluga">
      <img
        className="kartica-slika"
        src={vozilo.thumbnail}
        alt={`${vozilo.brand} ${vozilo.title}`}
      />
      <div className="kartica-sadrzaj">
        <p className="oznaka-stranice">{vozilo.brand}</p>
        <h3>{vozilo.title}</h3>
        <OcjenaVozila vozilo={vozilo} />
        <CijenaVozila vozilo={vozilo} />
        <Link className="gumb" to={`/vozila/${vozilo.id}`}>
          Detalji
        </Link>
      </div>
    </div>
  );
};

export default KarticaVozila;
