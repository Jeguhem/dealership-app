import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-black px-2 lg:px-4 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Leading luxury car dealership with over 20 years of excellence in
              automotive retail.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/inventory">Inventory</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/financing">Financing</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>New Cars</li>
              <li>Pre-Owned Vehicles</li>
              <li>Car Maintenance</li>
              <li>Auto Financing</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
              {/* <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div className="w-10 h-10 bg-white/10 rounded-full" /> */}

              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Twitter className="text-white w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Instagram className="text-white w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Facebook className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Luxury Auto Dealership. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
