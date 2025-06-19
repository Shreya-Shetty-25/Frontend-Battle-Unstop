import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Zap, Star, Sparkles } from 'lucide-react';

const Footer = () => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Generate floating particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Animate particles and time
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.5) % 100,
        x: particle.x + Math.sin(time + particle.id) * 0.5,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [time]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer 
      className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,0,150,0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${3 + particle.id * 0.5}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Animated Wave Pattern */}
      <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-60"
          style={{
            clipPath: `polygon(0 ${20 + Math.sin(time) * 10}%, 25% ${30 + Math.sin(time + 1) * 15}%, 50% ${25 + Math.sin(time + 2) * 12}%, 75% ${35 + Math.sin(time + 3) * 18}%, 100% ${20 + Math.sin(time + 4) * 10}%, 100% 100%, 0 100%)`,
            transform: `translateX(${Math.sin(time * 0.5) * 20}px)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
                <div className="absolute -inset-2 bg-yellow-400 rounded-full opacity-20 animate-ping" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                NEXUS
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed transform transition-all duration-300 hover:text-white hover:scale-105">
              Crafting digital experiences that transcend reality and ignite imagination.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  className="group relative p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold flex items-center space-x-2">
              <Star className="w-5 h-5 text-purple-400 animate-spin" />
              <span>Quick Links</span>
            </h4>
            <div className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{link}</span>
                  <div className="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300 opacity-20 -z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Stay Connected</span>
            </h4>
            <p className="text-gray-300">
              Subscribe for updates and exclusive content!
            </p>
            <div className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 placeholder-gray-400"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-focus-within:opacity-10 transition-opacity duration-300" />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-300">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>by the NEXUS team</span>
          </div>
          <div className="text-gray-400">
            © 2024 NEXUS. All rights reserved.
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;