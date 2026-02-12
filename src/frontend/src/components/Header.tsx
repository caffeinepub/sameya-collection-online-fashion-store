import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '../contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/category/$categoryName', params: { categoryName: 'Search' } });
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' as const },
    { label: 'Dresses', path: '/category/$categoryName' as const, params: { categoryName: 'Dresses' } },
    { label: 'Accessories', path: '/category/$categoryName' as const, params: { categoryName: 'Accessories' } },
    { label: 'New Arrivals', path: '/category/$categoryName' as const, params: { categoryName: 'New Arrivals' } },
    { label: 'About', path: '/about' as const },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/6d8e9d87-9798-47fe-881e-8ed9dc8678e4.png"
              alt="SaMeya Collection"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                params={'params' in link ? link.params : undefined}
                className="text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 border-gold/20 bg-black/50 pl-10 text-gold placeholder:text-gold/40"
                />
              </div>
            </form>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gold hover:text-gold-light">
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gold p-0 text-xs text-black">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-gold">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 border-gold/20 bg-black">
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      params={'params' in link ? link.params : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-gold transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <form onSubmit={handleSearch} className="mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-gold/20 bg-black/50 pl-10 text-gold"
                      />
                    </div>
                  </form>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
