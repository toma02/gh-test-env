import { Link, NavLink } from "react-router";

export function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <Link className="footer-logo" to="/">
          Autoservis FE
        </Link>
        <nav aria-label="Navigacija u podnožju">
          <ul className="footer-linkovi">
            <li>
              <NavLink to="/" end>
                Naslovnica
              </NavLink>
            </li>
            <li>
              <NavLink to="/usluge">Usluge</NavLink>
            </li>
            <li>
              <NavLink to="/vozila">Auti</NavLink>
            </li>
            <li>
              <NavLink to="/o-nama">O nama</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Administracija</NavLink>
            </li>
            <li>
              <NavLink to="/kontakt">Kontakt</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
