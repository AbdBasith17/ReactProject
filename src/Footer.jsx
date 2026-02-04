import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#f9fafb] text-gray-900 pt-12 pb-8 px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-200 pb-12">
        
        {/* BRAND COLUMN */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter text-emerald-950">
            PERF<span className="text-emerald-700 font-light tracking-[0.2em]">AURA</span>
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-medium">
            Elevate your style with our curated collections for Men and Women. 
            Crafted with quality, styled for your unique essence.
          </p>
        </div>

        {/* SHOP COLUMN */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800 mb-6">Shop</h3>
          <ul className="space-y-4 text-[13px] font-semibold text-gray-600">
            <li><Link to="/productpage" className="hover:text-emerald-700 transition-colors">All Products</Link></li>
            <li><Link to="/men" className="hover:text-emerald-700 transition-colors">Men's Collection</Link></li>
            <li><Link to="/women" className="hover:text-emerald-700 transition-colors">Women's Collection</Link></li>
          </ul>
        </div>

        {/* COMPANY COLUMN */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800 mb-6">Company</h3>
          <ul className="space-y-4 text-[13px] font-semibold text-gray-600">
            <li><Link to="/" className="hover:text-emerald-700 transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-emerald-700 transition-colors">Contact</Link></li>
            {/* <li><Link to="/" className="hover:text-emerald-700 transition-colors">Careers</Link></li> */}
          </ul>
        </div>

        {/* CONNECT COLUMN */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800 mb-6">Follow Us</h3>
          <div className="flex space-x-6 text-xl text-emerald-900">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-transform hover:-translate-y-1"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-transform hover:-translate-y-1"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-transform hover:-translate-y-1"><FaXTwitter /></a>
            <a href="mailto:support@perfura.com" className="hover:text-emerald-600 transition-transform hover:-translate-y-1"><MdEmail /></a>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Newsletter</p>
             <div className="flex mt-2">
               <input 
                 type="email" 
                 placeholder="Your email" 
                 className="bg-transparent border-b border-gray-300 text-xs py-1 focus:outline-none focus:border-emerald-700 w-full" 
               />
               <button className="text-[10px] font-bold uppercase tracking-widest ml-2 text-emerald-800 hover:text-emerald-600">Join</button>
             </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        <p>© 2025 PERFAURA. All rights reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-emerald-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-800 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;