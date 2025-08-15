import { useState } from "react";
import { uploadFile } from "../api/client";

export default function ImageUploader({
  onUploaded,
}: {
  onUploaded: (img: { id: string; url: string }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const img = await uploadFile(file);
      onUploaded(img);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="uploader-container">
      <label className="uploader-label">
        <div className="uploader-box">
          <p className="uploader-text">
            <span className="uploader-highlight">Click to upload</span>
          </p>
          <p className="uploader-subtext">PNG, JPG (max 5MB)</p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="uploader-input"
        />
      </label>

      {loading && <span className="uploader-loading">Uploading...</span>}

      {preview && !loading && (
        <img src={preview} alt="Preview" className="uploader-preview" />
      )}
    </div>
  );
}
