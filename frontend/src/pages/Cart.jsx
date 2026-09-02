import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/cart/CartItem";

import { getCart, updateCart, removeFromCart } from "../services/cartService";

import { placeOrder } from "../services/orderService";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const increaseQuantity = async (item) => {
    await updateCart(item.product._id, item.quantity + 1);

    fetchCart();
  };
  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) return;

    await updateCart(item.product._id, item.quantity - 1);

    fetchCart();
  };
  const removeItem = async (item) => {
    await removeFromCart(item.product._id);

    fetchCart();
  };
  const handlePlaceOrder = async () => {
    try {
      await placeOrder();

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }
  const totalAmount = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#2E2016]">Shopping Cart</h1>

      {cart.items.map((item) => (
        <CartItem
          key={item.product._id}
          item={item}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
        />
      ))}

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-[#A8572E] text-white py-3 rounded-lg hover:bg-[#8E4525] transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
