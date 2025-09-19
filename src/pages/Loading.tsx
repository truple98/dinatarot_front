import { useState, useEffect } from 'react';
import sunIcon from '../assets/interface/sun.png';
import moonIcon from '../assets/interface/moon.png';
import starIcon from '../assets/interface/star.png';
import './Loading.css';

interface LoadingProps {
  onComplete?: () => void;
  duration?: number;
  message?: string;
}

const Loading = ({ onComplete, duration = 3000, message = "로딩중 이다요..."}: LoadingProps) => {
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { src: sunIcon, alt: 'sun' },
    { src: moonIcon, alt: 'moon' },
    { src: starIcon, alt: 'star' }
  ]

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete, icons.length]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="icon-container">
          {icons.map((icon, index) => (
            <img key={index} src={icon.src} alt={icon.alt} className={`loading-icon ${currentIcon === index ? 'active' : ''}`}/>
          ))}
        </div>

        <div className="loading-message">{message}</div>

        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;