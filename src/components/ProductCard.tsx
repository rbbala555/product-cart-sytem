// src/components/ProductCard.tsx
import { Product } from "../context/CartContext";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useCart();
  const item = state.items.find((i) => i.id === product.id);

  return (
    <div className="border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-gray-700 font-semibold">${product.price}</p>
      <p className="text-sm text-green-700">In Stock: {product.stock}</p>

      {item ? (
        <div className="mt-2 flex gap-2 items-center">
          <button
            onClick={() =>
              dispatch({ type: "DECREMENT", productId: product.id })
            }
            className="px-2 py-1 bg-red-500 text-white hover:bg-red-400 rounded cursor-pointer"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() =>
              dispatch({ type: "INCREMENT", productId: product.id })
            }
            disabled={item.quantity >= product.stock}
            className="px-2 py-1 bg-green-500 hover:bg-green-300 text-white rounded cursor-pointer"
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="mt-2 bg-blue-600 hover:bg-blue-300 hover:text-blue-700 text-white px-3 py-1 rounded cursor-pointer"
          disabled={product.stock === 0}
          onClick={() => dispatch({ type: "ADD_TO_CART", product })}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
