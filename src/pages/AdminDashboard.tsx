import React, { useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, UserCheck, AlertCircle, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Total Users', value: '24,531', change: '+12% from last month', color: 'text-blue-600' },
    { icon: Calendar, label: 'Active Events', value: '1,247', change: '+8% from last month', color: 'text-green-600' },
    { icon: DollarSign, label: 'Platform Revenue', value: '$142,580', change: '+23% from last month', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Growth Rate', value: '15.3%', change: '+2.1% from last month', color: 'text-orange-600' }
  ];

  const recentUsers = [
    { name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '2 hours ago' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Organizer', status: 'Active', joined: '5 hours ago' },
    { name: 'Mike Chen', email: 'mike@example.com', role: 'User', status: 'Pending', joined: '1 day ago' },
    { name: 'Emily Davis', email: 'emily@example.com', role: 'Organizer', status: 'Active', joined: '2 days ago' }
  ];

  const recentEvents = [
    { title: 'Summer Music Festival', organizer: 'MusicWorld Events', status: 'Active', tickets: 2500, revenue: '$89,750' },
    { title: 'Tech Conference 2025', organizer: 'TechEvents Inc', status: 'Active', tickets: 150, revenue: '$44,985' },
    { title: 'Art & Wine Exhibition', organizer: 'Cultural Arts Society', status: 'Pending Review', tickets: 120, revenue: '$7,800' },
    { title: 'Comedy Night Live', organizer: 'Laugh Factory', status: 'Active', tickets: 80, revenue: '$3,600' }
  ];

  // if (user?.role !== 'admin') {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
  //         <p className="text-gray-600 mb-4">This page is only available to administrators.</p>
  //         <p className="text-sm text-blue-600">Change your role to "Admin" using the dropdown in the navigation.</p>
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
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-xs text-green-400 bg-green-900 px-2 py-1 rounded">
                ↗ {stat.change.split(' ')[0]}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-300 mb-2">{stat.label}</div>
            <div className="text-xs text-green-400">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Growth</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300">Growth chart would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300">Revenue chart would be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-900 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-white">Server Status</p>
              <p className="text-sm text-green-400">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-yellow-900 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="font-medium text-white">Payment Gateway</p>
              <p className="text-sm text-yellow-400">Minor Issues</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-900 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-white">Database</p>
              <p className="text-sm text-green-400">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Export Users
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Recent Users</h3>
            <div className="flex space-x-2">
              <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                <option>All Roles</option>
                <option>Users</option>
                <option>Organizers</option>
              </select>
              <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {recentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'Organizer' 
                        ? 'bg-purple-900 text-purple-300' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-400 hover:text-purple-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Event Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Export Events
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Recent Events</h3>
            <div className="flex space-x-2">
              <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                <option>All Categories</option>
                <option>Music</option>
                <option>Technology</option>
                <option>Sports</option>
              </select>
              <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending Review</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Organizer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tickets Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {recentEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{event.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.organizer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.status === 'Active' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.tickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {event.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-400 hover:text-purple-300 mr-3">Review</button>
                    <button className="text-red-400 hover:text-red-300">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300">Platform administration and management</p>
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
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'settings' && (
          <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Platform Settings</h3>
            <p className="text-gray-300">System configuration and settings would be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;