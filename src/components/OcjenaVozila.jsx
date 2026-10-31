import Zvjezdice from "./Zvjezdice";

const OcjenaVozila = ({ vozilo }) => {
  return (
    <p className="ocjena-vozila">
      <Zvjezdice ocjena={vozilo.rating} /> {vozilo.rating} / 5 (recenzije:{" "}
      {vozilo.reviews.length})
    </p>
  );
};

export default OcjenaVozila;
