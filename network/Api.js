import { getRequest } from "./ApiRequest";
import { ENDPOINTS } from "./EndPoints";

export const fetchPokemons = (offset, limit) => {
  return getRequest(
    `${ENDPOINTS.GET_ALL_POKEMON}?offset=${offset}&limit=${limit}`
  );
};

export const fetchPokemonDetails = (pokemonNumber) => {
  return getRequest(`${ENDPOINTS.GET_ALL_POKEMON}/${pokemonNumber}`);
};
