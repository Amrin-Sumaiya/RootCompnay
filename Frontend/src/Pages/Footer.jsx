import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 md:flex md:justify-between">
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-2">IGL Web Ltd .</h2>
          <p className="text-gray-400 text-sm">
            Building better opportunities for everyone. Stay connected with us for latest jobs and updates.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-400 space-y-1">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/jobs" className="hover:text-white transition">Jobs</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">Dhanmondi-4, Road:4(House-33(A))</p>
          <p className="text-gray-400 text-sm">Email: support@iglweb.com</p>
          <p className="text-gray-400 text-sm">Phone: +880-1958-666999</p>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-3">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} IGL Web Ltd . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
