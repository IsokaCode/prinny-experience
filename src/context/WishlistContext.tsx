import React, { createContext, useContext, useState, useEffect } from 'react';

interface Experience {
  id: number;
  title: string;
  location: string;
  duration: string;
  durationHours: number;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  code?: string;
  isNew?: boolean;
  isPremium?: boolean;
}

interface WishlistContextType {
  wishlist: Experience[];
  addToWishlist: (experience: Experience) => void;
  removeFromWishlist: (experienceId: number) => void;
  isInWishlist: (experienceId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Experience[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (experience: Experience) => {
    setWishlist(prev => [...prev, experience]);
  };

  const removeFromWishlist = (experienceId: number) => {
    setWishlist(prev => prev.filter(exp => exp.id !== experienceId));
  };

  const isInWishlist = (experienceId: number) => {
    return wishlist.some(exp => exp.id === experienceId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}