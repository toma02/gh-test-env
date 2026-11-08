import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./Button";
import GreskaPolja from "./GreskaPolja";

const najviseZnakova = 500;

const KontaktForma = () => {
  const navigate = useNavigate();
  // Detalji i usporedba auta šalju gotov tekst upita kroz state poveznice.
  const { state } = useLocation();
  const [podatci, setPodatci] = useState({
    ime: "",
    email: "",
    poruka: state?.poruka ?? "",
    greske: {},
  });

  function promijeniPodatke(e) {
    // Ispravljanje polja briše samo poruku pogreške tog polja.
    setPodatci({
      ...podatci,
      [e.target.name]: e.target.value,
      greske: { ...podatci.greske, [e.target.name]: "" },
    });
  }

  function posalji(e) {
    e.preventDefault();
    const noveGreske = {};

    if (podatci.ime.trim().length < 2) {
      noveGreske.ime = "Upišite valjano ime. Ime mora imati barem 2 znaka.";
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(podatci.email.trim())) {
      noveGreske.email = "Upišite valjanu adresu e-pošte.";
    }

    if (podatci.poruka.trim().length < 10) {
      noveGreske.poruka =
        "Upišite valjanu poruku. Poruka mora imati barem 10 znakova.";
    }

    const neispravnaPolja = Object.keys(noveGreske);

    if (neispravnaPolja.length > 0) {
      setPodatci({ ...podatci, greske: noveGreske });
      // ID svakog polja jednak je njegovu nazivu.
      document.getElementById(neispravnaPolja[0]).focus();

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
        aria-invalid={Boolean(podatci.greske.ime)}
        aria-describedby="greska-ime"
        onChange={promijeniPodatke}
      />
      <GreskaPolja id="greska-ime" poruka={podatci.greske.ime} />
      <label htmlFor="email">Adresa e-pošte</label>
      <input
        id="email"
        name="email"
        value={podatci.email}
        type="email"
        aria-invalid={Boolean(podatci.greske.email)}
        aria-describedby="greska-email"
        onChange={promijeniPodatke}
      />
      <GreskaPolja id="greska-email" poruka={podatci.greske.email} />
      <label htmlFor="poruka">Poruka</label>
      <textarea
        id="poruka"
        name="poruka"
        rows="5"
        maxLength={najviseZnakova}
        value={podatci.poruka}
        aria-invalid={Boolean(podatci.greske.poruka)}
        aria-describedby="brojac-poruke greska-poruka"
        onChange={promijeniPodatke}
      ></textarea>
      <p id="brojac-poruke">
        {podatci.poruka.length} / {najviseZnakova} znakova
      </p>
      <GreskaPolja id="greska-poruka" poruka={podatci.greske.poruka} />
      <Button type="submit">Pošaljite poruku</Button>
    </form>
  );
};

export default KontaktForma;
