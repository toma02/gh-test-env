import { useParams, Link, useNavigate } from "react-router";
import { usluge } from "../konstante";
import NotFound from "./NotFound";
import { Button } from "../components/Button";

const DetaljiUsluge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <section className="section detalji-usluge">
      <div className="detalji-fotografija">
        <img
          className="slika-usluge"
          src={usluga.slika}
          alt={usluga.opisSlike}
        />
      </div>
      <div className="detalji-sadrzaj">
        <p className="oznaka-stranice">{usluga.trajanje}</p>
        <h2>{usluga.naslov}</h2>
        <h3>Što obuhvaća usluga?</h3>
        <p>{usluga.opis}</p>
        <p className="cijena-usluge">{usluga.cijena} €</p>
        <p>
          Cijena je okvirna. Točan iznos ovisi o vozilu i potrebnim dijelovima,
          a dogovaramo ga prije početka radova.
        </p>
        <div className="actions">
          <Link className="gumb" to="/kontakt">
            Pošaljite upit
          </Link>
          <Button
            className="gumb gumb-povratak"
            onClick={() => navigate("/usluge")}
          >
            Natrag na usluge
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetaljiUsluge;
