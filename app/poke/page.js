"use client";
// export const runtime = edge;

import PokemonDetails from "@/components/PokemonDetails";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPokemonDetails, fetchPokemons } from "@/network/Api";
import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

const Page = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const fetchPokemonData = async (pageNumber) => {
    setIsLoading(true);
    const offset = (pageNumber - 1) * ITEMS_PER_PAGE;

    try {
      const response = await fetchPokemons(offset, ITEMS_PER_PAGE);
      const results = response?.data?.results || [];
      const totalCount = response?.data?.count || 0;

      setPokemon(results);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error :", error);
      toast.error(error?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData(currentPage);
  }, [currentPage]);

  const handleShowPokemonDetails = async (pokemonId) => {
    setSelectedPokemonId(pokemonId);
    try {
      const response = await fetchPokemonDetails(pokemonId);
      setPokemonDetails(response?.data);
    } catch (error) {
      console.error("Error :", error);
      toast.error(error?.message || "Failed to fetch data");
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const calculateRowNumber = (index) => {
    return (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Pokemon Database
          </h1>
          <p className="text-slate-600">
            Browse through the Pokemon collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table  */}
          <div className="bg-white rounded-lg shadow border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800">
                Pokemon List
              </h2>
            </div>

            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="w-20 text-slate-700 font-semibold border-r border-slate-200">
                      No.
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold">
                      Name
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={2} className="h-96 text-center">
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin"></div>
                          <p className="mt-3 text-slate-500 text-sm">
                            Loading...
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : pokemon.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="h-96 text-center text-slate-500"
                      >
                        No Pokemon available
                      </TableCell>
                    </TableRow>
                  ) : (
                    pokemon.map((poke, index) => {
                      const pokemonId = calculateRowNumber(index);
                      const isSelected = selectedPokemonId === pokemonId;

                      return (
                        <TableRow
                          key={index}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-blue-50 hover:bg-blue-100 border-l-4 border-l-blue-500"
                              : "hover:bg-slate-50"
                          }`}
                          onClick={() => handleShowPokemonDetails(pokemonId)}
                        >
                          <TableCell
                            className={`text-center font-medium border-r border-slate-100 ${
                              isSelected ? "text-blue-700" : "text-slate-600"
                            }`}
                          >
                            {pokemonId}
                          </TableCell>
                          <TableCell
                            className={`font-medium capitalize ${
                              isSelected ? "text-blue-700" : "text-slate-900"
                            }`}
                          >
                            {poke.name}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1 || isLoading}
                    variant="outline"
                    className="text-sm"
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || isLoading}
                    variant="outline"
                    className="text-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pokemon Details Section */}
          {pokemonDetails ? (
            <div className="bg-white rounded-lg shadow border border-slate-200">
              <PokemonDetails pokemonDetails={pokemonDetails} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center">
              <div className="text-center py-20 px-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <Info className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 text-sm">
                  Select a Pokemon from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
