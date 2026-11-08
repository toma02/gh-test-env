import { Link, Outlet } from "react-router";

const NotFoundLayout = () => {
  return (
    <main id="glavni-sadrzaj" className="not-found-layout">
      <Link className="header-logo" to="/">
        Autoservis FE
      </Link>
      <Outlet />
    </main>
  );
};

export default NotFoundLayout;
