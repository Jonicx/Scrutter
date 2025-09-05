import React from 'react';
import { Users, Target, Heart, Award, CheckCircle, Star } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Sarah founded TicketEasily with a vision to make event discovery effortless for everyone.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Michael leads our technology team, ensuring our platform is secure, fast, and reliable.'
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Emma helps connect amazing events with the right audiences through strategic marketing.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in bringing people together through amazing experiences and events.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to make event discovery and ticket booking seamless.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about events and helping people create unforgettable memories.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from customer service to platform reliability.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'TicketEasily founded', description: 'Started with a simple idea to make ticket buying easier' },
    { year: '2021', event: '100K+ users', description: 'Reached our first major milestone of 100,000 active users' },
    { year: '2022', event: 'Global expansion', description: 'Expanded to 15 countries and partnered with major venues' },
    { year: '2023', event: '1M+ tickets sold', description: 'Crossed the milestone of 1 million tickets sold on our platform' },
    { year: '2024', event: 'AI-powered recommendations', description: 'Launched personalized event recommendations using AI' },
    { year: '2025', event: 'Future innovations', description: 'Working on virtual reality event previews and more' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About TicketEasily
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We're on a mission to connect people with amazing events and create unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              To make event discovery and ticket purchasing as simple and enjoyable as possible, 
              while helping event organizers reach their perfect audience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Discovery</h3>
              <p className="text-gray-300">
                Find events that match your interests with our intuitive search and recommendation system.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Booking</h3>
              <p className="text-gray-300">
                Book tickets with confidence knowing your payment and personal information is protected.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Amazing Support</h3>
              <p className="text-gray-300">
                Our dedicated support team is here to help you before, during, and after your events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do at TicketEasily
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-800 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <value.icon className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From a simple idea to a global platform serving millions of users
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-purple-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{milestone.event}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-gray-800 shadow-lg z-10"></div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The passionate people behind TicketEasily who work every day to make your event experience better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-purple-300">
              Our impact in the events industry
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-purple-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-300">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-purple-300">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-purple-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;