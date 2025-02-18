import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistProvider, useWishlist } from '../WishlistContext';
import { act } from 'react-dom/test-utils';

// Test component that uses the wishlist context
const TestComponent = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const testExperience = {
    id: 1,
    title: "Test Tour",
    location: "Watford",
    duration: "4 hours",
    durationHours: 4,
    price: 18,
    image: "test.jpg",
    rating: 4.5,
    reviews: 15,
    category: "Discovery",
    code: "TEST"
  };

  return (
    <div>
      <div data-testid="wishlist-count">{wishlist.length}</div>
      <button onClick={() => addToWishlist(testExperience)}>Add to Wishlist</button>
      <button onClick={() => removeFromWishlist(1)}>Remove from Wishlist</button>
    </div>
  );
};

describe('WishlistContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds and removes items from wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );
    
    const wishlistCount = screen.getByTestId('wishlist-count');
    expect(wishlistCount.textContent).toBe('0');
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    expect(wishlistCount.textContent).toBe('1');
    
    fireEvent.click(screen.getByText('Remove from Wishlist'));
    expect(wishlistCount.textContent).toBe('0');
  });

  test('persists wishlist to localStorage', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    );
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    
    // Check localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    expect(savedWishlist.length).toBe(1);
  });
}); 