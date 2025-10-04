import React from "react";

const PokemonDetails = ({ pokemonDetails }) => {
  console.log("pokemonDetailsss", pokemonDetails);

  return (
    <div className="w-1/2 p-4  rounded-md space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Name</h2>
        <span className="text-gray-900">{pokemonDetails?.name}</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Abilities</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {pokemonDetails?.abilities?.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
            >
              {item?.ability?.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Game Indices</h2>
        <span className="text-gray-900">
          {pokemonDetails?.game_indices?.length}
        </span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Height</h2>
        <span className="text-gray-900">{pokemonDetails?.height}</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Weight</h2>
        <span className="text-gray-900">{pokemonDetails?.weight}</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Moves</h2>
        <span className="text-gray-900">{pokemonDetails?.moves?.length}</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Image</h2>
        <img
          src={pokemonDetails?.sprites?.other?.dream_world?.front_default}
          alt="Pokemon"
          className="w-24 h-24 object-contain"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Types</h2>
        <div className="flex gap-2 mt-1 flex-wrap">
          {pokemonDetails?.types?.map((type, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded"
            >
              {type?.type?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
