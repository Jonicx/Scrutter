import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  availableTickets: number;
  totalTickets: number;
  category: string;
  featured?: boolean;
}

interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const soldPercentage = ((event.totalTickets - event.availableTickets) / event.totalTickets) * 100;

  return (
    <div className={`bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">
            {event.category}
          </span>
        </div>
        {soldPercentage > 80 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
              Almost Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span>{formatDate(event.date)}</span>
            <Clock className="h-4 w-4 ml-4 mr-2 text-purple-500" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <Users className="h-4 w-4 mr-2 text-purple-500" />
            <span>{event.availableTickets} tickets available</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600">
              ${event.price}
            </span>
            <span className="text-gray-400 text-sm ml-1">per ticket</span>
          </div>
          
          <Link
            to={`/events/${event.id}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            View Details
          </Link>
        </div>

        {/* Availability Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
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
      </div>
    </div>
  );
};

export default EventCard;