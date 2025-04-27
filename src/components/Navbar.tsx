// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { state } = useCart();
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap justify-between">
      <Link to="/" className="font-bold text-xl w-full sm:w-auto">
        React Shop
      </Link>
      <div className="flex items-center">
        <Link to="/cart" className="hover:underline mt-2 sm:mt-0">
          Cart ({count})
        </Link>
      </div>
    </nav>
  );
}
