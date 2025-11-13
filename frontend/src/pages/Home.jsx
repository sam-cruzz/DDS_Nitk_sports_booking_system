import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Users, Zap, ChevronRight, Star, Shield, Award, Check, ArrowRight, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const sports = [
    { name: 'Football', icon: '⚽', courts: 2, available: true, color: 'from-green-500 to-emerald-600' },
    { name: 'Basketball', icon: '🏀', courts: 3, available: true, color: 'from-orange-500 to-red-600' },
    { name: 'Cricket', icon: '🏏', courts: 1, available: true, color: 'from-blue-500 to-indigo-600' },
    { name: 'Badminton', icon: '🏸', courts: 8, available: true, color: 'from-pink-500 to-rose-600' },
    { name: 'Tennis', icon: '🎾', courts: 4, available: true, color: 'from-yellow-500 to-amber-600' },
    { name: 'Volleyball', icon: '🏐', courts: 2, available: true, color: 'from-purple-500 to-violet-600' },
    { name: 'Table Tennis', icon: '🏓', courts: 6, available: true, color: 'from-cyan-500 to-teal-600' },
    { name: 'Squash', icon: '🎯', courts: 2, available: false, color: 'from-slate-400 to-slate-500' },
  ];

  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Lightning Fast',
      description: 'Book your facility in under 30 seconds with our streamlined process',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Smart Scheduling',
      description: 'AI-powered slot recommendations based on your preferences',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Secure & Reliable',
      description: 'Bank-grade security with encrypted payment processing',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Team Friendly',
      description: 'Organize group bookings and tournaments effortlessly',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Final Year, CSE',
      text: 'The booking system is incredibly smooth! No more waiting in queues to book the football field.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Menon',
      role: 'Third Year, ECE',
      text: 'Love how easy it is to find available badminton courts. The app has made sports so accessible!',
      rating: 5,
      avatar: '👩‍🎓'
    },
    {
      name: 'Arjun Reddy',
      role: 'Second Year, Mech',
      text: 'Perfect for organizing cricket matches with friends. The payment system works flawlessly.',
      rating: 5,
      avatar: '🏏'
    }
  ];

  const stats = [
    { value: '2000+', label: 'Active Users', icon: '👥' },
    { value: '15+', label: 'Sports Facilities', icon: '🏟️' },
    { value: '500+', label: 'Weekly Bookings', icon: '📅' },
    { value: '98%', label: 'Satisfaction', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation transparent={true} fixed={true} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-semibold">Book in 30 Seconds or Less</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Your Gateway to
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                Campus Sports Excellence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Book football fields, basketball courts, badminton halls, and more. Real-time availability with instant confirmation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="/register" className="group w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-primary-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                Start Booking Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#sports" className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                Explore Facilities
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section id="sports" className="section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-4">
              OUR FACILITIES
            </span>
            <h2 className="section-title">
              Choose Your <span className="gradient-text">Perfect Sport</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Premium facilities with state-of-the-art equipment and professional maintenance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {sports.map((sport, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden bg-white border-2 border-slate-200 hover:border-primary-400 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {sport.icon}
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {sport.name}
                  </h3>
                  
                  {/* Courts */}
                  <p className="text-sm text-slate-600 mb-3">
                    {sport.courts} {sport.courts === 1 ? 'Court' : 'Courts'} Available
                  </p>
                  
                  {/* Availability Badge */}
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${sport.available ? 'bg-success-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className={`text-xs font-bold ${sport.available ? 'text-success-700' : 'text-red-700'}`}>
                      {sport.available ? 'Available Now' : 'Fully Booked'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/dashboard" className="inline-flex items-center gap-2 btn btn-primary btn-lg">
              View All Facilities
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-bold mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="section-title">
              Built for <span className="gradient-text-accent">Student Athletes</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Everything you need for seamless sports booking experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className={`feature-icon bg-gradient-to-br ${feature.color}`}>
                  {React.cloneElement(feature.icon, { className: 'w-7 h-7 text-white' })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  More Reasons to Book With Us
                </h3>
                <div className="space-y-4">
                  {[
                    'Real-time availability updates',
                    '24/7 online booking access',
                    'Instant email & SMS confirmations',
                    'Flexible cancellation policy',
                    'Group booking discounts',
                    'Mobile-friendly interface'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                      98%
                    </div>
                    <p className="text-slate-600 font-semibold">Student Satisfaction</p>
                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold mb-4">
              TESTIMONIALS
            </span>
            <h2 className="section-title">
              What <span className="gradient-text">Students Say</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Join thousands of satisfied NITK students
            </p>
          </div>

          <div className="relative">
            <div className="card-glass p-8 lg:p-12">
              <div className="text-center space-y-6">
                {/* Avatar */}
                <div className="text-7xl mb-4">
                  {testimonials[activeTestimonial].avatar}
                </div>

                {/* Stars */}
                <div className="flex gap-1 justify-center">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl text-slate-700 font-medium leading-relaxed italic max-w-3xl mx-auto">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="text-slate-900 font-bold text-lg">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-slate-600">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial
                        ? 'bg-primary-500 w-8'
                        : 'bg-slate-300 w-2 hover:bg-slate-400'
                    }`}
                    aria-label={`View testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-semibold">Join 2000+ Active Students</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Start Your<br />Sports Journey?
            </h2>

            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Create your free account today and get instant access to all premium facilities
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="/register" className="group w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-primary-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/login" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white rounded-xl font-bold text-lg transition-all duration-300">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🏆</span>
                <span className="text-xl font-bold">NITK Sports</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your premier sports booking platform at NITK Surathkal. Book facilities instantly, anytime.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block text-slate-400 hover:text-white transition text-sm">Home</a>
                <a href="/#sports" className="block text-slate-400 hover:text-white transition text-sm">Sports</a>
                <a href="/#features" className="block text-slate-400 hover:text-white transition text-sm">Features</a>
                <a href="/dashboard" className="block text-slate-400 hover:text-white transition text-sm">Dashboard</a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition text-sm">Help Center</a>
                <a href="#" className="block text-slate-400 hover:text-white transition text-sm">Contact Us</a>
                <a href="#" className="block text-slate-400 hover:text-white transition text-sm">FAQ</a>
                <a href="#" className="block text-slate-400 hover:text-white transition text-sm">Terms & Conditions</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>NITK Surathkal</p>
                <p>Karnataka, India - 575025</p>
                <p className="text-primary-400 hover:text-primary-300 transition cursor-pointer">sports@nitk.edu.in</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 NITK Sports. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition text-sm">Privacy Policy</a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-slate-400 hover:text-white transition text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;