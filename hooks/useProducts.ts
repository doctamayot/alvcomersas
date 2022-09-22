import useSWR, { SWRConfiguration } from "swr";
import { IProducto } from "../interfaces/productos";

// const fetcher = (...args: [key: string]) =>
//fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProducto[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
