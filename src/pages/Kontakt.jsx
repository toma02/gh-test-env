import KontaktForma from "../components/KontaktForma";
import PretplataForma from "../components/PretplataForma";

const Kontakt = () => {
  return (
    <section className="section">
      <h2>Kontakt i novosti</h2>
      <p>Opišite problem na vozilu ili se prijavite za novosti.</p>
      <div className="forme">
        <KontaktForma />
        <PretplataForma />
      </div>
    </section>
  );
};

export default Kontakt;
