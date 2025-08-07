import React from "react";
import { FaFacebookF, FaInstagram,  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-100  bottom-0 text-gray-950 pt-10 pb-6 px-8 mt-10 mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300 pb-8">
        <div>
         <h2 className="text-2xl font-thin-bold pb-5 pr-30">PERFAURA</h2>
          <p className="text-sm text-gray-600">
            Elevate your style with our curated collections for Men and Women. Crafted with quality, styled for you.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/productpage" className="hover:underline">All Products</a></li>
            <li><a href="/men" className="hover:underline">Men</a></li>
            <li><a href="/women" className="hover:underline">Women</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#x" className="hover:underline">Careers</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
       <div className="flex space-x-4 text-xl">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
  <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
  <a href="mailto:support@perfura.com"><MdEmail /></a>
</div>

        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-6">
        © 2025 PERFAURA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
