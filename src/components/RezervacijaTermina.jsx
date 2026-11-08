import { useState } from "react";
import { Button } from "./Button";

const termini = ["08:00", "10:00", "12:00", "14:00"];

// Polje datuma traži zapis GGGG-MM-DD, pa se uzima prvih 10 znakova današnjeg datuma.
const danas = new Date().toISOString().slice(0, 10);

const RezervacijaTermina = ({ usluga }) => {
  const [podatci, setPodatci] = useState({ ime: "", datum: "", vrijeme: "" });
  const [rezervirano, setRezervirano] = useState(false);

  function promijeniPodatke(e) {
    setPodatci({ ...podatci, [e.target.name]: e.target.value });
  }

  function posalji(e) {
    e.preventDefault();
    // Nova rezervacija dodaje se postojećima u localStorage, a čita ih stranica administracije.
    const rezervacije = JSON.parse(localStorage.getItem("rezervacije")) || [];
    rezervacije.push({ ...podatci, id: Date.now(), usluga: usluga.naslov });
    localStorage.setItem("rezervacije", JSON.stringify(rezervacije));
    setPodatci({ ime: "", datum: "", vrijeme: "" });
    setRezervirano(true);
  }

  return (
    <section className="section">
      <h2>Rezervirajte termin</h2>
      {/* required i min provjerava preglednik prije slanja obrasca. */}
      <form className="forma" onSubmit={posalji}>
        <div className="rezervacija-polja">
          <div className="rezervacija-polje">
            <label htmlFor="ime-rezervacija">Ime i prezime</label>
            <input
              id="ime-rezervacija"
              name="ime"
              type="text"
              required
              value={podatci.ime}
              onChange={promijeniPodatke}
            />
          </div>
          <div className="rezervacija-polje">
            <label htmlFor="datum">Datum dolaska</label>
            {/* min onemogućuje odabir datuma iz prošlosti u kalendaru. */}
            <input
              id="datum"
              name="datum"
              type="date"
              required
              min={danas}
              value={podatci.datum}
              onChange={promijeniPodatke}
            />
          </div>
          <div className="rezervacija-polje">
            <label htmlFor="vrijeme">Vrijeme dolaska</label>
            <select
              id="vrijeme"
              name="vrijeme"
              required
              value={podatci.vrijeme}
              onChange={promijeniPodatke}
            >
              <option value="">Odaberite vrijeme</option>
              {termini.map((termin) => (
                <option key={termin} value={termin}>
                  {termin}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit">Rezervirajte termin</Button>
        {rezervirano && <p>Termin je rezerviran.</p>}
      </form>
    </section>
  );
};

export default RezervacijaTermina;
