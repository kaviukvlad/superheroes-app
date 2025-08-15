import { Link } from "react-router-dom";
import type { Superhero } from "../types/superhero";

export default function SuperheroCard({ hero }: { hero: Superhero }) {
  const preview = hero.images?.[0]?.url;
  return (
    <div className="superhero-card">
      {preview ? (
        <img
          src={preview}
          alt={hero.nickname}
          width={100}
          height={100}
          className="superhero-image"
        />
      ) : (
        <div className="superhero-placeholder" />
      )}
      <div className="superhero-info">
        <h3 className="superhero-nickname">{hero.nickname}</h3>
        <div className="superhero-realname">Real name: {hero.real_name}</div>
        <Link to={`/superheroes/${hero.id}`} className="superhero-details-link">
          Details
        </Link>
      </div>
    </div>
  );
}
