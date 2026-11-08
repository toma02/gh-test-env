import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./Button";

const GalerijaVozila = ({ vozilo }) => {
  const [odabrana, setOdabrana] = useState(vozilo.images[0]);

  return (
    <section className="section detalji-usluge">
      <div className="galerija-vozila">
        <img className="galerija-slika" src={odabrana} alt={vozilo.title} />
        <div className="galerija-slike">
          {vozilo.images.map((slika, indeks) => (
            <Button
              key={slika}
              className={
                slika === odabrana ? "galerija-gumb odabrana" : "galerija-gumb"
              }
              onClick={() => setOdabrana(slika)}
            >
              <img src={slika} alt={`Prikažite fotografiju ${indeks + 1}`} />
            </Button>
          ))}
        </div>
      </div>
      <div className="detalji-sadrzaj">
        <p className="oznaka">{vozilo.brand}</p>
        <h2>{vozilo.title}</h2>
        <p>{vozilo.description}</p>
        <p>Ocjena kupaca: {vozilo.rating} / 5</p>
        <p className="cijena-usluge">
          {vozilo.price.toLocaleString("hr-HR")} €
        </p>
        <div className="actions">
          <Link
            className="gumb"
            to="/kontakt"
            state={{
              poruka: `Zanima me ${vozilo.brand} ${vozilo.title}. Je li auto još dostupan?`,
            }}
          >
            Pošaljite upit
          </Link>
          <Link className="gumb gumb-povratak" to="/vozila">
            Natrag na aute
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalerijaVozila;
