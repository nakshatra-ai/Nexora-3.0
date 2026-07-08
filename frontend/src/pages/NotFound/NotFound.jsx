import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../shared/ui/Button/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container w-screen h-screen bg-background-base flex flex-col items-center justify-center relative select-none font-sans px-6 text-center">
      {/* Decorative Blur BG */}
      <div className="absolute w-[500px] h-[500px] bg-primary-light-base rounded-full filter blur-[100px] pointer-events-none" />

      {/* Stylized dish SVG illustration */}
      <div className="mb-8 text-primary-base relative z-10">
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M50 95 L50 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 60 L70 60" stroke="currentColor" strokeWidth="3" />
          <path d="M50 50 C30 50 20 30 20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 50 C70 50 80 30 80 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="15" r="4" fill="var(--accent)" />
          <circle cx="20" cy="15" r="3" fill="currentColor" />
          <circle cx="80" cy="15" r="3" fill="currentColor" />
        </svg>
      </div>

      <h1 className="text-7xl font-display font-black text-primary-base tracking-widest relative z-10 leading-none">404</h1>
      <h3 className="text-xl font-bold text-text-base mt-4 mb-2 relative z-10">Connection Lost / Page Not Found</h3>
      <p className="text-xs text-text-muted-base max-w-sm leading-relaxed mb-8 relative z-10">
        The route you are looking for has been decommissioned or the path does not exist.
      </p>

      <Link to="/" className="relative z-10">
        <Button variant="accent">Reconnect Home</Button>
      </Link>
    </div>
  );
}
