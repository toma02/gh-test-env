import { useState } from "react";
import { Button } from "./Button";
import ModalDetalji from "./ModalDetalji";

const AdminPanel = ({
  vrstaPodatka,
  naslov,
  podatci,
  onPrikaziDetalje,
  onObrisi,
  onPromijeniEmail,
}) => {
  const [detalji, setDetalji] = useState(null);

  // Ako zahtjev ne uspije, funkcija na Admin stranici vraća undefined pa se
  // modal zatvara, a poruka pogreške prikazuje se iznad sekcija.
  async function prikaziDetalje(id) {
    setDetalji(await onPrikaziDetalje(vrstaPodatka, id));
  }

  async function promijeniEmail(email) {
    setDetalji(await onPromijeniEmail(detalji.id, email));
  }

  return (
    <div className="admin-panel">
      <div className="admin-zaglavlje">
        <h2>{naslov}</h2>
        <span className="admin-broj">{podatci.length} zapisa</span>
      </div>
      <ul className="admin-lista">
        {podatci.map((podatak) => (
          <li key={podatak.id} className="admin-podatak">
            <div className="admin-tekst">
              <h3>
                {vrstaPodatka === "users"
                  ? `${podatak.firstName} ${podatak.lastName}`
                  : podatak.user.fullName}
              </h3>
              <p>{vrstaPodatka === "users" ? podatak.email : podatak.body}</p>
            </div>
            <div className="admin-actions">
              <Button onClick={() => prikaziDetalje(podatak.id)}>
                Prikažite detalje
              </Button>
              <Button
                className="gumb gumb-povratak"
                onClick={() => onObrisi(vrstaPodatka, podatak.id)}
              >
                Obriši
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {detalji && (
        <ModalDetalji
          vrstaPodatka={vrstaPodatka}
          detalji={detalji}
          onPromijeniEmail={promijeniEmail}
          onZatvori={() => setDetalji(null)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
