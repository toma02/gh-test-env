import { Link, Navigate, useLocation } from "react-router";

const PotvrdaNovosti = () => {
  const { state } = useLocation();
  if (!state?.email) return <Navigate to="/kontakt" replace />;

  return (
    <section className="section potvrda">
      <span className="potvrda-oznaka" aria-hidden="true">
        OK
      </span>
      <h1>Prijava na novosti je zabilježena</h1>
      <p>Hvala! Adresa za novosti: {state.email}.</p>
      <Link className="gumb" to="/">
        Na naslovnicu
      </Link>
    </section>
  );
};

export default PotvrdaNovosti;
