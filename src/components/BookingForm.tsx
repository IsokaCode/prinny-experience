import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BookingFormProps {
  experienceId: number;
  experienceTitle: string;
  price: number;
  onClose?: () => void;
  isModal?: boolean;
}

export function BookingForm({ experienceId, experienceTitle, price, onClose, isModal = false }: BookingFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departureDate: '',
    travelers: '1',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/mrbeojya', {  // Replace with your Formspree form ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Experience: experienceTitle,
          "First Name": formData.firstName,
          "Last Name": formData.lastName,
          Email: formData.email,
          Phone: formData.phone,
          "Departure Date": formData.departureDate,
          "Number of Travelers": formData.travelers,
          "Special Requirements": formData.specialRequirements,
          "Total Amount": `£${price * parseInt(formData.travelers)}`
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          if (isModal && onClose) {
            onClose();
          } else {
            navigate('/experiences');
          }
        }, 2000);
      } else {
        setError('Failed to submit booking. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-light tracking-[0.15em] mb-4">BOOKING CONFIRMED</h2>
        <p className="font-light tracking-wide text-gray-600 mb-8">
          Thank you for your booking. We will contact you shortly with further details.
        </p>
      </div>
    );
  }

  return (
    <div className={`${isModal ? '' : 'container mx-auto px-4 py-12'}`}>
      {!isModal && (
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-[#800000] hover:text-[#600000] font-light tracking-[0.15em] mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          BACK
        </button>
      )}

      <div className={`max-w-2xl ${isModal ? '' : 'mx-auto'}`}>
        <h2 className="text-2xl font-light tracking-[0.15em] mb-8">
          {isModal ? 'COMPLETE YOUR BOOKING' : 'BOOKING DETAILS'}
        </h2>

        <div className="bg-white shadow-md p-8 mb-8">
          <h3 className="font-light tracking-[0.1em] mb-4">{experienceTitle}</h3>
          <p className="font-light tracking-wide text-gray-600">
            From £{price} per person
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" role="form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                FIRST NAME
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                aria-label="FIRST NAME"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                LAST NAME
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                aria-label="LAST NAME"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                aria-label="EMAIL"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                aria-label="PHONE NUMBER"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                DEPARTURE DATE
              </label>
              <input
                type="date"
                name="departureDate"
                required
                value={formData.departureDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                aria-label="DEPARTURE DATE"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                NUMBER OF TRAVELERS
              </label>
              <select
                name="travelers"
                required
                value={formData.travelers}
                onChange={handleChange}
                aria-label="NUMBER OF TRAVELERS"
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
              SPECIAL REQUIREMENTS
            </label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows={4}
              aria-label="SPECIAL REQUIREMENTS"
              className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              placeholder="Please let us know if you have any special requirements or requests"
            ></textarea>
          </div>

          <div className="border-t pt-8">
            <div className="flex justify-between items-center mb-8">
              <span className="font-light tracking-[0.1em]">TOTAL AMOUNT</span>
              <span className="text-2xl font-light tracking-[0.1em] text-[#800000]">
                £{price * parseInt(formData.travelers)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#800000] text-white px-8 py-4 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'PROCESSING...' : 'CONFIRM BOOKING'}
            </button>

            {error && (
              <p className="text-red-600 mt-4 text-center font-light">{error}</p>
            )}

            <p className="text-sm font-light tracking-wide text-gray-500 text-center mt-4">
              No payment required to make a booking
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}