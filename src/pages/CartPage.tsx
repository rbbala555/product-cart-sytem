import { useCart } from "../context/CartContext";

export function CartPage() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">
        Your Cart
      </h2>

      {state.items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          🛒 Your cart is empty.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.images[0] || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <h4 className="font-semibold text-xl">{item.title}</h4>
                  <p className="text-gray-600 mt-1">
                    Price: <span className="font-medium">${item.price}</span>
                  </p>
                  <p className="text-gray-500 mt-1">
                    Stock: <span className="font-medium">{item.stock}</span>{" "}
                    available
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    {/* Decrement Button */}
                    <button
                      className={`bg-gray-200 ${
                        item.quantity <= 1
                          ? ""
                          : "hover:bg-gray-300 cursor-pointer"
                      } text-xl px-2 rounded `}
                      onClick={() =>
                        dispatch({
                          type: "DECREMENT",
                          productId: item.id,
                        })
                      }
                      disabled={item.quantity <= 1} // Disable if quantity is 1
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    {/* Increment Button */}
                    <button
                      className={`bg-gray-200 ${
                        item.quantity >= item.stock
                          ? ""
                          : "hover:bg-gray-300 cursor-pointer"
                      } text-xl px-2 rounded`}
                      onClick={() =>
                        dispatch({
                          type: "INCREMENT",
                          productId: item.id,
                        })
                      }
                      disabled={item.quantity >= item.stock} // Disable if quantity is equal to stock
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="mt-2 text-gray-700">
                    Subtotal:{" "}
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  className="mt-4 sm:mt-0 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition text-sm"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", productId: item.id })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mt-10 text-2xl font-bold text-right">
            Total: <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
