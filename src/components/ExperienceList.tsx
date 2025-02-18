import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, Calendar, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Toast } from './Toast';
import historicalWatford from '../assets/images/historical-watford.jpg';
import wartimeWatford from '../assets/images/wartime-watford.jpg';
import harryPotterTour from '../assets/images/harry-potter-tour.jpg';

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

export function ExperienceList() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [durationRange, setDurationRange] = useState([4, 8]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Historical Watford Discovery Tour",
      location: "Watford",
      duration: "4 hours",
      durationHours: 4,
      price: 18,
      image: historicalWatford,
      rating: 4.5,
      reviews: 15,
      category: "Discovery",
      code: "ESS"
    },
    {
      id: 2,
      title: "Wartime Watford Tour",
      location: "Watford",
      duration: "4 hours",
      durationHours: 4,
      price: 18,
      image: wartimeWatford,
      rating: 5,
      reviews: 1,
      category: "Discovery",
      code: "DKS"
    },
    {
      id: 3,
      title: "Harry Potter Studio Tour + Watford Highlights",
      location: "Watford",
      duration: "8 hours",
      durationHours: 8,
      price: 104,
      image: harryPotterTour,
      rating: 4.9,
      reviews: 49,
      category: "Discovery",
      code: "ATA",
      isNew: true,
      isPremium: true
    }
  ];

  const months = [
    { name: "February 2025", count: 65 },
    { name: "March 2025", count: 129 },
    { name: "April 2025", count: 133 },
    { name: "May 2025", count: 177 },
    { name: "June 2025", count: 140 }
  ];

  const handleWishlistToggle = (experience: Experience) => {
    if (isInWishlist(experience.id)) {
      removeFromWishlist(experience.id);
      setToastMessage('Removed from wishlist!');
    } else {
      addToWishlist(experience);
      setToastMessage('Saved!');
    }
    setShowToast(true);
  };

  const destinations = [...new Set(experiences.map(exp => exp.location))];

  const filteredExperiences = experiences.filter(exp => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = exp.title.toLowerCase().includes(searchLower) ||
                         exp.location.toLowerCase().includes(searchLower);
    if (!matchesSearch) return false;
    if (selectedDestination && exp.location !== selectedDestination) return false;
    if (exp.durationHours < durationRange[0] || exp.durationHours > durationRange[1]) return false;
    if (exp.price < priceRange[0] || exp.price > priceRange[1]) return false;
    if (selectedMonth) {
      return true;
    }
    return true;
  });

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="lg:flex gap-8">
        {/* Mobile Filter Toggle */}
        <button
          className="lg:hidden w-full mb-4 flex items-center justify-center bg-[#800000] text-white px-4 py-2 rounded-none"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="font-light tracking-[0.15em]">
            {isFilterOpen ? 'HIDE FILTERS' : 'SHOW FILTERS'}
          </span>
        </button>

        {/* Filters Sidebar */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 lg:flex-shrink-0 mb-8 lg:mb-0`}>
          <div className="bg-white p-8 shadow-md">
            <h2 className="text-2xl font-light tracking-[0.15em] mb-8">FILTERS</h2>

            {/* Search */}
            <div className="mb-8">
              <h3 className="text-lg font-light tracking-[0.1em] mb-4">SEARCH EXPERIENCES</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border rounded-none pl-10 font-light tracking-wide"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Destination Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-light tracking-[0.1em] mb-4">DESTINATION</h3>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
              >
                <option value="">All Destinations</option>
                {destinations.map(destination => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-light tracking-[0.1em] mb-4">TRAVEL DATES</h3>
              <button className="flex items-center space-x-2 text-gray-600 mb-4 font-light tracking-wide">
                <Calendar className="w-5 h-5" />
                <span>Select a date</span>
              </button>
              <div className="space-y-3">
                {months.map(month => (
                  <label key={month.name} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="month"
                      value={month.name}
                      checked={selectedMonth === month.name}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="text-[#800000]"
                    />
                    <span className="font-light tracking-wide">{month.name}</span>
                    <span className="text-gray-500 font-light">({month.count})</span>
                  </label>
                ))}
              </div>
              <button 
                className="text-[#800000] mt-4 font-light tracking-wide hover:underline"
                onClick={() => setSelectedMonth(null)}
              >
                Clear date selection
              </button>
            </div>

            {/* Duration */}
            <div className="mb-8">
              <h3 className="text-lg font-light tracking-[0.1em] mb-4">DURATION</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="4"
                  max="8"
                  value={durationRange[1]}
                  onChange={(e) => setDurationRange([4, parseInt(e.target.value)])}
                  className="w-full accent-[#800000]"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-3 font-light tracking-wide">
                  <span>{durationRange[0]} hours</span>
                  <span>{durationRange[1]} hours</span>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-lg font-light tracking-[0.1em] mb-4">PRICE RANGE</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#800000]"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-3 font-light tracking-wide">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDestination('');
                setSelectedMonth(null);
                setDurationRange([4, 8]);
                setPriceRange([0, 500]);
              }}
              className="w-full px-6 py-3 text-[#800000] border border-[#800000] hover:bg-[#800000] hover:text-white transition-colors duration-300 font-light tracking-[0.15em]"
            >
              RESET ALL FILTERS
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-light tracking-[0.15em] mb-4 sm:mb-0">
              {sortedExperiences.length} EXPERIENCE{sortedExperiences.length !== 1 ? 'S' : ''} FOUND
            </h2>
            <select 
              className="w-full sm:w-auto border rounded-none px-4 py-2 bg-white font-light tracking-wide"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
              data-testid="sort-select"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {sortedExperiences.length === 0 ? (
            <div className="bg-white shadow-md p-8 text-center">
              <h3 className="text-xl font-light tracking-[0.1em] mb-4">No experiences found</h3>
              <p className="text-gray-600 font-light tracking-wide mb-6">
                Try adjusting your filters to find more experiences.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDestination('');
                  setSelectedMonth(null);
                  setDurationRange([4, 8]);
                  setPriceRange([0, 500]);
                }}
                className="text-[#800000] hover:underline font-light tracking-wide"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedExperiences.map((experience) => (
                <div 
                  key={experience.id} 
                  data-testid="experience-card"
                  className="bg-white shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                    {(experience.isNew || experience.isPremium) && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {experience.isNew && (
                          <span className="bg-[#2C5773] text-white px-3 py-1 text-sm font-light tracking-[0.1em]">NEW</span>
                        )}
                        {experience.isPremium && (
                          <span className="bg-[#6B9080] text-white px-3 py-1 text-sm font-light tracking-[0.1em]">PREMIUM</span>
                        )}
                      </div>
                    )}
                    <button 
                      onClick={() => handleWishlistToggle(experience)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Heart 
                        className={`w-5 h-5 text-[#800000] ${isInWishlist(experience.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-light tracking-wide">{experience.location}</span>
                    </div>
                    <h3 className="text-xl font-light tracking-wide text-gray-800 mb-3">{experience.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="font-light tracking-wide">{experience.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(experience.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 font-light tracking-wide">
                          {experience.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-500 text-sm font-light tracking-[0.1em]">{experience.code}</span>
                        <div className="text-[#800000] font-light tracking-wide text-lg" data-testid="experience-price">
                          From {formatPrice(experience.price)}
                        </div>
                      </div>
                      <Link 
                        to={`/experiences/${experience.id}`}
                        className="bg-[#800000] text-white px-6 py-2 hover:bg-[#600000] transition-colors duration-300 font-light tracking-[0.1em]"
                      >
                        VIEW TRIP
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}