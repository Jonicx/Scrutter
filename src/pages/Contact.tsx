import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@ticketeasily.com',
      action: 'mailto:support@ticketeasily.com'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team directly',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available 24/7',
      action: '#'
    }
  ];

  const faqCategories = [
    {
      icon: HelpCircle,
      title: 'General Questions',
      description: 'Basic questions about our platform and services',
      link: '#'
    },
    {
      icon: Users,
      title: 'Account & Tickets',
      description: 'Help with your account and ticket management',
      link: '#'
    },
    {
      icon: MapPin,
      title: 'Event Information',
      description: 'Questions about specific events and venues',
      link: '#'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h1>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              We're here to help! Reach out to us with any questions, concerns, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="text-center p-6 bg-gray-700 rounded-lg hover:bg-purple-900 hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors">
                  <method.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-300 mb-3">{method.description}</p>
                <p className="text-purple-400 font-medium">{method.contact}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="event">Event Related</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Address</h3>
                      <p className="text-gray-300">
                        123 Event Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Business Hours</h3>
                      <p className="text-gray-300">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday - Sunday: 10:00 AM - 4:00 PM EST
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <p className="text-gray-300">
                        General: info@ticketeasily.com<br />
                        Support: support@ticketeasily.com<br />
                        Press: press@ticketeasily.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Links */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Quick Help</h3>
                <div className="space-y-3">
                  {faqCategories.map((category, index) => (
                    <a
                      key={index}
                      href={category.link}
                      className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <category.icon className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-white">{category.title}</h4>
                        <p className="text-sm text-gray-300">{category.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Find Us</h2>
          <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-400">123 Event Street, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;