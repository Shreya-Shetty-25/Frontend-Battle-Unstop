import React, { useState, useEffect } from 'react';
import { Code, Palette, Rocket, Shield } from 'lucide-react';

const ProgressPillsComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const pillsData = [
    {
      icon: Code,
      text: "Development",
      card: {
        title: "Full-Stack Development",
        description: "Building robust web applications with modern technologies like React, Node.js, and cloud services. Our development process ensures scalable and maintainable code.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        features: ["React & Vue.js", "Node.js & Python", "Cloud Integration", "API Development"]
      }
    },
    {
      icon: Palette,
      text: "Design",
      card: {
        title: "Creative Design Solutions",
        description: "Crafting beautiful and intuitive user experiences through thoughtful design. We focus on usability, accessibility, and modern aesthetics.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
        features: ["UI/UX Design", "Brand Identity", "Prototyping", "Design Systems"]
      }
    },
    {
      icon: Rocket,
      text: "Launch",
      card: {
        title: "Strategic Launch",
        description: "Successfully bringing your product to market with comprehensive launch strategies, performance monitoring, and user acquisition tactics.",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
        features: ["Go-to-Market", "Performance Analytics", "User Onboarding", "Growth Metrics"]
      }
    },
    {
      icon: Shield,
      text: "Security",
      card: {
        title: "Enterprise Security",
        description: "Implementing robust security measures to protect your applications and data. We follow industry best practices and compliance standards.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        features: ["Data Encryption", "Authentication", "Compliance", "Security Audits"]
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveIndex(current => (current + 1) % pillsData.length);
          return 0;
        }
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-neutral-900 transition-colors duration-500">
      
      {/* Pills Section */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {pillsData.map((pill, index) => {
          const Icon = pill.icon;
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex || (index === activeIndex && progress === 100);

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500
                ${isActive 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : isCompleted 
                    ? 'border-green-500' 
                    : 'border-gray-200 dark:border-neutral-700'}
              `}
            >
              <div 
                className={`absolute top-0 left-0 h-full z-0 transition-all duration-300
                  ${isActive ? 'bg-blue-100 dark:bg-blue-900/20' : isCompleted ? 'bg-green-100 dark:bg-green-900/20' : 'bg-transparent'}
                `}
                style={{
                  width: isActive ? `${progress}%` : isCompleted ? '100%' : '0%',
                  transitionTimingFunction: 'linear'
                }}
              />
              <div className="flex items-center p-4 relative z-10">
                <Icon className={`w-6 h-6 mr-2 transition-colors duration-300
                  ${isActive ? 'text-blue-600 dark:text-blue-400' 
                    : isCompleted ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-400 dark:text-gray-500'}
                `} />
                <span className={`font-semibold text-sm sm:text-base transition-colors duration-300
                  ${isActive ? 'text-blue-900 dark:text-blue-100' 
                    : isCompleted ? 'text-green-900 dark:text-green-100' 
                    : 'text-gray-700 dark:text-gray-300'}
                `}>
                  {pill.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Section */}
      <div className="rounded-2xl shadow-2xl bg-white dark:bg-neutral-800 transition duration-500 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
            <img 
              src={pillsData[activeIndex].card.image} 
              alt={pillsData[activeIndex].card.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {pillsData[activeIndex].card.title}
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {pillsData[activeIndex].card.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillsData[activeIndex].card.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-3" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {pillsData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300
              ${index === activeIndex 
                ? 'bg-blue-500 dark:bg-blue-400 scale-125' 
                : index < activeIndex 
                  ? 'bg-green-500 dark:bg-green-400' 
                  : 'bg-gray-300 dark:bg-gray-600'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressPillsComponent;
