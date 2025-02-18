import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BookingForm } from '../BookingForm';
import { BrowserRouter } from 'react-router-dom';

// Mock Formspree fetch call
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Setup default successful response
mockFetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('BookingForm', () => {
  const defaultProps = {
    experienceId: 1,
    experienceTitle: 'Test Tour',
    price: 18
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  test('renders form fields', () => {
    render(
      <BrowserRouter>
        <BookingForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText('FIRST NAME')).toBeInTheDocument();
    expect(screen.getByText('LAST NAME')).toBeInTheDocument();
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument();
  });

  test('calculates total price based on number of travelers', () => {
    render(
      <BrowserRouter>
        <BookingForm {...defaultProps} />
      </BrowserRouter>
    );

    const travelersSelect = screen.getByRole('combobox', { name: /NUMBER OF TRAVELERS/i });
    fireEvent.change(travelersSelect, { target: { value: '2' } });
    
    expect(screen.getByText('£36')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(
      <BrowserRouter>
        <BookingForm {...defaultProps} />
      </BrowserRouter>
    );

    // Fill out form
    const form = screen.getByRole('form');
    const inputs = form.querySelectorAll('input, select');
    
    await act(async () => {
      inputs.forEach(input => {
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
          fireEvent.change(input, {
            target: {
              name: input.name,
              value: input.name === 'departureDate' ? '2024-12-25' :
                     input.name === 'travelers' ? '2' :
                     input.name === 'email' ? 'test@example.com' : 'Test'
            }
          });
        }
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(form);
    });

    // Verify fetch was called
    expect(mockFetch).toHaveBeenCalled();

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('BOOKING CONFIRMED')).toBeInTheDocument();
    });
  }, 10000);

  test('shows error message on submission failure', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ success: false }),
      })
    );

    render(
      <BrowserRouter>
        <BookingForm {...defaultProps} />
      </BrowserRouter>
    );

    // Fill out form
    const form = screen.getByRole('form');
    const inputs = form.querySelectorAll('input, select');
    
    await act(async () => {
      inputs.forEach(input => {
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
          fireEvent.change(input, {
            target: {
              name: input.name,
              value: input.name === 'departureDate' ? '2024-12-25' :
                     input.name === 'travelers' ? '2' :
                     input.name === 'email' ? 'test@example.com' : 'Test'
            }
          });
        }
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(form);
    });

    // Verify fetch was called
    expect(mockFetch).toHaveBeenCalled();

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to submit booking. Please try again.')).toBeInTheDocument();
    });
  }, 10000);
}); 