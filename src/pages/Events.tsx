import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, Tag } from 'lucide-react';
import EventCard from '../components/EventCard';
import eventsData from '../data/events.json';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...Array.from(new Set(eventsData.map(event => event.category)))];
  
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = eventsData.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange === 'under-50') matchesPrice = event.price < 50;
      else if (priceRange === '50-100') matchesPrice = event.price >= 50 && event.price <= 100;
      else if (priceRange === 'over-100') matchesPrice = event.price > 100;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popularity':
          return (b.totalTickets - b.availableTickets) - (a.totalTickets - a.availableTickets);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Events
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find the perfect event for you from our curated collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, locations, or organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Tag className="h-4 w-4 mr-1" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-50">Under $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="over-100">Over $100</option>
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-600 border border-gray-500 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="date">Date (Earliest)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                      setSortBy('date');
                    }}
                    className="w-full bg-gray-600 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-500 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">
            {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredAndSortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
              <p className="text-gray-300 mb-4">
                Try adjusting your search criteria or filters to find more events.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                  setSortBy('date');
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;