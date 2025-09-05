import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Star, Share, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import eventsData from '../data/events.json';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { purchaseTicket } = useTickets();
  const [quantity, setQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const event = eventsData.find(e => e.id === parseInt(id || '0'));

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/events')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    const totalPrice = event.price * quantity;
    purchaseTicket(event.id, quantity, totalPrice);
    setShowPurchaseModal(false);
    navigate('/payment', { 
      state: { 
        event, 
        quantity, 
        totalPrice 
      } 
    });
  };

  const soldPercentage = ((event.totalTickets - event.availableTickets) / event.totalTickets) * 100;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-black">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
              {event.featured && (
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
              {soldPercentage > 80 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  Almost Sold Out
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <p className="text-xl text-gray-200">Organized by {event.organizer}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold text-white">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-semibold text-white">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-semibold text-white">{event.location}</p>
                    <p className="text-sm text-gray-400">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-400">Availability</p>
                    <p className="font-semibold text-white">{event.availableTickets} tickets left</p>
                    <p className="text-sm text-gray-400">out of {event.totalTickets}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Event Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-gray-300" />
                </div>
                <span className="ml-2 text-sm text-gray-400">(4.2 out of 5 based on 127 reviews)</span>
              </div>
              <p className="text-gray-300">Reviews will be available after the event concludes.</p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${event.price}
                </div>
                <p className="text-gray-300">per ticket</p>
              </div>

              {/* Availability Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{Math.round(soldPercentage)}% sold</span>
                  <span>{event.availableTickets} remaining</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      soldPercentage > 80 ? 'bg-red-500' : soldPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of tickets
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold text-white px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">Maximum 10 tickets per order</p>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-purple-600">${(event.price * quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePurchase}
                  disabled={event.availableTickets === 0}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    event.availableTickets === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {event.availableTickets === 0 ? 'Sold Out' : 'Buy Tickets'}
                  </span>
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Share className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="mt-6 p-3 bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-200">
                  <strong>Safe & Secure:</strong> Your payment is protected and tickets are guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Purchase</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-300"><strong className="text-white">Event:</strong> {event.title}</p>
              <p className="text-gray-300"><strong className="text-white">Date:</strong> {formatDate(event.date)}</p>
              <p className="text-gray-300"><strong className="text-white">Quantity:</strong> {quantity} ticket{quantity > 1 ? 's' : ''}</p>
              <p className="text-gray-300"><strong className="text-white">Total:</strong> ${(event.price * quantity).toFixed(2)}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 py-2 px-4 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;