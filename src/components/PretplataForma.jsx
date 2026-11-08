import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./Button";
import GreskaPolja from "./GreskaPolja";

const PretplataForma = () => {
  const navigate = useNavigate();
  const [podatci, setPodatci] = useState({
    email: "",
    privola: false,
    greske: {},
  });

  function promijeniPodatke(naziv, vrijednost) {
    setPodatci({
      ...podatci,
      [naziv]: vrijednost,
      greske: { ...podatci.greske, [naziv]: "" },
    });
  }

  function posalji(e) {
    e.preventDefault();
    const noveGreske = {};

    if (!/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(podatci.email.trim())) {
      noveGreske.email = "Upišite valjanu adresu e-pošte.";
    }

    if (!podatci.privola) {
      noveGreske.privola = "Potvrdite da želite primati novosti.";
    }

    if (Object.keys(noveGreske).length > 0) {
      setPodatci({ ...podatci, greske: noveGreske });
      return;
    }

    navigate("/novosti/potvrda", { state: { email: podatci.email.trim() } });
  }

  return (
    <form className="forma" onSubmit={posalji} noValidate>
      <label htmlFor="email-novosti">Adresa e-pošte za novosti</label>
      <input
        id="email-novosti"
        name="email"
        value={podatci.email}
        type="email"
        aria-invalid={Boolean(podatci.greske.email)}
        aria-describedby="greska-email-novosti"
        onChange={(e) => promijeniPodatke(e.target.name, e.target.value)}
      />
      <GreskaPolja id="greska-email-novosti" poruka={podatci.greske.email} />
      <label htmlFor="privola" className="privola">
        <input
          id="privola"
          type="checkbox"
          name="privola"
          checked={podatci.privola}
          aria-invalid={Boolean(podatci.greske.privola)}
          aria-describedby="greska-privola"
          onChange={(e) => promijeniPodatke(e.target.name, e.target.checked)}
        />
        Želim primati novosti o uslugama autoservisa
      </label>
      <GreskaPolja id="greska-privola" poruka={podatci.greske.privola} />
      <Button type="submit">Prijavite se na novosti</Button>
    </form>
  );
};

export default PretplataForma;
