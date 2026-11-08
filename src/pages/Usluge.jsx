import KontaktCTA from "../components/KontaktCTA";
import Kartica from "../components/Kartica";
import { usluge } from "../konstante";

const Usluge = () => {
  return (
    <>
      <section className="section">
        <h2>Ponuda usluga</h2>
        <p>Cijene su okvirne i ovise o vozilu te potrebnim dijelovima.</p>
        <div className="kartice">
          {usluge.map((usluga) => (
            <Kartica
              key={usluga.id}
              stavka={usluga}
              varijanta="usluga"
              putanja={`/usluge/${usluga.id}`}
            />
          ))}
        </div>
      </section>
      <KontaktCTA
        naslov="Niste sigurni odakle početi?"
        opis="Javite nam što ste primijetili i pripremit ćemo prijedlog sljedećeg koraka."
      />
    </>
  );
};

export default Usluge;
