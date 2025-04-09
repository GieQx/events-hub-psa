
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
            <li><Link to="/admin" className="hover:text-blue-400">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="flex items-center gap-2 mb-2">
            <Mail size={16} />
            <span>support@conventionhub.com</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} />
            <span>+1 (555) 123-4567</span>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Convention Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};
