import { useState } from "react";
import { Button } from "./Button";

const ZaposlenikForma = ({ onDodaj }) => {
  const [podatci, setPodatci] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function promijeni(event) {
    setPodatci({ ...podatci, [event.target.name]: event.target.value });
  }

  async function posalji(event) {
    event.preventDefault();
    await onDodaj(podatci);
    setPodatci({ firstName: "", lastName: "", email: "" });
  }

  return (
    <section className="section">
      <h2>Novi zaposlenik</h2>
      <p>
        Unesite osnovne podatke i pošaljite zahtjev za kreiranje zaposlenika.
      </p>
      <form className="forma zaposlenik-forma" onSubmit={posalji}>
        <label htmlFor="zaposlenik-ime">Ime</label>
        <input
          id="zaposlenik-ime"
          name="firstName"
          minLength={2}
          required
          value={podatci.firstName}
          onChange={promijeni}
        />
        <label htmlFor="zaposlenik-prezime">Prezime</label>
        <input
          id="zaposlenik-prezime"
          name="lastName"
          minLength={2}
          required
          value={podatci.lastName}
          onChange={promijeni}
        />
        <label htmlFor="zaposlenik-email">Adresa e-pošte</label>
        <input
          id="zaposlenik-email"
          name="email"
          type="email"
          required
          value={podatci.email}
          onChange={promijeni}
        />
        <Button type="submit">Kreirajte zaposlenika</Button>
      </form>
    </section>
  );
};

export default ZaposlenikForma;
