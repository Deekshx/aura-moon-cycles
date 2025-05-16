
import React, { useEffect } from 'react';

const StarryBackground = () => {
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const container = document.querySelector('.stars-container');
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      
      // Create random stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position randomly
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
      }
      
      // Create constellations
      createConstellation(container);
    };
    
    const createConstellation = (container: Element) => {
      // Create SVG for constellation
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('constellation');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      // Create a simple constellation pattern
      const points = [
        {x: 20, y: 20},
        {x: 35, y: 30},
        {x: 50, y: 15},
        {x: 65, y: 40},
        {x: 80, y: 30}
      ];
      
      // Draw lines between points
      for (let i = 0; i < points.length - 1; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${points[i].x}%`);
        line.setAttribute('y1', `${points[i].y}%`);
        line.setAttribute('x2', `${points[i+1].x}%`);
        line.setAttribute('y2', `${points[i+1].y}%`);
        svg.appendChild(line);
      }
      
      // Add star points
      points.forEach(point => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', `${point.x}%`);
        circle.setAttribute('cy', `${point.y}%`);
        circle.setAttribute('r', '2');
        svg.appendChild(circle);
      });
      
      container.appendChild(svg);
      
      // Add another constellation
      const svg2 = svg.cloneNode(true) as SVGElement;
      svg2.style.top = '60%';
      svg2.style.left = '60%';
      container.appendChild(svg2);
    };
    
    // Add moon
    const createMoon = () => {
      const container = document.querySelector('.stars-container');
      if (!container) return;
      
      const moon = document.createElement('div');
      moon.className = 'moon-bg';
      moon.style.top = '10%';
      moon.style.right = '10%';
      
      container.appendChild(moon);
    };
    
    createStars();
    createMoon();
    
    // Recreate on window resize
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);
  
  return (
    <div className="stars-container fixed inset-0 w-full h-full overflow-hidden z-0" />
  );
};

export default StarryBackground;
