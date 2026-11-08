import { Button } from "./Button";

const KarticaMotocikla = ({ motocikl }) => {
  return (
    <div className="kartica-motocikla">
      <div className="motocikl-foto">
        <span className="motocikl-oznaka">Uskoro</span>
        <img src={motocikl.thumbnail} alt={motocikl.title} />
      </div>
      <div className="motocikl-sadrzaj">
        <p className="motocikl-marka">{motocikl.brand}</p>
        <h3>{motocikl.title}</h3>
        <p>Očekivana cijena</p>
        <p className="motocikl-cijena">
          {motocikl.price.toLocaleString("hr-HR")} €
        </p>
        {/* Gumb je onemogućen dok motocikli ne uđu u ponudu. */}
        <Button className="gumb gumb-povratak" disabled>
          Uskoro dostupno
        </Button>
      </div>
    </div>
  );
};

export default KarticaMotocikla;
