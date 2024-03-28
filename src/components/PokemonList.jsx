import { useContext } from "react";

import { CardPokemon } from "./CardPokemon";
import { Loader } from "./Loader";
import { PokemonContext } from "../context/PokemonContext";
import imgNotFound from "../assets/pokebola.png"

export const PokemonList = () => {
  const { allPokemons, loading, valueSearch, filteredPokemons } =
    useContext(PokemonContext);

  const searchMessage =
    valueSearch.trim().length > 2
      ? `Resultados de búsqueda para "${valueSearch}". Encontrados ${filteredPokemons.length} registro(s)`
      : null;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          {searchMessage && (
            <div className="row">
              <div className="col mb-3">
                <p>{searchMessage}</p>
              </div>
            </div>
          )}

          <div className="row">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon) => (
                <div className="col-12 col-md-6 col-lg-3" key={pokemon.id}>
                  <CardPokemon pokemon={pokemon} />
                </div>
              ))
            ) : (
              <div className="row">
                {valueSearch.trim().length > 2 ? (
                  <div className="h5 my-3">
                    No se encontraron pokemons que coincidan con "{valueSearch}"
                    <br />
                    <img className="mt-5" src={imgNotFound} alt="No found" height={100} />
                  </div>
                ) : (
                  allPokemons.map((pokemonAll) => (
                    <div
                      className="col-12 col-md-6 col-lg-3"
                      key={pokemonAll.id}
                    >
                      <CardPokemon pokemon={pokemonAll} />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
