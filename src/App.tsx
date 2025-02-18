import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, User, Menu, X } from 'lucide-react';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Experiences from './pages/Experiences';
import TripDetails from './pages/TripDetails';
import Wishlist from './pages/Wishlist';
import Careers from './pages/Careers';
import Safety from './pages/Safety';
import Terms from './pages/Terms';
import { WishlistProvider } from './context/WishlistContext';
import { BookingForm } from './components/BookingForm';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const showHero = location.pathname === '/' || location.pathname === '/experiences';
  const experiencesRef = useRef<HTMLDivElement>(null);

  const scrollToExperiences = () => {
    experiencesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#800000] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <Link to="/contact" className="text-sm tracking-[0.15em] hover:text-gray-200 transition-colors duration-300 mb-2 sm:mb-0 font-light">
              CUSTOMER SUPPORT & ENQUIRIES
            </Link>
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
              <span className="text-sm tracking-[0.15em] font-light">AVAILABLE TODAY</span>
              <span className="font-light tracking-[0.2em] text-lg">11:00 - 16:00</span>
              <span className="font-light tracking-[0.2em] text-lg">+44 1923 268663</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#800000] text-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="group flex items-baseline mr-12 hover:text-gray-100 transition-colors duration-300"
              >
                <span className="text-5xl font-serif tracking-wide">P</span>
                <span className="text-3xl font-light tracking-[0.2em] ml-1">RINNY</span>
                <span className="text-lg font-extralight tracking-[0.15em] ml-3 border-l border-white/30 pl-3 pt-1">
                  EXPERIENCE
                </span>
                <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full mt-1 absolute bottom-0"></span>
              </Link>
              <nav className="hidden md:flex space-x-10">
                <Link 
                  to="/experiences" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
                >
                  <span>EXPERIENCES</span>
                  <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
                </Link>
                <Link 
                  to="/about" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
                >
                  <span>ABOUT</span>
                  <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
                </Link>
                <Link 
                  to="/faqs" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
                >
                  <span>FAQs</span>
                  <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
                >
                  <span>CONTACT</span>
                  <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
                </Link>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/wishlist" 
                className="flex items-center text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
              >
                <Heart className="w-5 h-5 mr-2" />
                <span>WISHLIST</span>
                <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
              </Link>
              <button 
                className="flex items-center text-white font-light tracking-[0.15em] hover:text-gray-200 relative group"
              >
                <User className="w-5 h-5 mr-2" />
                <span>MY EXPERIENCE</span>
                <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full absolute bottom-0"></span>
              </button>
            </div>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#600000] border-t border-[#700000]">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/experiences" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  EXPERIENCES
                </Link>
                <Link 
                  to="/about" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  ABOUT
                </Link>
                <Link 
                  to="/faqs" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  FAQs
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  CONTACT
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  WISHLIST
                </Link>
                <button 
                  className="flex items-center text-white font-light tracking-[0.15em] hover:text-gray-200"
                >
                  <User className="w-5 h-5 mr-2" />
                  MY EXPERIENCE
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Only shown on home and experiences pages */}
      {showHero && (
        <div className="relative h-[600px]">
          <img 
            src="https://images.unsplash.com/photo-1544939514-aa98d908bc47"
            alt="Museum interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] mb-6 text-center">Create Lasting Memories</h1>
            <p className="text-xl md:text-2xl font-light tracking-wider mb-8 text-center max-w-2xl">Discover amazing experiences perfect for the whole family</p>
            <button 
              onClick={scrollToExperiences}
              className="bg-[#800000] text-white px-12 py-4 rounded-none text-xl font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300"
            >
              EXPLORE
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={experiencesRef}>
        <Routes>
          <Route path="/" element={<Experiences />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:id" element={<TripDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-[#800000] text-white py-12 sm:py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-light tracking-[0.15em] mb-6">PRINNY EXPERIENCE</h3>
              <p className="text-gray-200 font-light tracking-wide">Discover and book unique experiences worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-light tracking-[0.15em] mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-gray-200">
                <li>
                  <Link to="/experiences" className="font-light tracking-wide hover:text-white">
                    All Experiences
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" className="font-light tracking-wide hover:text-white">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light tracking-[0.15em] mb-6">COMPANY</h4>
              <ul className="space-y-4 text-gray-200">
                <li>
                  <Link to="/about" className="font-light tracking-wide hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-light tracking-wide hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="font-light tracking-wide hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light tracking-[0.15em] mb-6">SUPPORT</h4>
              <ul className="space-y-4 text-gray-200">
                <li>
                  <Link to="/faqs" className="font-light tracking-wide hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="font-light tracking-wide hover:text-white">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="font-light tracking-wide hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </Router>
  );
}

export default App;