import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-border-base bg-surface-base font-sans text-xs text-text-muted-base">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} NEXORA AI. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-text-base transition-colors">About Us</Link>
          <Link to="/privacy" className="hover:text-text-base transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-text-base transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
