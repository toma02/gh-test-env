import { Link } from "react-router";
import slikaGreske from "../assets/pogresan-smjer.jpg";

const NotFound = ({
  naslov = "Stranica nije pronađena",
  povratak = "/",
  tekstPovratka = "Na naslovnicu",
}) => {
  return (
    <section className="section stranica-404">
      <div className="tekst-404">
        <p className="oznaka">Izgleda da smo skrenuli s puta</p>
        <h1>{naslov}</h1>
        <p>
          Ova adresa ne vodi do traženog sadržaja. Vratite se na poznatu
          stranicu i nastavite pregledavati naš autoservis.
        </p>
        <Link className="gumb" to={povratak}>
          {tekstPovratka}
        </Link>
      </div>
      <img
        className="slika-404"
        src={slikaGreske}
        alt="Prometni znak Wrong Way pod oblacima"
      />
    </section>
  );
};

export default NotFound;
