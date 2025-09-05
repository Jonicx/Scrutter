import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Shield, Zap, Star, ArrowRight, Users, Globe, Heart } from 'lucide-react';
import EventCard from '../components/EventCard';
import eventsData from '../data/events.json';

const Home: React.FC = () => {
  const featuredEvents = eventsData.filter(event => event.featured);
  
  const stats = [
    { icon: Calendar, label: 'Events Hosted', value: '10,000+' },
    { icon: Users, label: 'Happy Customers', value: '500K+' },
    { icon: Globe, label: 'Countries', value: '50+' },
    { icon: Star, label: 'Average Rating', value: '4.9' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find your perfect event with our advanced search and filtering system.'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your payments are protected with enterprise-grade security measures.'
    },
    {
      icon: Zap,
      title: 'Instant Tickets',
      description: 'Get your tickets instantly delivered to your email and mobile app.'
    },
    {
      icon: Heart,
      title: '24/7 Support',
      description: 'Our dedicated support team is here to help you anytime, anywhere.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center ">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Events Near You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              From intimate concerts to massive festivals, find and book tickets to the world's best events with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 text-white font-semibold py-4 px-8 rounded-lg transition-all inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section 
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't miss out on these incredible events handpicked by our team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose TicketEasily?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We make event discovery and ticket booking simple, secure, and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of event-goers who trust TicketEasily for their entertainment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Browse Events
            </Link>
            <Link
              to="/auth"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-600 font-semibold py-3 px-6 rounded-lg transition-all inline-flex items-center justify-center"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;