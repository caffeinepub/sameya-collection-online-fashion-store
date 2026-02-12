import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src="/assets/6d8e9d87-9798-47fe-881e-8ed9dc8678e4.png"
              alt="SaMeya Collection"
              className="mb-4 h-16 w-auto"
            />
            <p className="text-sm text-gold/70">
              Timeless elegance and sophisticated design for the modern woman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gold/70 transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: 'Dresses' }}
                  className="text-sm text-gold/70 transition-colors hover:text-gold"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryName"
                  params={{ categoryName: 'Accessories' }}
                  className="text-sm text-gold/70 transition-colors hover:text-gold"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gold/70 transition-colors hover:text-gold"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold">Contact</h3>
            <ul className="space-y-2 text-sm text-gold/70">
              <li>Email: info@sameyacollection.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Sat 10AM-8PM</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 transition-colors hover:text-gold"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 transition-colors hover:text-gold"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 transition-colors hover:text-gold"
              >
                <SiX className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gold/20 pt-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gold/60">
            © 2025. Built with <Heart className="h-4 w-4 fill-gold text-gold" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-gold-light"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
