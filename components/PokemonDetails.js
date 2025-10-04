import React from "react";
import { Progress } from "@/components/ui/progress";

const PokemonDetails = ({ pokemonDetails }) => {
  console.log("pokemonDetailsss", pokemonDetails);

  return (
    <div className="h-full overflow-y-auto">
      {/*  Image */}
      <div className="px-6 py-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg border-2 border-slate-200 flex items-center justify-center p-4">
            {pokemonDetails?.sprites?.other?.dream_world?.front_default ? (
              <img
                src={pokemonDetails.sprites.other.dream_world.front_default}
                alt={pokemonDetails?.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-slate-400 text-sm text-center">
                No image available
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 capitalize mb-3">
              {pokemonDetails?.name}
            </h2>

            {/* Types */}
            <div className="flex gap-2 flex-wrap">
              {pokemonDetails?.types?.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-200 text-slate-700 capitalize"
                >
                  {type?.type?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="px-6 py-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Physical Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Height</div>
              <div className="text-2xl font-bold text-slate-900">
                {pokemonDetails?.height
                  ? `${(pokemonDetails.height / 10).toFixed(1)} m`
                  : "N/A"}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Weight</div>
              <div className="text-2xl font-bold text-slate-900">
                {pokemonDetails?.weight
                  ? `${(pokemonDetails.weight / 10).toFixed(1)} kg`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* abilities */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Abilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemonDetails?.abilities?.map((item, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 capitalize"
              >
                {item?.ability?.name?.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* states */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Game Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Total Moves</div>
              <div className="text-2xl font-bold text-slate-900">
                {pokemonDetails?.moves?.length || 0}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">
                Game Appearances
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {pokemonDetails?.game_indices?.length || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Base Stats */}
        {pokemonDetails?.stats && pokemonDetails.stats.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Base Stats
            </h3>
            <div className="space-y-3">
              {pokemonDetails.stats.map((stat, index) => {
                const percentage = (stat.base_stat / 255) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {stat.base_stat}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2 " />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
