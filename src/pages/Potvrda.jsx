import { Link, Navigate, useLocation } from "react-router";

const Potvrda = () => {
  const { state } = useLocation();

  if (!state?.ime && !state?.email) {
    return <Navigate to="/kontakt" replace />;
  }

  return (
    <section className="section potvrda">
      <span className="potvrda-oznaka" aria-hidden="true">
        OK
      </span>
      <h1>
        {state.ime
          ? "Poruka je zabilježena"
          : "Prijava na novosti je zabilježena"}
      </h1>
      <p>
        {state.ime
          ? `Hvala na javljanju, ${state.ime}.`
          : `Hvala! Adresa za novosti: ${state.email}.`}
      </p>
      <Link className="gumb" to="/">
        Na naslovnicu
      </Link>
    </section>
  );
};

export default Potvrda;
