import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExperienceList } from '../ExperienceList';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from '../../context/WishlistContext';

// Mock the images
jest.mock('../../assets/images/historical-watford.jpg', () => 'historical-watford.jpg');
jest.mock('../../assets/images/wartime-watford.jpg', () => 'wartime-watford.jpg');
jest.mock('../../assets/images/harry-potter-tour.jpg', () => 'harry-potter-tour.jpg');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderExperienceList = () => {
  render(
    <BrowserRouter>
      <WishlistProvider>
        <ExperienceList />
      </WishlistProvider>
    </BrowserRouter>
  );
};

describe('ExperienceList', () => {
  beforeEach(() => {
    // Clear any mocks and DOM before each test
    jest.clearAllMocks();
  });

  test('renders experience cards', async () => {
    renderExperienceList();
    
    const cards = screen.getAllByTestId('experience-card');
    expect(cards).toHaveLength(3);
    expect(screen.getByText('Historical Watford Discovery Tour')).toBeInTheDocument();
  });

  test('filters experiences by search', async () => {
    renderExperienceList();
    
    const searchInput = screen.getByPlaceholderText('Search experiences...');
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
    
    await waitFor(() => {
      const cards = screen.getAllByTestId('experience-card');
      expect(cards).toHaveLength(1);
      expect(screen.getByText('Harry Potter Studio Tour + Watford Highlights')).toBeInTheDocument();
    });
  });

  test('filters experiences by price range', async () => {
    renderExperienceList();
    
    const priceRangeInputs = screen.getAllByRole('slider');
    const priceRange = priceRangeInputs[1];
    fireEvent.change(priceRange, { target: { value: '50' } });
    
    await waitFor(() => {
      const cards = screen.getAllByTestId('experience-card');
      expect(cards).toHaveLength(2);
      expect(screen.queryByText('Harry Potter Studio Tour + Watford Highlights')).not.toBeInTheDocument();
    });
  });

  test('sorts experiences by price', async () => {
    renderExperienceList();
    
    // Use a more specific selector for the sort dropdown
    const sortSelect = screen.getByRole('combobox', { 
      name: /sort by/i 
    });
    fireEvent.change(sortSelect, { target: { value: 'price-high' } });
    
    await waitFor(() => {
      const prices = screen.getAllByTestId('experience-price');
      expect(prices[0].textContent).toContain('£104');
    });
  });
}); 