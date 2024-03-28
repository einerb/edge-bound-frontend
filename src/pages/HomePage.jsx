import { useContext } from "react";

import { PokemonList } from "../components/PokemonList";
import { PokemonContext } from "../context/PokemonContext";

export const HomePage = () => {
  const {
    onClickLoadMore,
    valueSearch,
    search,
    setValueSearch,
  } = useContext(PokemonContext);

  const handleChange = (event) => {
    setValueSearch(event.target.value);

    search();
  };

  return (
    <>
      <div className="row">
        <div className="mb-5">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={valueSearch}
              onChange={handleChange}
              placeholder="Escriba el nombre del Pokemon..."
            />
          </div>
        </div>
      </div>

      <PokemonList />

      {valueSearch.length !== 0 ? (
        ""
      ) : (
        <div className="container my-5">
          <button className="btn btn-primary" onClick={onClickLoadMore}>
            Cargar más pokémones...
          </button>
        </div>
      )}
    </>
  );
};
