import { useState } from "react";
import GreskaPolja from "./GreskaPolja";

const brojeviRata = [12, 24, 36, 48, 60];

const prikaziIznos = (iznos) =>
  `${iznos.toLocaleString("hr-HR", { maximumFractionDigits: 2 })} €`;

const KalkulatorRata = ({ cijena }) => {
  const [ucesce, setUcesce] = useState("");
  // Iznos ne smije pasti ispod nule kad je učešće veće od cijene.
  const iznos = Math.max(cijena - Number(ucesce), 0);
  const greska =
    Number(ucesce) > cijena ? "Učešće ne može biti veće od cijene auta." : "";

  return (
    <section className="section">
      <h2>Informativni izračun rata</h2>
      <div className="kalkulator-rata">
        <div className="forma">
          <label htmlFor="ucesce">Učešće (€)</label>
          <input
            id="ucesce"
            type="number"
            min="0"
            value={ucesce}
            aria-invalid={Boolean(greska)}
            aria-describedby="greska-ucesca"
            onChange={(event) => setUcesce(event.target.value)}
          />
          <GreskaPolja id="greska-ucesca" poruka={greska} />
          <p className="iznos-otplate">Iznos za otplatu</p>
          <p className="cijena-usluge">{prikaziIznos(iznos)}</p>
        </div>
        <table className="tablica-rata">
          <thead>
            <tr>
              <th>Broj rata</th>
              <th>Mjesečna rata</th>
            </tr>
          </thead>
          <tbody>
            {brojeviRata.map((broj) => (
              <tr key={broj}>
                <td>{broj}</td>
                <td>{prikaziIznos(iznos / broj)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default KalkulatorRata;
