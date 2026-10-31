import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./Button";

const KontaktForma = () => {
  const navigate = useNavigate();
  const [podatci, setPodatci] = useState({
    ime: "",
    email: "",
    poruka: "",
    greska: "",
  });

  function promijeniPodatke(e) {
    setPodatci({
      ...podatci,
      [e.target.name]: e.target.value,
      greska: "",
    });
  }

  function posalji(e) {
    e.preventDefault();

    if (podatci.ime.trim().length < 2) {
      setPodatci({
        ...podatci,
        greska: "Upišite valjano ime. Ime mora imati barem 2 znaka.",
      });

      return;
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(podatci.email.trim())) {
      setPodatci({
        ...podatci,
        greska: "Upišite valjanu adresu e-pošte.",
      });

      return;
    }

    if (podatci.poruka.trim().length < 10) {
      setPodatci({
        ...podatci,
        greska: "Upišite valjanu poruku. Poruka mora imati barem 10 znakova.",
      });

      return;
    }

    navigate("/potvrda", { state: { ime: podatci.ime.trim() } });
  }

  return (
    <form className="forma" onSubmit={posalji} noValidate>
      <label htmlFor="ime">Ime i prezime</label>
      <input
        id="ime"
        name="ime"
        value={podatci.ime}
        type="text"
        onChange={promijeniPodatke}
      />
      <label htmlFor="email">Adresa e-pošte</label>
      <input
        id="email"
        name="email"
        value={podatci.email}
        type="email"
        onChange={promijeniPodatke}
      />
      <label htmlFor="poruka">Poruka</label>
      <textarea
        id="poruka"
        name="poruka"
        rows="5"
        value={podatci.poruka}
        onChange={promijeniPodatke}
      ></textarea>
      {podatci.greska && (
        <p className="greska" role="alert">
          {podatci.greska}
        </p>
      )}
      <Button type="submit">Pošaljite poruku</Button>
    </form>
  );
};

export default KontaktForma;
