// src/pages/Home.tsx
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string>(""); // "asc" or "desc"
  const [page, setPage] = useState(0);
  const { products, loading } = useProducts(search, sort, page);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSort(newSort); // Update sort order
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); // Update search term
            setPage(0); // Reset pagination to first page when search changes
          }}
          className="border px-2 py-1 rounded w-full sm:w-1/3"
        />
        <select
          onChange={handleSortChange}
          value={sort}
          className="border px-2 py-1 rounded w-full sm:w-1/3"
        >
          <option value="">Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p, index) => (
          <ProductCard key={`${p.id}-${index}`} product={p} />
        ))}
      </div>

      {!search && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-300 hover:text-blue-700 text-white rounded cursor-pointer"
          onClick={handleLoadMore} // Increase page number for pagination
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
