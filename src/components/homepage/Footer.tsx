
import { Link } from "react-router-dom";
import { NetworkBackground } from "@/components/NetworkBackground";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-center text-white relative">
      <div className="absolute inset-0 -z-10">
        <NetworkBackground 
          nodes={30}
          className="opacity-20" 
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <p className="mb-2">© {new Date().getFullYear()} Statistical Convention Events. All rights reserved.</p>
        <p className="text-sm text-gray-400">Connecting professionals through premier industry conventions</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
            Admin
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};
