import React, { useEffect, useRef, useState } from 'react';

const AnimeList = () => {
  const ballRef = useRef(null);
  const listRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef();

  const animeData = [
    {
      id: 1,
      year: '2560 BC',
      name: 'Great Pyramid of Giza',
      genre: 'Ancient Wonder, Egypt',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt2560140/'
    },
    {
      id: 2,
      year: '1450',
      name: 'Machu Picchu',
      genre: 'Inca Citadel, Peru',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt9335498/'
    },
    {
      id: 3,
      year: '1632',
      name: 'Taj Mahal',
      genre: 'Marble Mausoleum, India',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt5311514/'
    },
    {
      id: 4,
      year: '1889',
      name: 'Eiffel Tower',
      genre: 'Iconic Landmark, Paris',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt12343534/'
    },
    {
      id: 5,
      year: '80 AD',
      name: 'Colosseum',
      genre: 'Historic Amphitheatre, Rome',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
      imdbUrl: 'https://www.imdb.com/title/tt0388629/'
    }
  ];

  // Mouse tracking for cursor ball
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth ball animation
  useEffect(() => {
    const speed = 0.08;
    
    const animate = () => {
      setBallPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * speed,
        y: prev.y + (mousePos.y - prev.y) * speed
      }));
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  // Hacky text effect
  const handleMouseEnter = (e, originalText) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const target = e.target.querySelector('h2');
    if (!target) return;
    
    let iteration = 0;
    
    const interval = setInterval(() => {
      target.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
        
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 20);
  };

  const ArrowIcon = () => (
    <svg width="1.25rem" height="1.25rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4H12.75ZM11.25 10C11.25 10.4142 11.5858 10.75 12 10.75C12.4142 10.75 12.75 10.4142 12.75 10H11.25ZM11.25 4V10H12.75V4H11.25Z" fill="currentColor"/>
      <path d="M12 4.75C12.4142 4.75 12.75 4.41421 12.75 4C12.75 3.58579 12.4142 3.25 12 3.25L12 4.75ZM6 3.25C5.58579 3.25 5.25 3.58579 5.25 4C5.25 4.41421 5.58579 4.75 6 4.75L6 3.25ZM12 3.25L6 3.25L6 4.75L12 4.75L12 3.25Z" fill="currentColor"/>
      <path d="M12.5303 4.53033C12.8232 4.23744 12.8232 3.76256 12.5303 3.46967C12.2374 3.17678 11.7626 3.17678 11.4697 3.46967L12.5303 4.53033ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303C3.76256 12.8232 4.23744 12.8232 4.53033 12.5303L3.46967 11.4697ZM11.4697 3.46967L3.46967 11.4697L4.53033 12.5303L12.5303 4.53033L11.4697 3.46967Z" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");
        
        .anime-container {
          font-family: "Roboto Condensed", sans-serif;
          text-transform: uppercase;
        }
        
        .title {
          font-size: clamp(50px, 8vw, 100px);
          line-height: 1.2;
          font-weight: 400;
        }
        
        .anime-item {
          opacity: 0.4;
          transition: opacity 0.3s ease;
          position: relative;
          cursor: pointer;
        }
        
        .anime-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.5;
        }
        
        .anime-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: rgba(255, 255, 255, 1);
          transition: width 1s ease;
        }
        
        .anime-item:hover {
          opacity: 1;
        }
        
        .anime-item:hover::after {
          width: 100%;
        }
        
        .anime-name h2 {
          font-family: "Roboto", sans-serif;
          text-transform: capitalize;
          font-size: 22px;
          line-height: 30px;
        }
        
        .hover-img {
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          width: 34vw;
          height: 34vw;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        
        .hover-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          opacity: 0;
          transition: all 0.7s ease;
        }
        
        .anime-item:hover .hover-img img {
          opacity: 1;
        }
        
        .ball {
          width: 70px;
          height: 70px;
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          backdrop-filter: invert(1) grayscale(1);
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
        
        .redirect-link a {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: white;
          color: black;
          transition: all 0.5s ease;
        }
        
        @media (max-width: 768px) {
          .hover-img {
            width: 40vw;
            height: 40vw;
          }
          .hover-img img {
            border-radius: 8px;
          }
        }
      `}</style>
      
      {/* Background Video */}
      <div className="fixed inset-0 -z-20">
        <video 
          className="w-full h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://www.yudiz.com/codepen/hover-reveal/amv.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      </div>

      {/* Cursor Ball */}
      <div 
        ref={ballRef}
        className="ball"
        style={{
          left: `${ballPos.x}px`,
          top: `${ballPos.y}px`
        }}
      />

      {/* Main Content */}
      <div className="anime-container pt-16 px-8">
        <h1 className="title text-center mb-16 max-w-6xl mx-auto">
          TOP 5 PLACES TO VISIT
        </h1>
        
        <ul ref={listRef} className="max-w-7xl mx-auto">
          {animeData.map((anime, index) => (
            <li 
              key={anime.id}
              className="anime-item flex items-center flex-wrap py-7 -mx-3 relative"
              onMouseEnter={(e) => handleMouseEnter(e, anime.name)}
            >
              {/* Index */}
              <div className="w-1/12 px-3 hidden md:block">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              
              {/* Release Year */}
              <div className="w-2/12 px-3 hidden md:block">
                <span>{anime.year}</span>
              </div>
              
              {/* Anime Name */}
              <div className="anime-name w-full md:w-4/12 px-3">
                <h2 data-value={anime.name}>{anime.name}</h2>
              </div>
              
              {/* Genre */}
              <div className="w-4/12 px-3 hidden md:block">
                <span>{anime.genre}</span>
              </div>
              
              {/* Redirect Link */}
              <div className="redirect-link w-full md:w-1/12 px-3 flex justify-center md:justify-start mt-4 md:mt-0">
                <a 
                  href={anime.imdbUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <ArrowIcon />
                </a>
              </div>
              
              {/* Hover Image */}
              <div className="hover-img">
                <img 
                  src={anime.image} 
                  alt={`${anime.name} character`}
                  className="img-fluid"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimeList;