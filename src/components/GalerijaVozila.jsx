import { useState } from "react";
import { Button } from "./Button";

const GalerijaVozila = ({ slike, naziv }) => {
  const [odabrana, setOdabrana] = useState(slike[0]);

  return (
    <div className="galerija-vozila">
      <img className="galerija-slika" src={odabrana} alt={naziv} />
      <div className="galerija-slicice">
        {slike.map((slika, indeks) => (
          <Button
            key={slika}
            className="galerija-gumb"
            aria-label={`Prikažite fotografiju ${indeks + 1}`}
            aria-pressed={slika === odabrana}
            onClick={() => setOdabrana(slika)}
          >
            <img src={slika} alt="" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GalerijaVozila;
