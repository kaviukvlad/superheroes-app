import { api } from "./client";
import type { Superhero, Paginated } from "../types/superhero";

export const listSuperheroes = (page = 1, limit = 5) =>
  api<Paginated<Superhero>>(`/superheroes?page=${page}&limit=${limit}`);

export const getSuperhero = (id: string) =>
  api<Superhero>(`/superheroes/${id}`);

export const createSuperhero = (
  data: Partial<Superhero> & { imageIds?: string[] }
) =>
  api<Superhero>(`/superheroes`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSuperhero = (
  id: string,
  data: Partial<Superhero> & { imageIds?: string[] }
) =>
  api<Superhero>(`/superheroes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteSuperhero = (id: string) =>
  api<void>(`/superheroes/${id}`, { method: "DELETE" });
