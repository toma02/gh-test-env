import { useState } from "react";
import { Button } from "./Button";

const pocetniPodatci = {
  firstName: "",
  lastName: "",
  email: "",
  salje: false,
  potvrda: "",
};

const ZaposlenikForma = ({ onDodaj }) => {
  const [podatci, setPodatci] = useState(pocetniPodatci);

  function promijeniPodatke(event) {
    setPodatci({
      ...podatci,
      [event.target.name]: event.target.value,
      potvrda: "",
    });
  }

  async function posalji(event) {
    event.preventDefault();
    setPodatci({ ...podatci, salje: true });
    const uspjeh = await onDodaj({
      firstName: podatci.firstName,
      lastName: podatci.lastName,
      email: podatci.email,
    });

    // Nakon uspjeha obrazac se prazni, a pri pogrešci upisani podatci ostaju.
    if (uspjeh) {
      setPodatci({
        ...pocetniPodatci,
        potvrda: `Zaposlenik ${podatci.firstName} ${podatci.lastName} je dodan.`,
      });
    } else {
      setPodatci({ ...podatci, salje: false });
    }
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
          onChange={promijeniPodatke}
        />
        <label htmlFor="zaposlenik-prezime">Prezime</label>
        <input
          id="zaposlenik-prezime"
          name="lastName"
          minLength={2}
          required
          value={podatci.lastName}
          onChange={promijeniPodatke}
        />
        <label htmlFor="zaposlenik-email">Adresa e-pošte</label>
        <input
          id="zaposlenik-email"
          name="email"
          type="email"
          required
          value={podatci.email}
          onChange={promijeniPodatke}
        />
        {podatci.potvrda && <p role="status">{podatci.potvrda}</p>}
        <Button type="submit" disabled={podatci.salje}>
          {podatci.salje ? "Slanje..." : "Kreirajte zaposlenika"}
        </Button>
      </form>
    </section>
  );
};

export default ZaposlenikForma;
