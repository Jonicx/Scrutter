import React from 'react';
import { Calendar, MapPin, Clock, Download, Mail, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import eventsData from '../data/events.json';

const MyTickets: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { purchasedTickets } = useTickets();

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
  //         <p className="text-gray-600 mb-4">You need to sign in to view your tickets.</p>
  //         <a
  //           href="/auth"
  //           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
  //         >
  //           Sign In
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

  const getEventDetails = (eventId: number) => {
    return eventsData.find(event => event.id === eventId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPurchaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">My Tickets</h1>
          <p className="text-lg text-gray-300">
            Manage your event tickets and download them for entry
          </p>
        </div>

        {purchasedTickets.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No tickets yet</h3>
            <p className="text-gray-300 mb-6">
              When you purchase tickets, they'll appear here.
            </p>
            <a
              href="/events"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {purchasedTickets.map((ticket) => {
              const event = getEventDetails(ticket.eventId);
              if (!event) return null;

              return (
                <div key={ticket.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    {/* Event Image */}
                    <div className="md:w-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>

                    {/* Ticket Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2">
                                {event.title}
                              </h3>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-300">
                                  <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                                  <span>{formatDate(event.date)} at {event.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                ticket.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Quantity</p>
                              <p className="text-sm font-medium text-white">{ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Seat Numbers</p>
                              <p className="text-sm font-medium text-white">{ticket.seatNumbers.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Paid</p>
                              <p className="text-sm font-medium text-white">${ticket.totalPrice.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Purchase Date</p>
                              <p className="text-sm font-medium text-white">{formatPurchaseDate(ticket.purchaseDate)}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors">
                              <Download className="h-4 w-4" />
                              <span>Download PDF</span>
                            </button>
                            <button className="flex items-center space-x-1 bg-gray-700 text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors">
                              <Mail className="h-4 w-4" />
                              <span>Email Tickets</span>
                            </button>
                            <button className="flex items-center space-x-1 bg-gray-700 text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors">
                              <QrCode className="h-4 w-4" />
                              <span>View QR Code</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section (Hidden by default) */}
                  <div className="border-t border-gray-700 bg-gray-700 p-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">
                        Show this QR code at the venue for entry
                      </p>
                      <div className="bg-gray-600 p-4 rounded-lg inline-block">
                        <div className="w-24 h-24 bg-gray-500 flex items-center justify-center">
                          <QrCode className="h-8 w-8 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Ticket ID: {ticket.qrCode}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-200 mb-2">Need Help?</h3>
          <p className="text-blue-300 mb-4">
            Having trouble with your tickets? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="bg-transparent border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;