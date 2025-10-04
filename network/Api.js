import { getRequest } from "./ApiRequest";
import { ENDPOINTS } from "./EndPoints";
export const fetchPokemon = (offset, limit) => {
  return getRequest(`${ENDPOINTS.GET_ALL_POKEMON}?offset=${offset}&limit=${limit}`);
};
