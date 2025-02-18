import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { Toast } from '../components/Toast';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
    setToastMessage('Experience removed from wishlist');
    setShowToast(true);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link 
            to="/experiences" 
            className="inline-flex items-center text-[#800000] hover:text-[#600000] font-light tracking-wide"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Experiences
          </Link>
        </div>
        <h1 className="text-4xl font-light tracking-[0.15em] mb-12">MY WISHLIST</h1>
        <div className="bg-white shadow-md p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-light tracking-[0.1em] mb-6">Your wishlist is empty</h2>
          <p className="text-gray-600 font-light tracking-wide mb-8">
            Start adding experiences to your wishlist by clicking the heart icon on any experience that interests you.
          </p>
          <Link
            to="/experiences"
            className="inline-block bg-[#800000] text-white px-12 py-4 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300"
          >
            BROWSE EXPERIENCES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <div className="flex items-center mb-8">
        <Link 
          to="/experiences" 
          className="inline-flex items-center text-[#800000] hover:text-[#600000] font-light tracking-wide"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Experiences
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-12">
        <h1 className="text-4xl font-light tracking-[0.15em] mb-4 md:mb-0">MY WISHLIST</h1>
        <p className="text-lg font-light tracking-wide text-gray-600">
          {wishlist.length} Experience{wishlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {wishlist.map((experience) => (
          <div 
            key={experience.id} 
            className="bg-white shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl group"
          >
            <div className="relative h-56">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                onClick={() => handleRemoveFromWishlist(experience.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <Heart className="w-5 h-5 text-[#800000] fill-current" />
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
                  <div className="text-[#800000] font-light tracking-wide text-lg">
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
    </div>
  );
}

export default Wishlist;