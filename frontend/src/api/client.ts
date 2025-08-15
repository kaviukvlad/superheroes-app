const base = import.meta.env.VITE_API_URL;

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${url}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${base}/images/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ id: string; url: string }>;
}
