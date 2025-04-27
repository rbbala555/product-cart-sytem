// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { Product } from "../context/CartContext";

export const useProducts = (search: string, sort: string, page: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const skip = page * 10;
    let url = `https://dummyjson.com`;

    if (search) {
      url += `/products/search?q=${search}`;
    } else if (sort) {
      url += `/products?limit=${skip || 10}&sortBy=price&order=${sort}`;
    } else {
      url += `/products?limit=10&skip=${skip}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (search) {
          let localSort: any = [...data.products];
          if (sort) {
            if (sort === "asc") {
              localSort = [...localSort].sort((a, b) => a.price - b.price);
            }
            if (sort === "desc") {
              localSort = [...localSort].sort((a, b) => b.price - a.price);
            }
            setProducts([...localSort]);
          }
          setProducts([...localSort]);
        } else if (sort) {
          setProducts([...data.products]);
        } else {
          setProducts([...products, ...data.products]);
        }
        setLoading(false);
      });
  }, [search, sort, page]); // Re-fetch when search, sort, or page changes

  return { products, loading };
};
