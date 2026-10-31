import { Link, Navigate, useLocation } from "react-router";

const Potvrda = () => {
  const { state } = useLocation();
  if (!state?.ime) return <Navigate to="/kontakt" replace />;

  return (
    <section className="section potvrda">
      <span className="potvrda-oznaka" aria-hidden="true">
        OK
      </span>
      <h1>Poruka je zabilježena</h1>
      <p>Hvala na javljanju, {state.ime}.</p>
      <Link className="gumb" to="/">
        Na naslovnicu
      </Link>
    </section>
  );
};

export default Potvrda;
