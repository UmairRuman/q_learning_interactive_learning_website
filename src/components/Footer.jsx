// Path: src/components/Footer.jsx

import React from "react";
import { Github, Linkedin, Globe, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="text-white font-semibold">
              Developed by <span className="text-cyan-400">Umair Ruman</span>
            </p>
            <p className="text-xs text-purple-300">
              AI Engineer & Full Stack Developer
            </p>
          </div>

          {/* Center */}
          <div className="text-sm text-purple-200">
            © {currentYear} All rights reserved.
          </div>

          {/* Right */}
          <div className="flex gap-3">
            <a
              href="https://github.com/UmairRuman"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/umair-ruman-800204285/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>

            <a
              href="https://umairrumanportfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Portfolio"
            >
              <Globe className="w-4 h-4 text-white" />
            </a>

            <a
              href="mailto:programmerumair29@gmail.com"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
