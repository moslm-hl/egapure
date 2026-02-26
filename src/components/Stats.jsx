import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

const Stats = () => {
  const { content } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const AnimatedNumber = ({ value, suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    const hasDecimal = value.includes('.');
    const hasPercent = value.includes('%');
    const hasPlus = value.includes('+');

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        setDisplayValue(current);
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, numericValue]);

    const formatValue = (val) => {
      if (hasDecimal) {
        return val.toFixed(1);
      }
      return Math.floor(val);
    };

    return (
      <span>
        {formatValue(displayValue)}{hasPercent ? '%' : ''}{hasPlus ? '+' : ''}{suffix}
      </span>
    );
  };

  return (
    <section id="stats" className="ega-stats" ref={statsRef}>
      <div className="ega-container">
        <div className="ega-stats-grid">
          {content.stats.map((stat, index) => (
            <div key={index} className="ega-stat-card">
              <div className="ega-stat-number">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="ega-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
