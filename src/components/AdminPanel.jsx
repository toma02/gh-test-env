import { useState } from "react";
import { Button } from "./Button";
import ModalDetalji from "./ModalDetalji";

const AdminPanel = ({
  vrsta,
  naslov,
  stavke,
  onDetalji,
  onObrisi,
  onPromijeniEmail,
}) => {
  const [detalji, setDetalji] = useState(null);

  // Ako zahtjev ne uspije, funkcija na Admin stranici vraća undefined pa se
  // modal zatvara, a poruka pogreške prikazuje se iznad sekcija.
  async function prikaziDetalje(id) {
    setDetalji(await onDetalji(vrsta, id));
  }

  async function promijeniEmail(email) {
    setDetalji(await onPromijeniEmail(detalji.id, email));
  }

  return (
    <section className="section admin-sekcija">
      <div className="admin-zaglavlje">
        <h2>{naslov}</h2>
        <span className="admin-broj">{stavke.length} zapisa</span>
      </div>
      <ul className="admin-lista" aria-label={naslov}>
        {stavke.map((stavka) => (
          <li key={stavka.id} className="admin-stavka">
            <div className="admin-tekst">
              <h3>
                {vrsta === "users"
                  ? `${stavka.firstName} ${stavka.lastName}`
                  : stavka.user.fullName}
              </h3>
              <p>{vrsta === "users" ? stavka.email : stavka.body}</p>
            </div>
            <div className="admin-akcije">
              <Button onClick={() => prikaziDetalje(stavka.id)}>
                Prikažite detalje
              </Button>
              <Button
                className="gumb gumb-povratak"
                onClick={() => onObrisi(vrsta, stavka.id)}
              >
                Obrišite
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {detalji && (
        <ModalDetalji
          vrsta={vrsta}
          detalji={detalji}
          onPromijeniEmail={promijeniEmail}
          onZatvori={() => setDetalji(null)}
        />
      )}
    </section>
  );
};

export default AdminPanel;
