import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import { getWishlist, toggleWishlist } from "../services/wishlistService";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist([]);

      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();

      setWishlist(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (productId) => {
    const data = await toggleWishlist(productId);

    await fetchWishlist();

    return data;
  };

  const isWishlisted = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggle,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
