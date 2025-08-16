// useApiCRUD.ts
import { useState } from "react";
import { ApiService, ApiError } from "../api/ApiService";

export function useApiCRUD<T>(service: ApiService<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getAll();
      setItems(data);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<T, "id"> | FormData) => {
    try {
      const newItem = await service.create(item);
      setItems((prev) => [...prev, newItem]);
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    }
  };

  const updateItem = async (id: number, item: Partial<T> | FormData) => {
    try {
      const updated = await service.update(id, item);
      setItems((prev) => prev.map((i: any) => (i.id === id ? updated : i)));
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    }
  };
  const patchItem = async (id: number, item: Partial<T> | FormData) => {
    try {
      const updated = await service.patch(id, item);
      setItems((prev) => prev.map((i: any) => (i.id === id ? updated : i)));
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await service.delete(id);
      setItems((prev) => prev.filter((i: any) => i.id !== id));
    } catch (err) {
      setError((err as ApiError).message);
      throw err;
    }
  };

  return { items, loading, error, fetchAll, createItem, updateItem, patchItem, deleteItem };
}
