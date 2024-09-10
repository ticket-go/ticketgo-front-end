interface CacheOptions {
  revalidateTime?: number | false;
  longerRevalidateTime?: number;
  cacheStrategy: "no-store" | "force-cache";
}

export const revalidateTime: CacheOptions["revalidateTime"] = 600;
export const longerRevalidateTime: CacheOptions["longerRevalidateTime"] = 600;
export const cacheStrategy: CacheOptions["cacheStrategy"] = "no-store";
