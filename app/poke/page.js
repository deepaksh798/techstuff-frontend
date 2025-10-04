"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPokemon } from "@/network/Api";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPokemonData = (currentPage) => {
    const payload = {
      offset: (currentPage - 1) * 20,
      limit: 20,
    };

    fetchPokemon(payload.offset, payload.limit)
      .then((res) => {
        console.log("res>", res?.data?.results);
        setPokemon(res?.data?.results);
        setTotalPage(Math.ceil(res.data.count / 20));
      })
      .catch((err) => {
        console.log("err>", err);
      });
  };

  useEffect(() => {
    getPokemonData(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Pokemon Table</h1>
      <div className="w-[50%]">
        <Table className=" w-full border border-black">
          <TableHeader>
            <TableRow className="border border-black">
              <TableHead className="w-20 border-r border-black">
                Sr. No.
              </TableHead>
              <TableHead>Poke Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemon.map((poke, index) => (
              <TableRow className="border border-black" key={index}>
                <TableCell className="text-center border-r border-black">
                  {(page - 1) * 20 + index + 1}
                </TableCell>
                <TableCell className="text-left pl-5">{poke.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-5 flex justify-between">
          <span>Total: {totalPage}</span>
          <div>
            <Button className="" onClick={handlePrev} disabled={page === 1}>
              Prev
            </Button>
            <span className="px-2">{page}</span>
            <Button
              className=""
              onClick={handleNext}
              disabled={page === totalPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
