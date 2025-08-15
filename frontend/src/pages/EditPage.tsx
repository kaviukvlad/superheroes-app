import { useQuery } from "@tanstack/react-query";
import { getSuperhero, updateSuperhero } from "../api/superheroes";
import { useNavigate, useParams } from "react-router-dom";
import SuperheroForm from "../components/SuperheroForm";

export default function EditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero", id],
    queryFn: () => getSuperhero(id!),
  });

  if (isLoading) return <div className="edit-loading">Loading...</div>;
  if (error || !data) return <div className="edit-error">Not found</div>;

  return (
    <div className="edit-page">
      <h1 className="edit-title">Edit Superhero</h1>
      <SuperheroForm
        initial={data}
        onSubmit={async (payload) => {
          const hero = await updateSuperhero(id!, payload);
          nav(`/superheroes/${hero.id}`);
        }}
      />
    </div>
  );
}
