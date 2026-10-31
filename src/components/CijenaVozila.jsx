import { cijenaSPopustom } from "../api";

const CijenaVozila = ({ vozilo }) => {
  return (
    <div className="cijena-vozila">
      <s className="puna-cijena">
        {Math.round(vozilo.price).toLocaleString("hr-HR")} €
      </s>
      <div className="nova-cijena">
        <strong>{cijenaSPopustom(vozilo).toLocaleString("hr-HR")} €</strong>
        <span className="popust-vozila">
          -{Math.round(vozilo.discountPercentage)} %
        </span>
      </div>
    </div>
  );
};

export default CijenaVozila;
