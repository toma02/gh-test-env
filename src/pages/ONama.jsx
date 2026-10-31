import PozivNaKontakt from "../components/PozivNaKontakt";
import Kartica from "../components/Kartica";
import { nacinRada } from "../konstante";
import slikaServisa from "../assets/alat-radionice.jpg";
import slikaDijagnostike from "../assets/radionica-alat.jpg";

const ONama = () => {
  return (
    <>
      <section className="section o-nama-uvod">
        <p className="oznaka-stranice">Upoznajte Autoservis FE</p>
        <h2>Briga o vozilu počinje dobrim dogovorom</h2>
        <p>
          Pomažemo vam pri redovitom održavanju, provjeri kočnica i pronalasku
          uzroka problema na vozilu. Važno nam je da razumijete što se radi i
          zašto.
        </p>
        <p>
          Prije svakog zahvata prolazimo zatečeno stanje i dogovaramo potrebne
          radove. Nakon servisa objašnjavamo što je učinjeno i na što obratiti
          pozornost do sljedećeg pregleda.
        </p>
        <div className="kartice">
          {nacinRada.map((stavka) => (
            <Kartica key={stavka.naslov} stavka={stavka} varijanta="pristup" />
          ))}
        </div>
      </section>
      <section className="section">
        <h2>Od pregleda do održavanja</h2>
        <div className="kartice o-nama-galerija">
          <Kartica
            varijanta="fotografija"
            stavka={{
              slika: slikaServisa,
              opisSlike: "Ključevi i kliješta na radnoj površini",
              opis: "Redovito održavanje pomaže uočiti probleme na vrijeme.",
            }}
          />
          <Kartica
            varijanta="fotografija"
            stavka={{
              slika: slikaDijagnostike,
              opisSlike: "Alat za održavanje ispred vozila u radionici",
              opis: "Dijagnostika je početak provjere, a ne zamjena za stručni pregled.",
            }}
          />
        </div>
      </section>
      <section className="section priprema-dolaska">
        <p className="oznaka-stranice">Prije dolaska</p>
        <h2>Što nam pomaže pri pregledu?</h2>
        <p>
          Ne morate znati uzrok kvara. Dovoljno je opisati što ste primijetili.
        </p>
        <ul>
          <li>Zabilježite kada se javlja neobičan zvuk ili upozorenje.</li>
          <li>
            Pripremite podatke o posljednjem servisu i prijeđenim kilometrima.
          </li>
          <li>Navedite planirate li dulje putovanje ili redoviti pregled.</li>
        </ul>
      </section>
      <PozivNaKontakt
        naslov="Niste sigurni odakle početi?"
        opis="Opišite što ste primijetili i zajedno ćemo dogovoriti sljedeći korak."
      />
    </>
  );
};

export default ONama;
