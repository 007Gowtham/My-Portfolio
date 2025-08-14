import { useState, useEffect, useCallback } from "react";

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  request: (
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: unknown
  ) => Promise<void>;
  refetch: () => void;
}

interface UseApiOptions {
  immediate?: boolean;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const {
    immediate = true,
    headers = {},
    method = "GET",
    body,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (
      fetchMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = method,
      fetchBody?: unknown,
      rethrowOnError: boolean = false
    ) => {
      try {
        setLoading(true);
        setError(null);

        const requestBody = fetchBody !== undefined ? fetchBody : body;
        const isFormData =
          typeof FormData !== "undefined" && requestBody instanceof FormData;

        const response = await fetch(url, {
          method: fetchMethod,
          headers: isFormData
            ? { ...headers }
            : {
              "Content-Type": "application/json",
              ...headers,
            },
          body:
            fetchMethod !== "GET" && fetchMethod !== "DELETE"
              ? isFormData
                ? (requestBody as BodyInit)
                : JSON.stringify(requestBody ?? body)
              : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Only parse JSON if there's a body
        const text = await response.text();
        const result = text ? JSON.parse(text) : null;
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        if (rethrowOnError) {
          throw err instanceof Error ? err : new Error(String(err));
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, headers]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    request: async (method, body) => fetchData(method, body, true),
    refetch: () => fetchData(method, body),
  };
}

export default useApi;
