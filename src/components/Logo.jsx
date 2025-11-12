const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <a href="/">
        <div className="relative w-12 h-12 group cursor-pointer">
          {/* SVG X Cutting Animation Logo */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Define animations */}
            <defs>
              <style>{`
                @keyframes cutSlash1 {
                  0% { 
                    stroke-dashoffset: 100;
                    opacity: 0;
                  }
                  20% {
                    opacity: 1;
                  }
                  50% { 
                    stroke-dashoffset: 0;
                  }
                  100% { 
                    stroke-dashoffset: 0;
                    opacity: 1;
                  }
                }
                @keyframes cutSlash2 {
                  0%, 30% { 
                    stroke-dashoffset: 100;
                    opacity: 0;
                  }
                  50% {
                    opacity: 1;
                  }
                  80% { 
                    stroke-dashoffset: 0;
                  }
                  100% { 
                    stroke-dashoffset: 0;
                    opacity: 1;
                  }
                }
                @keyframes splitTopLeft {
                  0%, 50% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(-15px, -15px); opacity: 0.3; }
                }
                @keyframes splitTopRight {
                  0%, 50% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(15px, -15px); opacity: 0.3; }
                }
                @keyframes splitBottomLeft {
                  0%, 50% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(-15px, 15px); opacity: 0.3; }
                }
                @keyframes splitBottomRight {
                  0%, 50% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(15px, 15px); opacity: 0.3; }
                }
                .slash1 { 
                  animation: cutSlash1 2.5s ease-in-out infinite;
                  stroke-dasharray: 100;
                  stroke-dashoffset: 100;
                }
                .slash2 { 
                  animation: cutSlash2 2.5s ease-in-out infinite;
                  stroke-dasharray: 100;
                  stroke-dashoffset: 100;
                }
                .piece-tl {
                  animation: splitTopLeft 2.5s ease-in-out infinite;
                }
                .piece-tr {
                  animation: splitTopRight 2.5s ease-in-out infinite;
                }
                .piece-bl {
                  animation: splitBottomLeft 2.5s ease-in-out infinite;
                }
                .piece-br {
                  animation: splitBottomRight 2.5s ease-in-out infinite;
                }
                .group:hover .slash1,
                .group:hover .slash2,
                .group:hover .piece-tl,
                .group:hover .piece-tr,
                .group:hover .piece-bl,
                .group:hover .piece-br {
                  animation-play-state: paused;
                }
              `}</style>
            </defs>
            
            {/* Object pieces that split apart */}
            <rect
              x="25"
              y="25"
              width="20"
              height="20"
              rx="3"
              className="fill-emerald-300 piece-tl"
            />
            <rect
              x="55"
              y="25"
              width="20"
              height="20"
              rx="3"
              className="fill-emerald-300 piece-tr"
            />
            <rect
              x="25"
              y="55"
              width="20"
              height="20"
              rx="3"
              className="fill-emerald-300 piece-bl"
            />
            <rect
              x="55"
              y="55"
              width="20"
              height="20"
              rx="3"
              className="fill-emerald-300 piece-br"
            />
            
            {/* X cutting lines */}
            <path
              d="M 15,15 L 85,85"
              className="stroke-emerald-600 slash1 transition-all duration-300 group-hover:stroke-emerald-500"
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            <path
              d="M 85,15 L 15,85"
              className="stroke-emerald-600 slash2 transition-all duration-300 group-hover:stroke-emerald-500"
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* Center point where X intersects */}
            <circle
              cx="50"
              cy="50"
              r="6"
              className="fill-emerald-700 transition-all duration-300 group-hover:fill-emerald-500"
            />
            <circle
              cx="50"
              cy="50"
              r="3"
              className="fill-white"
            />
          </svg>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-emerald-400 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-25 -z-10"></div>
        </div>
      </a>
    </div>
  );
};

export default Logo;