import { useState } from "react";
import type { Superhero } from "../types/superhero";
import ImageUploader from "./ImageUploader";

type Props = {
  initial?: Partial<Superhero>;
  onSubmit: (data: any) => void;
};

export default function SuperheroForm({ initial, onSubmit }: Props) {
  const [form, setForm] = useState({
    nickname: initial?.nickname ?? "",
    real_name: initial?.real_name ?? "",
    origin_description: initial?.origin_description ?? "",
    superpowers: initial?.superpowers ?? "",
    catch_phrase: initial?.catch_phrase ?? "",
    imageIds: (initial?.images ?? []).map((i) => i.id),
    images: initial?.images ?? [],
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className="superhero-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          nickname: form.nickname,
          real_name: form.real_name,
          origin_description: form.origin_description,
          superpowers: form.superpowers,
          catch_phrase: form.catch_phrase,
          imageIds: form.imageIds,
        });
      }}
    >
      <input
        className="superhero-input"
        placeholder="Nickname"
        value={form.nickname}
        onChange={(e) => set("nickname", e.target.value)}
        required
      />
      <input
        className="superhero-input"
        placeholder="Real name"
        value={form.real_name}
        onChange={(e) => set("real_name", e.target.value)}
        required
      />
      <textarea
        className="superhero-textarea"
        placeholder="Origin description"
        value={form.origin_description}
        onChange={(e) => set("origin_description", e.target.value)}
        required
      />
      <input
        className="superhero-input"
        placeholder="Superpowers (comma separated)"
        value={form.superpowers}
        onChange={(e) => set("superpowers", e.target.value)}
        required
      />
      <input
        className="superhero-input"
        placeholder="Catch phrase"
        value={form.catch_phrase}
        onChange={(e) => set("catch_phrase", e.target.value)}
        required
      />

      {/* Images */}
      <div className="superhero-images-section">
        <strong>Images</strong>
        <div className="superhero-images-list">
          {form.images.map((img) => (
            <div key={img.id} className="superhero-image-wrapper">
              <img src={img.url} alt="" className="superhero-form-image" />
              <button
                type="button"
                className="superhero-image-remove"
                onClick={() => {
                  set(
                    "images",
                    form.images.filter((i) => i.id !== img.id)
                  );
                  set(
                    "imageIds",
                    form.imageIds.filter((id) => id !== img.id)
                  );
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <ImageUploader
          onUploaded={(img) => {
            set("images", [...form.images, img as any]);
            set("imageIds", [...form.imageIds, img.id]);
          }}
        />
      </div>

      <button type="submit" className="superhero-form-submit">
        Save
      </button>
    </form>
  );
}
