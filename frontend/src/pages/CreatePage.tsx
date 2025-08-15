import SuperheroForm from "../components/SuperheroForm";
import { createSuperhero } from "../api/superheroes";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function CreatePage() {
  const nav = useNavigate();

  return (
    <Layout>
      <div className="create-page">
        <h1 className="create-page-title">Create Superhero</h1>
        <SuperheroForm
          onSubmit={async (payload) => {
            const hero = await createSuperhero(payload);
            nav(`/superheroes/${hero.id}`);
          }}
        />
      </div>
    </Layout>
  );
}
