import Zvjezdice from "./Zvjezdice";

const KomentarVozila = ({ recenzija }) => {
  return (
    <li className="komentar">
      <span className="komentar-avatar" aria-hidden="true">
        {recenzija.reviewerName[0]}
      </span>
      <div>
        <p className="komentar-autor">
          <strong>{recenzija.reviewerName}</strong>
          <span className="komentar-datum">
            {new Date(recenzija.date).toLocaleDateString("hr-HR")}
          </span>
        </p>
        <p
          className="komentar-ocjena"
          aria-label={`Ocjena ${recenzija.rating} od 5`}
        >
          <Zvjezdice ocjena={recenzija.rating} />
        </p>
        <p className="komentar-tekst">{recenzija.comment}</p>
      </div>
    </li>
  );
};

export default KomentarVozila;
