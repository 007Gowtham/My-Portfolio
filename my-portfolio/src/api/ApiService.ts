// ApiService.ts
export interface ApiError {
    message: string;
    status?: number;
}

export class ApiService<T> {
    private baseUrl: string;
    constructor(baseUrl: string) {
        // Normalize to no trailing slash
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }

    private async request<R>(url: string, options?: RequestInit): Promise<R> {
        const res = await fetch(url, options);
        const raw = await res.text();
        if (!res.ok) {
            let message = `Error ${res.status}`;
            try {
                const parsed = raw ? JSON.parse(raw) : null;
                message = parsed ? JSON.stringify(parsed) : message;

            } catch {
                message = raw || message;
            }
            throw { message, status: res.status } as ApiError;
        }
        return (raw ? JSON.parse(raw) : null) as R;
    }

    getAll(): Promise<T[]> {
        return this.request<T[]>(`${this.baseUrl}/`);
    }

    create(data: Omit<T, "id"> | FormData): Promise<T> {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return this.request<T>(`${this.baseUrl}/`, {
            method: "POST",
            headers: isForm ? undefined : { "Content-Type": "application/json" },
            body: isForm ? (data as BodyInit) : JSON.stringify(data),
        });
    }

    update(id: number, data: Partial<T> | FormData): Promise<T> {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return this.request<T>(`${this.baseUrl}/${id}/`, {
            method: "PUT",
            headers: isForm ? undefined : { "Content-Type": "application/json" },
            body: isForm ? (data as BodyInit) : JSON.stringify(data),
        });
    }
    patch(id: number, data: Partial<T> | FormData): Promise<T> {
        const isForm = typeof FormData !== "undefined" && data instanceof FormData;
        return this.request<T>(`${this.baseUrl}/${id}/`, {
            method: "PATCH",
            headers: isForm ? undefined : { "Content-Type": "application/json" },
            body: isForm ? (data as BodyInit) : JSON.stringify(data),
        });
    }

    delete(id: number): Promise<void> {
        return this.request<void>(`${this.baseUrl}/${id}/`, { method: "DELETE" });
    }
}
