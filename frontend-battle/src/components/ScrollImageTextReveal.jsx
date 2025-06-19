import React, { useState, useEffect, useRef, useCallback } from 'react';

const ScrollImageTextReveal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  const images = [
    { src: "https://res.cloudinary.com/dtmzwq2ua/image/upload/v1643726333/7_o8efvh.jpg", title: "Inte Le Chair", number: "01" },
    { src: "https://res.cloudinary.com/dtmzwq2ua/image/upload/v1643726332/3_ltlmwj.jpg", title: "Asto Da Pillow", number: "02" },
    { src: "https://res.cloudinary.com/dtmzwq2ua/image/upload/v1643726332/5_lrsmve.jpg", title: "Paya Ja Miraro", number: "03" },
    { src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3J8ZW58MHx8MHx8fDA%3D", title: "Rela Sa Tabelo", number: "04" }
  ];

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, images.length]);

  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, images.length]);

  useEffect(() => {
    let wheelTimeout;
    const handleWheel = (e) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        e.deltaY > 0 ? nextImage() : prevImage();
      }, 50);
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          cursorRef.current.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
          cursorRef.current.style.opacity = '1';
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(wheelTimeout);
    };
  }, [nextImage, prevImage]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden" style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="absolute w-5 h-5 bg-white rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-200" style={{ backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }} />

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 rounded-full opacity-10 bg-white" style={{ top: '-10%', left: '-10%', animation: 'float1 20s ease-in-out infinite' }} />
        <div className="absolute w-48 h-48 rounded-full opacity-10 bg-white" style={{ top: '60%', right: '-5%', animation: 'float2 15s ease-in-out infinite reverse' }} />
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-white" style={{ bottom: '-20%', left: '50%', transform: 'translateX(-50%)', animation: 'float3 25s ease-in-out infinite' }} />
      </div>

      {/* Background Numbers Right Aligned */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-end items-center pr-8">
        <div
          className="absolute transition-transform duration-700 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)`, willChange: 'transform' }}
        >
          {images.map((img, i) => (
            <div
              key={`bg-num-${i}`}
              className="h-screen flex items-center justify-end"
            >
              <div
                className="text-white/10 font-extrabold select-none"
                style={{
                  fontSize: 'clamp(200px, 30vw, 300px)',
                  fontFamily: 'serif',
                  lineHeight: 1
                }}
              >
                {img.number}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Stack */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="relative w-80 h-96 md:w-96 md:h-[500px]" style={{ perspective: '1000px' }}>
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {images.map((image, index) => {
              let transformClass = '', zIndex = 1;
              if (index === currentIndex) {
                transformClass = 'translate-0 rotate-0 scale-100'; zIndex = 4;
              } else if (index === (currentIndex + 1) % images.length) {
                transformClass = 'translate-x-5 -rotate-6 scale-95'; zIndex = 3;
              } else if (index === (currentIndex + 2) % images.length) {
                transformClass = 'translate-x-10 -rotate-12 scale-90'; zIndex = 2;
              } else {
                transformClass = 'translate-x-16 -rotate-18 scale-85 opacity-40'; zIndex = 1;
              }
              return (
                <div key={index} className={`absolute inset-0 transition-all duration-700 ease-out ${transformClass}`} style={{ zIndex, transformOrigin: 'center', backfaceVisibility: 'hidden' }}>
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    <img src={image.src} alt={image.title} className="w-full h-full object-cover transition-transform duration-700 ease-out" loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Info */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40 text-center text-white">
        <div key={`title-${currentIndex}`} className="text-2xl font-light mb-2 animate-fadeInUp" style={{ animation: 'fadeInUp 0.8s ease forwards', animationDelay: '0.3s', opacity: 0 }}>{images[currentIndex].title}</div>
        <div key={`number-${currentIndex}`} className="text-sm tracking-widest opacity-70 animate-fadeInUp" style={{ animation: 'fadeInUp 0.8s ease forwards', animationDelay: '0.5s', opacity: 0 }}>{images[currentIndex].number} / {String(images.length).padStart(2, '0')}</div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => !isAnimating && setCurrentIndex(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-40 text-white/60 text-xs tracking-widest hidden md:block">
        <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>SCROLL TO EXPLORE</div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -50px) rotate(180deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, 30px) rotate(-180deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
          50% { transform: translateX(-50%) translateY(-20px) rotate(90deg); }
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          transform: translateY(20px);
        }
      `}</style>
    </div>
  );
};

export default ScrollImageTextReveal;
