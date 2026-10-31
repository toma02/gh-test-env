import { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import ZaposlenikForma from "../components/ZaposlenikForma";
import { zahtjev } from "../api";

const Admin = () => {
  const [zaposlenici, setZaposlenici] = useState([]);
  const [komentari, setKomentari] = useState([]);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    async function dohvati() {
      try {
        const podatciZaposlenika = await zahtjev("users?limit=0");
        setZaposlenici(podatciZaposlenika.users);
        const podatciKomentara = await zahtjev("comments?limit=0");
        setKomentari(podatciKomentara.comments);
      } catch {
        setGreska("Dohvat podataka nije uspio. Osvježite stranicu.");
      }
    }
    dohvati();
  }, []);

  async function dohvatiDetalje(vrsta, id) {
    setGreska("");
    try {
      return await zahtjev(`${vrsta}/${id}`);
    } catch {
      setGreska("Prikaz detalja nije uspio. Pokušajte ponovno.");
    }
  }

  async function obrisi(vrsta, id) {
    setGreska("");
    try {
      await zahtjev(`${vrsta}/${id}`, { method: "DELETE" });
      const setStavke = vrsta === "users" ? setZaposlenici : setKomentari;
      setStavke((stavke) => stavke.filter((stavka) => stavka.id !== id));
    } catch {
      setGreska("Brisanje nije uspjelo. Pokušajte ponovno.");
    }
  }

  async function promijeniEmail(id, email) {
    setGreska("");
    try {
      const zaposlenik = await zahtjev(`users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setZaposlenici((stavke) =>
        stavke.map((stavka) =>
          stavka.id === id ? { ...stavka, email } : stavka,
        ),
      );
      return zaposlenik;
    } catch {
      setGreska("Promjena e-pošte nije uspjela. Pokušajte ponovno.");
    }
  }

  async function dodajZaposlenika(podatci) {
    setGreska("");
    try {
      const zaposlenik = await zahtjev("users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(podatci),
      });
      // DummyJSON uvijek vraća isti id novog zapisa, pa id daje Date.now().
      setZaposlenici((stavke) => [
        { ...zaposlenik, id: Date.now() },
        ...stavke,
      ]);
    } catch {
      setGreska("Dodavanje zaposlenika nije uspjelo. Pokušajte ponovno.");
    }
  }

  return (
    <>
      <section className="section">
        <p className="oznaka-stranice">Pregled podataka</p>
        <h2>Administracija</h2>
        <p>
          Pregledajte zaposlenike i komentare, otvorite detalje ili pošaljite
          zahtjev za brisanje.
        </p>
        <p>Podatci su probni. Dodavanje i brisanje nisu trajno spremljeni.</p>
      </section>
      {greska && (
        <p className="greska" role="alert">
          {greska}
        </p>
      )}
      <div className="admin-sekcije">
        <AdminPanel
          vrsta="users"
          naslov="Zaposlenici"
          stavke={zaposlenici}
          onDetalji={dohvatiDetalje}
          onObrisi={obrisi}
          onPromijeniEmail={promijeniEmail}
        />
        <AdminPanel
          vrsta="comments"
          naslov="Komentari"
          stavke={komentari}
          onDetalji={dohvatiDetalje}
          onObrisi={obrisi}
        />
      </div>
      <ZaposlenikForma onDodaj={dodajZaposlenika} />
    </>
  );
};

export default Admin;
