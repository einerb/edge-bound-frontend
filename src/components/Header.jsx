import { Link, Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <div className="container mb-5">
        <div className="row mb-3">
          <div className="col">
            <Link to="/">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                alt="Pokemon Logo"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};
