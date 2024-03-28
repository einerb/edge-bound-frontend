import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllPokemons = async (limit = 12) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    try {
      const res = await fetch(
        `${baseURL}pokemon?limit=${limit}&offset=${offset}`
      );

      if (!res) {
        throw new Error(`Error en la solicitud: ${res.status}`);
      }

      const data = await res.json();

      const promises = data.results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url);

          if (!res) {
            throw new Error(`Error en la solicitud: ${res.status}`);
          }

          const data = await res.json();
          return data;
        } catch (err) {
          return err;
        }
      });
      const results = await Promise.all(promises);

      setAllPokemons([...allPokemons, ...results]);
      setLoading(false);
    } catch (error) {
      setGlobalPokemons([]);
      setLoading(false);
    }
  };

  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    try {
      const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);

      if (!res) {
        throw new Error(`Error en la solicitud: ${res.status}`);
      }

      const data = await res.json();

      const promises = data.results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url);

          if (!res) {
            throw new Error(`Error en la solicitud: ${res.status}`);
          }

          const data = await res.json();
          return data;
        } catch (err) {
          return err;
        }
      });

      const results = await Promise.all(promises);

      setGlobalPokemons(results);
      setLoading(false);
    } catch (err) {
      setGlobalPokemons([]);
      setLoading(false);
    }
  };

  const getPokemonByID = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    try {
      const res = await fetch(`${baseURL}pokemon/${id}`);

      if (!res) {
        throw new Error(`Error en la solicitud: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setLoading(false);
    }
  };

  const getPokemonSpecie = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    try {
      const res = await fetch(`${baseURL}pokemon-species/${id}`);
      const data = await res.json();

      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const onClickLoadMore = () => {
    setOffset(offset + 12);
  };

  const search = async () => {
    setFilteredPokemons([]);
    if (valueSearch.trim().length >= 3) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.name.includes(valueSearch)
      );
      setFilteredPokemons(filteredResults);
    } else {
      setFilteredPokemons(allPokemons);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemons,
        globalPokemons,
        getPokemonByID,
        getPokemonSpecie,
        onClickLoadMore,
        loading,
        setLoading,
        search,
        filteredPokemons,
        setValueSearch,
        valueSearch,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
