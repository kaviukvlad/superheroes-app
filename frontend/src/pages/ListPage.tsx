import type { Superhero, Paginated } from "../types/superhero";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { listSuperheroes } from "../api/superheroes";
import SuperheroCard from "../components/SuperheroCard";
import Pagination from "../components/Pagination";

export default function ListPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<Paginated<Superhero>>({
    queryKey: ["list", page],
    queryFn: () => listSuperheroes(page, 5),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="list-page max-w-4xl mx-auto p-6">
      <div className="superhero-grid grid gap-6">
        {data.items.map((hero) => (
          <SuperheroCard key={hero.id} hero={hero} />
        ))}
      </div>

      <div className="pagination-wrapper mt-6">
        <Pagination page={data.page} pages={data.pages} onPage={setPage} />
      </div>
    </div>
  );
}
