import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./Button";

const PretplataForma = () => {
  const navigate = useNavigate();
  const [podatci, setPodatci] = useState({
    email: "",
    privola: false,
    obavijest: "",
  });

  function promijeniPodatke(naziv, vrijednost) {
    setPodatci({
      ...podatci,
      [naziv]: vrijednost,
      obavijest: "",
    });
  }

  function posalji(e) {
    e.preventDefault();

    if (
      !/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(podatci.email.trim()) ||
      !podatci.privola
    ) {
      setPodatci({
        ...podatci,
        obavijest: `Upišite valjanu adresu e-pošte i potvrdite privolu.`,
      });
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
        onChange={(e) => promijeniPodatke(e.target.name, e.target.value)}
      />
      <label htmlFor="privola" className="privola">
        <input
          id="privola"
          type="checkbox"
          name="privola"
          checked={podatci.privola}
          onChange={(e) => promijeniPodatke(e.target.name, e.target.checked)}
        />
        Želim primati novosti o uslugama autoservisa
      </label>
      {podatci.obavijest && <p role="status">{podatci.obavijest}</p>}
      <Button type="submit">Prijavite se na novosti</Button>
    </form>
  );
};

export default PretplataForma;
