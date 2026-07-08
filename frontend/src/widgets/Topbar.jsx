import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../app/providers/AppContext';
import ThemeToggle from '../shared/ui/ThemeToggle/ThemeToggle';
import Button from '../shared/ui/Button/Button';

export default function Topbar() {
  const { currentUser } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Shrink size check
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active section check
      const sections = ['hero', 'about', 'services', 'ai-features', 'testimonials', 'meet-team', 'contact'];
      const scrollPos = window.scrollY + 250; // offset threshold

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 border-b border-border-base z-50 px-6 md:px-12 flex items-center justify-between select-none font-sans transition-all duration-300 ${
      scrolled 
        ? 'h-16 bg-background-base/90 backdrop-blur-lg shadow-lg shadow-primary-light-base/5' 
        : 'h-20 bg-background-base/70 backdrop-blur-md'
    }`}>
      {/* Brand logo */}
      <Link to="/" className="flex items-center gap-3">
        <svg className="w-8 h-8 text-primary-base" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
          <circle cx="30" cy="38" r="6" fill="currentColor" />
          <circle cx="70" cy="38" r="6" fill="currentColor" />
          <circle cx="50" cy="74" r="6" fill="currentColor" />
        </svg>
        <span className="font-display font-bold text-xl tracking-wider text-text-base">
          NEXORA AI
        </span>
      </Link>

      {/* Center anchors with dynamic active states */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
        <a href="#hero" className={`transition-colors duration-200 ${activeSection === 'hero' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>Home</a>
        <a href="#about" className={`transition-colors duration-200 ${activeSection === 'about' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>About</a>
        <a href="#services" className={`transition-colors duration-200 ${activeSection === 'services' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>Services</a>
        <a href="#ai-features" className={`transition-colors duration-200 ${activeSection === 'ai-features' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>AI Features</a>
        <a href="#testimonials" className={`transition-colors duration-200 ${activeSection === 'testimonials' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>Reviews</a>
        <a href="#meet-team" className={`transition-colors duration-200 ${activeSection === 'meet-team' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>Meet Our Team</a>
        <a href="#contact" className={`transition-colors duration-200 ${activeSection === 'contact' ? 'text-primary-base font-bold scale-105' : 'text-text-secondary-base hover:text-text-base'}`}>Contact</a>
      </nav>

      {/* Right toggle and login action */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {currentUser ? (
          <Link to="/dashboard">
            <Button variant="primary">Dashboard</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="accent">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
