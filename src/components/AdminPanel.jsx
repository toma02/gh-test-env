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
  // Lista prvo prikazuje deset zapisa, a svaki klik dodaje još deset.
  const [broj, setBroj] = useState(10);

  // Ako zahtjev ne uspije, funkcija na Admin stranici vraća undefined pa se
  // modal zatvara, a poruka pogreške prikazuje se iznad sekcija.
  async function prikaziDetalje(id) {
    setDetalji(await onPrikaziDetalje(vrstaPodatka, id));
  }

  function obrisi(id) {
    if (window.confirm("Želite li sigurno obrisati ovaj zapis?")) {
      onObrisi(vrstaPodatka, id);
    }
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
        {podatci.slice(0, broj).map((podatak) => (
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
                onClick={() => obrisi(podatak.id)}
              >
                Obriši
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {broj < podatci.length && (
        <div className="actions">
          <Button onClick={() => setBroj(broj + 10)}>Prikažite još</Button>
        </div>
      )}
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
