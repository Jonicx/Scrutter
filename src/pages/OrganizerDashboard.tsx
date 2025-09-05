import React, { useState } from 'react';
import { Plus, Calendar, Users, DollarSign, BarChart3, Edit, Eye, Trash2, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import eventsData from '../data/events.json';

const OrganizerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Mock data for organizer's events (in real app, this would be filtered by organizer)
  const organizerEvents = eventsData.slice(0, 3);
  
  const stats = [
    { icon: Calendar, label: 'Total Events', value: '12', change: '+2 this month' },
    { icon: Users, label: 'Total Attendees', value: '3,247', change: '+15% from last month' },
    { icon: DollarSign, label: 'Revenue', value: '$28,450', change: '+$4,200 this month' },
    { icon: BarChart3, label: 'Avg. Attendance', value: '87%', change: '+5% improvement' }
  ];

  const recentSales = [
    { event: 'Summer Music Festival', tickets: 5, amount: '$450.00', buyer: 'Sarah Johnson', date: '2 hours ago' },
    { event: 'Tech Conference 2025', tickets: 2, amount: '$600.00', buyer: 'Mike Chen', date: '4 hours ago' },
    { event: 'Art & Wine Exhibition', tickets: 3, amount: '$195.00', buyer: 'Emily Davis', date: '6 hours ago' }
  ];

  // if (user?.role !== 'organizer') {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
  //         <p className="text-gray-600 mb-4">This page is only available to event organizers.</p>
  //         <p className="text-sm text-blue-600">Change your role to "Organizer" using the dropdown in the navigation.</p>
  //       </div>
  //     </div>
  //   );
  // }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-green-400 bg-green-900 px-2 py-1 rounded">
                <TrendingUp className="h-3 w-3 inline mr-1" />
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-300">{stat.label}</div>
            <div className="text-xs text-green-400 mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300">Revenue chart would be displayed here</p>
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Ticket Sales</h3>
          <div className="space-y-3">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-white text-sm">{sale.event}</p>
                  <p className="text-xs text-gray-300">{sale.buyer} • {sale.tickets} tickets</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{sale.amount}</p>
                  <p className="text-xs text-gray-400">{sale.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Events</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {organizerEvents.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">{event.title}</h3>
              <div className="text-sm text-gray-300 mb-3">
                <p>{new Date(event.date).toLocaleDateString()} • {event.time}</p>
                <p>{event.location}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-lg font-bold text-purple-600">${event.price}</span>
                  <span className="text-gray-400 text-sm ml-1">per ticket</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  event.availableTickets > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {event.availableTickets > 0 ? 'Active' : 'Sold Out'}
                </span>
              </div>
              <div className="text-sm text-gray-300 mb-4">
                <p>{event.totalTickets - event.availableTickets} sold / {event.totalTickets} total</p>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${((event.totalTickets - event.availableTickets) / event.totalTickets) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-700 text-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button className="flex-1 bg-purple-900 text-purple-300 px-3 py-2 rounded text-sm hover:bg-purple-800 transition-colors flex items-center justify-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button className="flex-1 bg-red-900 text-red-300 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors flex items-center justify-center">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Organizer Dashboard</h1>
          <p className="text-gray-300">Welcome back, {user?.name || 'Organizer'}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg shadow-sm mb-8">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              My Events
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'analytics' && (
          <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">Detailed analytics and insights would be available here.</p>
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Create New Event</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Category
                      </label>
                      <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Music</option>
                        <option>Technology</option>
                        <option>Sports</option>
                        <option>Art</option>
                        <option>Food</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Event description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Ticket Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Total Tickets
                      </label>
                      <input
                        type="number"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Event location"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 py-2 px-4 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;