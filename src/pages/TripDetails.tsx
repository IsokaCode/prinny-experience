import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Star, Heart, Share2, Shield, ArrowLeft, ThumbsUp } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { Toast } from '../components/Toast';
import { ShareDialog } from '../components/ShareDialog';
import { BookingForm } from '../components/BookingForm';
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

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  userImage: string;
  tripDate: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    userId: "user1",
    userName: "Sarah Johnson",
    rating: 5,
    date: "2024-02-15",
    title: "Amazing experience!",
    content: "This trip exceeded all my expectations. The guides were knowledgeable and friendly, the accommodations were comfortable, and the itinerary was perfectly balanced. I particularly enjoyed the local cultural experiences and the stunning views. Would highly recommend!",
    helpful: 12,
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tripDate: "January 2024"
  },
  {
    id: 2,
    userId: "user2",
    userName: "Michael Chen",
    rating: 4,
    date: "2024-02-01",
    title: "Great trip with minor hiccups",
    content: "Overall, a wonderful experience. The locations were breathtaking and the activities were well-planned. The only reason for 4 stars instead of 5 was some confusion with the local transport arrangements. However, the tour guide quickly resolved any issues.",
    helpful: 8,
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    tripDate: "December 2023"
  },
  {
    id: 3,
    userId: "user3",
    userName: "Emma Wilson",
    rating: 5,
    date: "2024-01-15",
    title: "Unforgettable adventure",
    content: "This trip was absolutely perfect from start to finish. The attention to detail was impressive, and every day brought new and exciting experiences. The local guides were exceptional, providing deep insights into the culture and history. The food was amazing too!",
    helpful: 15,
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    tripDate: "November 2023"
  }
];

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
    code: "DKS",
    isNew: true,
    isPremium: true
  },
  {
    id: 3,
    title: "Harry Potter Studio Tour + Watford Highlights",
    location: "Watford",
    duration: "8 hours ",
    durationHours: 8,
    price: 104,
    image: harryPotterTour,
    rating: 4.9,
    reviews: 49,
    category: "Discovery",
    code: "ATA"
  }
];

