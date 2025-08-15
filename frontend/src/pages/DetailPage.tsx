import { useQuery } from "@tanstack/react-query";
import { getSuperhero, deleteSuperhero } from "../api/superheroes";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero", id],
    queryFn: () => getSuperhero(id!),
  });

  if (isLoading) return <div className="detail-loading">Loading...</div>;
  if (error || !data) return <div className="detail-error">Not found</div>;

  return (
    <div className="detail-page">
      <h2 className="detail-title">{data.nickname}</h2>

      <div className="detail-info">
        <div>
          Real name: <strong>{data.real_name}</strong>
        </div>
        <p className="detail-origin">{data.origin_description}</p>
        <div className="detail-superpowers">
          Superpowers: {data.superpowers}
        </div>
        <div className="detail-catchphrase">
          Catch phrase: “{data.catch_phrase}”
        </div>
      </div>

      <div className="detail-images">
        {data.images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            width={160}
            height={160}
            className="detail-image"
          />
        ))}
      </div>

      <div className="detail-actions">
        <Link to={`/superheroes/${data.id}/edit`} className="detail-edit-btn">
          Edit
        </Link>
        <button
          onClick={async () => {
            await deleteSuperhero(data.id);
            nav("/");
          }}
          className="detail-delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
