import { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import ZaposlenikForma from "../components/ZaposlenikForma";
import { apiRequest } from "../api";

const Admin = () => {
  // Rezervacije sprema obrazac na stranici usluge, a ovdje se samo čitaju iz localStorage.
  const rezervacije = JSON.parse(localStorage.getItem("rezervacije")) || [];
  const [zaposlenici, setZaposlenici] = useState([]);
  const [komentari, setKomentari] = useState([]);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        const podatciZaposlenika = await apiRequest("users?limit=0");
        setZaposlenici(podatciZaposlenika.users);
        const podatciKomentara = await apiRequest("comments?limit=0");
        setKomentari(podatciKomentara.comments);
      } catch {
        setGreska("Dohvaćanje podataka nije uspjelo. Osvježite stranicu.");
      }
    }
    dohvatiPodatke();
  }, []);

  async function dohvatiDetalje(vrstaPodatka, id) {
    setGreska("");
    try {
      return await apiRequest(`${vrstaPodatka}/${id}`);
    } catch {
      setGreska("Prikaz detalja nije uspio. Pokušajte ponovno.");
    }
  }

  async function obrisi(vrstaPodatka, id) {
    setGreska("");

    try {
      await apiRequest(`${vrstaPodatka}/${id}`, { method: "DELETE" });

      if (vrstaPodatka === "users") {
        setZaposlenici((zaposlenici) =>
          zaposlenici.filter((zaposlenik) => zaposlenik.id !== id),
        );
      } else {
        setKomentari((komentari) =>
          komentari.filter((komentar) => komentar.id !== id),
        );
      }
    } catch {
      setGreska("Brisanje nije uspjelo. Pokušajte ponovno.");
    }
  }

  async function promijeniEmail(id, email) {
    setGreska("");
    try {
      const zaposlenik = await apiRequest(`users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setZaposlenici((zaposlenici) =>
        zaposlenici.map((zaposlenik) =>
          zaposlenik.id === id ? { ...zaposlenik, email } : zaposlenik,
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
      const zaposlenik = await apiRequest("users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(podatci),
      });
      // DummyJSON uvijek vraća isti id novog zapisa, pa id daje Date.now().
      setZaposlenici((zaposlenici) => [
        { ...zaposlenik, id: Date.now() },
        ...zaposlenici,
      ]);
      return true;
    } catch {
      setGreska("Dodavanje zaposlenika nije uspjelo. Pokušajte ponovno.");
      return false;
    }
  }

  return (
    <>
      <section className="section">
        <p className="oznaka">Pregled podataka</p>
        <h2>Administracija</h2>
        <p>Pregledajte zaposlenike i komentare.</p>
        {greska && <p className="greska">{greska}</p>}
        <div className="admin-paneli">
          <AdminPanel
            vrstaPodatka="users"
            naslov="Zaposlenici"
            podatci={zaposlenici}
            onPrikaziDetalje={dohvatiDetalje}
            onObrisi={obrisi}
            onPromijeniEmail={promijeniEmail}
          />
          <AdminPanel
            vrstaPodatka="comments"
            naslov="Komentari"
            podatci={komentari}
            onPrikaziDetalje={dohvatiDetalje}
            onObrisi={obrisi}
          />
        </div>
      </section>
      <section className="section">
        <div className="admin-panel">
          <div className="admin-zaglavlje">
            <h2>Rezervirani termini</h2>
            <span className="admin-broj">{rezervacije.length} zapisa</span>
          </div>
          {rezervacije.length === 0 && <p>Još nema rezerviranih termina.</p>}
          <ul className="admin-lista">
            {rezervacije.map((rezervacija) => (
              <li key={rezervacija.id} className="admin-podatak">
                <div className="admin-tekst">
                  <h3>{rezervacija.ime}</h3>
                  <p>
                    {rezervacija.usluga},{" "}
                    {new Date(rezervacija.datum).toLocaleDateString("hr-HR")} u{" "}
                    {rezervacija.vrijeme}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ZaposlenikForma onDodaj={dodajZaposlenika} />
    </>
  );
};

export default Admin;