function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'recent' | 'helpful'>('recent');
  const [helpfulReviews, setHelpfulReviews] = React.useState<number[]>([]);
  const [reviews, setReviews] = React.useState(mockReviews);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const experience = experiences.find(exp => exp.id === Number(id));

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

  const handleHelpfulClick = (reviewId: number) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(prev => prev.filter(id => id !== reviewId));
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful - 1 }
          : review
      ));
      setToastMessage('Helpful vote removed');
    } else {
      setHelpfulReviews(prev => [...prev, reviewId]);
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      ));
      setToastMessage('Marked as helpful');
    }
    setShowToast(true);
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-light tracking-[0.2em] mb-6">JOURNEY NOT FOUND</h1>
        <p className="font-light tracking-wide text-gray-600 mb-8">
          We could not locate the experience you're looking for.
        </p>
        <Link 
          to="/experiences" 
          className="inline-flex items-center text-[#800000] hover:text-[#600000] font-light tracking-[0.15em] group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          DISCOVER OUR EXPERIENCES
        </Link>
      </div>
    );
  }

  if (showBookingForm) {
    return (
      <BookingForm
        experienceId={experience.id}
        experienceTitle={experience.title}
        price={experience.price}
      />
    );
  }

  return (
    <div className="bg-white">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <ShareDialog
        title={experience.title}
        url={window.location.href}
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
      />
      
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-48"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center text-white mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-light tracking-[0.15em]">{experience.location}</span>
              </div>
              <h1 className="text-4xl font-light tracking-[0.15em] text-white mb-6">{experience.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-light tracking-wide">{experience.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span className="font-light tracking-wide">{experience.rating} ({experience.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  <span className="font-light tracking-wide">Flexible Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Book Section */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
            <Link 
              to="/experiences" 
              className="inline-flex items-center text-[#800000] hover:text-[#600000] font-light tracking-[0.15em] mb-4 md:mb-0"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK TO EXPERIENCES
            </Link>
            
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500 font-light tracking-wide">From</span>
                <span className="text-2xl font-light tracking-[0.1em] text-[#800000]">£{experience.price}</span>
                <span className="text-sm text-gray-500 font-light tracking-wide">per person</span>
              </div>
              <button 
                onClick={handleBookNow}
                className="flex-1 md:flex-none bg-[#800000] text-white px-8 py-3 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => handleWishlistToggle(experience)}
                  className="flex items-center gap-2 px-6 py-3 border rounded-none hover:bg-gray-50 transition-colors duration-300 font-light tracking-[0.1em]"
                >
                  <Heart className={`w-5 h-5 text-[#800000] ${isInWishlist(experience.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(experience.id) ? 'SAVED' : 'SAVE'}
                </button>
                <button 
                  onClick={() => setShowShareDialog(true)}
                  className="flex items-center gap-2 px-6 py-3 border rounded-none hover:bg-gray-50 transition-colors duration-300 font-light tracking-[0.1em]"
                >
                  <Share2 className="w-5 h-5" />
                  SHARE
                </button>
              </div>

              <div className="space-y-12">
                {experience.id === 1 ? (
                  <section>
                    <h2 className="text-2xl font-light tracking-[0.15em] mb-6">TRIP OVERVIEW</h2>
                    <p className="font-light tracking-wide leading-relaxed text-gray-600 mb-4">
                      Step back in time and uncover the secrets of Watford's fascinating past,
                      from its medieval origins to its Victorian grandeur. This tour is perfect for history buffs and curious explorers alike.
                    </p>
                  </section>
                ) : experience.id === 2 ? (
                  <section>
                    <h2 className="text-2xl font-light tracking-[0.15em] mb-6">TRIP OVERVIEW</h2>
                    <p className="font-light tracking-wide leading-relaxed text-gray-600 mb-4">
                      Experience Watford's crucial role during World War II with our Wartime Watford Tour. This immersive 
                      4-hour experience reveals how the town contributed to the war effort, from civil defense to industrial production.
                    </p>
                  </section>
                ) : (
                  <section>
                    <h2 className="text-2xl font-light tracking-[0.15em] mb-6">TRIP OVERVIEW</h2>
                    <p className="font-light tracking-wide leading-relaxed text-gray-600 mb-4">
                      Combine the magic of Harry Potter with Watford's highlights in this comprehensive 8-hour tour. 
                      Start with an immersive experience at the Warner Bros. Studio Tour London, seeing original sets, 
                      props, and costumes from the Harry Potter films.
                    </p>
                    <p className="font-light tracking-wide leading-relaxed text-gray-600">
                      After exploring the wizarding world, discover Watford's own magical history and modern attractions, 
                      making this a perfect blend of fantasy and reality.
                    </p>
                  </section>
                )}
                
                <section>
                  <h2 className="text-2xl font-light tracking-[0.15em] mb-6">HIGHLIGHTS</h2>
                  <ul className="space-y-4">
                    {experience.id === 1 ? (
                      <>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                          St. Mary's Church: Begin your journey at this stunning medieval church,
                          where centuries of history whisper through its ancient walls. Marvel at the intricate architecture and hear tales of the town's earliest days.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                          Cassiobury Park: Stroll through this picturesque park, once the grounds of a grand estate.
                          Your guide will share fascinating insights into its transformation over the centuries.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                          Watford Museum: Dive deeper into Watford's
                          heritage with a guided tour of this charming museum. Discover artifacts, photographs, and stories that bring the town's history to life.
                          </p>
                        </li>
                      </>
                    ) : experience.id === 2 ? (
                      <>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                            Watford Museum Wartime Exhibit: Explore artifacts, photographs,
                            and personal stories that reveal how Watford contributed to the war effort.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                            Cassiobury Park's Wartime History: Discover how the park was transformed during the war,
                            from hosting evacuees to serving as a training ground.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                            RAF Northwood: Visit this historic site, which played a crucial role in the defense of Britain.
                            Learn about its strategic importance and the brave individuals who served here.
                          </p>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                            Warner Bros. Studio Tour London – The Making of Harry Potter: Step into the 
                            wizarding world and explore the sets, costumes, and props that brought the films to life.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                           Watford Market: Browse this bustling market and pick up a unique souvenir to remember your trip.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#800000] mt-2 mr-4"></div>
                          <p className="font-light tracking-wide leading-relaxed text-gray-600">
                            Watford Town Center: Take a guided walk through the town, with its charming streets and vibrant atmosphere.
                          </p>
                        </li>
                      </>
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-light tracking-[0.15em] mb-6">WHAT'S INCLUDED</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {experience.id === 1 ? (
                      // Historical Watford Discovery Tour inclusions
                      <>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">TOUR FEATURES</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Entrance fees to Watford Museum</span>
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Expert commentary from your knowledgeable guide</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">EXTRAS</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Afternoon tea break</span>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : experience.id === 2 ? (
                      // Wartime Watford Tour inclusions
                      <>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">TOUR FEATURES</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Military historian guide</span>
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Wartime exhibition entry</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">EXTRAS</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">WWII memorabilia booklet</span>
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Refreshment break</span>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      // Harry Potter Studio Tour inclusions
                      <>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">STUDIO TOUR</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Studio Tour entrance ticket</span>
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Digital guide</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-light tracking-[0.1em] text-[#800000] mb-2">EXTRAS</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Return transport</span>
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-3"></div>
                              <span className="font-light tracking-wide text-gray-600">Town center guided walk</span>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-light tracking-[0.15em] mb-8">REVIEWS</h2>
              
              {/* Rating Overview */}
              <div className="bg-gray-50 p-8 rounded-none mb-12">
                <div className="flex items-center gap-8 mb-8">
                  <div className="text-4xl font-light tracking-[0.1em] text-[#800000]">{experience.rating}</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(experience.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-light tracking-wide text-gray-600 mt-1">
                      Based on {experience.reviews} reviews
                    </div>
                  </div>
                </div>
                
                {/* Rating Breakdown */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-light tracking-wide text-gray-600">{rating} stars</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400"
                          style={{ 
                            width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="w-16 text-sm font-light tracking-wide text-gray-600 text-right">
                        {ratingCounts[rating] || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort Reviews */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-light tracking-[0.1em]">CUSTOMER REVIEWS</h3>
                <select 
                  className="border rounded-none px-4 py-2 font-light tracking-wide"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {/* Reviews List */}
              <div className="space-y-8">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="border-b pb-8 last:border-b-0">
                    <div className="flex items-start gap-6">
                      <img 
                        src={review.userImage} 
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-light tracking-[0.1em]">{review.userName}</h4>
                            <div className="text-sm font-light tracking-wide text-gray-500 mt-1">
                              Traveled in {review.tripDate}
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h5 className="font-light tracking-[0.1em] mt-4 mb-2">{review.title}</h5>
                        <p className="font-light tracking-wide leading-relaxed text-gray-600">{review.content}</p>
                        <div className="flex items-center gap-4 mt-6">
                          <button 
                            onClick={() => handleHelpfulClick(review.id)}
                            className={`flex items-center gap-2 text-sm font-light tracking-wide ${
                              helpfulReviews.includes(review.id)
                                ? 'text-[#800000]'
                                : 'text-gray-500 hover:text-[#800000]'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${
                              helpfulReviews.includes(review.id) ? 'fill-current' : ''
                            }`} />
                            Helpful ({review.helpful})
                          </button>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm font-light tracking-wide text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
              <div className="mb-6">
                <span className="text-sm font-light tracking-wide text-gray-500">From</span>
                <div className="text-3xl font-light tracking-[0.1em] text-[#800000]">£{experience.price}</div>
                <span className="text-sm font-light tracking-wide text-gray-500">per person</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                    SELECT YOUR DEPARTURE DATE
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border rounded-none font-light tracking-wide"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-[0.1em] text-gray-700 mb-2">
                    NUMBER OF TRAVELERS
                  </label>
                  <select className="w-full px-4 py-3 border rounded-none font-light tracking-wide">
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                  </select>
                </div>

                <button 
                  onClick={handleBookNow}
                  className="w-full bg-[#800000] text-white px-8 py-4 font-light tracking-[0.15em] hover:bg-[#600000] transition-colors duration-300"
                >
                  BOOK NOW
                </button>

                <p className="text-sm font-light tracking-wide text-gray-500 text-center">
                  No payment required to make a booking
                </p>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-[#800000]" />
                  <span className="font-light tracking-[0.1em]">FLEXIBLE BOOKING</span>
                </div>
                <p className="font-light tracking-wide text-gray-600 leading-relaxed">
                  Free cancellation up to 30 days before departure. Change your travel dates or choose a 
                  different experience free of charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;