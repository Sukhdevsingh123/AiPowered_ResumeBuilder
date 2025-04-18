

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-white text-gray-800 py-8 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold text-indigo-600">
            © 2025 CVault. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Transforming resumes with cutting-edge blockchain technology.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.045.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.73-.668 1.585-.668 2.495 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.848.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.068 2.187 1.405 4.789 2.224 7.583 2.224 9.057 0 14.01-7.503 14.01-14.008 0-.213-.005-.426-.015-.637.962-.695 1.8-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.366-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.239 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.239-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.239-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.239 3.608-1.301 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.95.072-1.315.064-2.562.273-3.51.723a8.01 8.01 0 00-2.89 2.89c-.45.948-.659 2.195-.723 3.51-.058 1.28-.072 1.691-.072 4.95 0 3.259.014 3.67.072 4.95.064 1.315.273 2.562.723 3.51a8.01 8.01 0 002.89 2.89c.948.45 2.195.659 3.51.723 1.28.058 1.691.072 4.95.072 3.259 0 3.67-.014 4.95-.072 1.315-.064 2.562-.273 3.51-.723a8.01 8.01 0 002.89-2.89c.45-.948.659-2.195.723-3.51.058-1.28.072-1.691.072-4.95 0-3.259-.014-3.67-.072-4.95-.064-1.315-.273-2.562-.723-3.51a8.01 8.01 0 00-2.89-2.89c-.948-.45-2.195-.659-3.51-.723-1.28-.058-1.691-.072-4.95-.072z" />
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;