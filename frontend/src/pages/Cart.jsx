import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";

import { getCart, updateCart, removeFromCart } from "../services/cartService";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.map((item) => (
        <CartItem
          key={item.product._id}
          item={item}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  );
};

export default Cart;
