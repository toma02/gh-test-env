import { Button } from "./Button";

const ModalDetalji = ({
  vrstaPodatka,
  detalji,
  onPromijeniEmail,
  onZatvori,
}) => {
  function promijeniEmail() {
    const email = window.prompt("Unesite novu adresu e-pošte:", detalji.email);
    if (email) onPromijeniEmail(email.trim());
  }

  return (
    <div className="modal-overlay" onClick={onZatvori}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-zaglavlje">
          <h2>
            {vrstaPodatka === "users"
              ? "Detalji zaposlenika"
              : "Detalji komentara"}
          </h2>
          <Button onClick={onZatvori}>Zatvori</Button>
        </div>
        {vrstaPodatka === "users" ? (
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
              <strong>Korisničko ime:</strong> {detalji.user.username}
            </p>
            <p>
              <strong>Broj reakcija:</strong> {detalji.likes}
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
