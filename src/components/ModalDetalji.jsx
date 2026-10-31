import { Button } from "./Button";

const ModalDetalji = ({ vrsta, detalji, onPromijeniEmail, onZatvori }) => {
  function promijeniEmail() {
    const email = window.prompt("Unesite novu adresu e-pošte:", detalji.email);
    if (email) onPromijeniEmail(email.trim());
  }

  return (
    <div
      className="modal-overlay"
      onClick={onZatvori}
      onKeyDown={(event) => event.key === "Escape" && onZatvori()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="naslov-modala"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-zaglavlje">
          <h2 id="naslov-modala">
            {vrsta === "users" ? "Detalji zaposlenika" : "Detalji komentara"}
          </h2>
          <Button autoFocus onClick={onZatvori}>
            Zatvori
          </Button>
        </div>
        {vrsta === "users" ? (
          <div className="modal-sadrzaj">
            <h3>
              {detalji.firstName} {detalji.lastName}
            </h3>
            <p>
              <strong>Adresa e-pošte:</strong> {detalji.email}
            </p>
            <p>
              <strong>Oznaka zaposlenika:</strong> {detalji.username}
            </p>
            <p>
              <strong>Telefon:</strong> {detalji.phone}
            </p>
            <p>
              <strong>Dob:</strong> {detalji.age}
            </p>
            <p>
              <strong>Grad:</strong> {detalji.address.city}
            </p>
            <Button onClick={promijeniEmail}>Promijenite e-poštu</Button>
          </div>
        ) : (
          <div className="modal-sadrzaj">
            <h3>{detalji.user.fullName}</h3>
            <p>{detalji.body}</p>
            <p>
              <strong>Oznaka autora:</strong> {detalji.user.username}
            </p>
            <p>
              <strong>Oznake sviđanja:</strong> {detalji.likes}
            </p>
            <p>
              <strong>Povezana objava:</strong> {detalji.postId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetalji;
