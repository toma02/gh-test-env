import { useState } from "react";
import { Button } from "./Button.jsx";
import { Link, NavLink } from "react-router";

export function Header() {
  const [otvoren, setOtvoren] = useState(false);

  return (
    <>
      <a className="skip-veza" href="#glavni-sadrzaj">
        Preskoči na sadržaj
      </a>
      <header>
        <div className="header-wrapper">
          <Link className="header-logo" to="/">
            Autoservis FE
          </Link>
          <Button
            className="hamburger"
            aria-label={otvoren ? "Zatvori izbornik" : "Otvori izbornik"}
            aria-controls="header-nav"
            aria-expanded={otvoren}
            onClick={() => setOtvoren(!otvoren)}
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
          <nav
            id="header-nav"
            className={`nav-izbornik ${otvoren ? "otvoren" : ""}`}
            aria-label="Glavna navigacija"
          >
            <ul className="header-linkovi">
              <li>
                <NavLink to="/" end onClick={() => setOtvoren(false)}>
                  Naslovnica
                </NavLink>
              </li>
              <li>
                <NavLink to="/usluge" onClick={() => setOtvoren(false)}>
                  Usluge
                </NavLink>
              </li>
              <li>
                <NavLink to="/vozila" onClick={() => setOtvoren(false)}>
                  Auti
                </NavLink>
              </li>
              <li>
                <NavLink to="/o-nama" onClick={() => setOtvoren(false)}>
                  O nama
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" onClick={() => setOtvoren(false)}>
                  Administracija
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontakt" onClick={() => setOtvoren(false)}>
                  Kontakt
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
