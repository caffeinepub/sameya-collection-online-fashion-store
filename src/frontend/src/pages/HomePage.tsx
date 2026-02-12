import { Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';
import { useGetFeaturedProducts, useGetAllCategories } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { data: featuredProducts, isLoading: productsLoading } = useGetFeaturedProducts();
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/fashion-model-portrait.dim_600x800.jpg"
            alt="Fashion Model"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium uppercase tracking-wider text-gold">
                Luxury Fashion
              </span>
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-gold md:text-6xl lg:text-7xl">
              Timeless Elegance
              <br />
              <span className="text-gold-light">Redefined</span>
            </h1>
            <p className="mb-8 text-lg text-gold/80">
              Discover our curated collection of sophisticated designs that celebrate your
              individuality and empower your style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category/$categoryName" params={{ categoryName: 'New Arrivals' }}>
                <Button size="lg" className="bg-gold text-black hover:bg-gold-light">
                  Shop New Arrivals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold/10"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-y border-gold/20 bg-black/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-gold">
            Shop by Category
          </h2>
          {categoriesLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 bg-gold/10" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  to="/category/$categoryName"
                  params={{ categoryName: category.name }}
                >
                  <div className="group relative h-64 overflow-hidden rounded-lg border border-gold/20 transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10">
                    <img
                      src={getCategoryImage(category.name)}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="mb-2 font-serif text-2xl font-bold text-gold">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gold/80">{category.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-gold">Featured Collection</h2>
            <p className="text-gold/70">
              Handpicked pieces that embody sophistication and style
            </p>
          </div>
          {productsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-96 bg-gold/10" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts?.slice(0, 4).map((product) => (
                <ProductCard key={Number(product.id)} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Promise */}
      <section className="border-t border-gold/20 bg-black/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-gold">Premium Quality</h3>
              <p className="text-sm text-gold/70">
                Crafted with the finest materials and attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-gold">
                Timeless Design
              </h3>
              <p className="text-sm text-gold/70">
                Classic pieces that transcend trends and seasons
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-gold">
                Exceptional Service
              </h3>
              <p className="text-sm text-gold/70">
                Dedicated support to ensure your complete satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryImage(categoryName: string): string {
  const images: Record<string, string> = {
    Dresses: '/assets/generated/evening-dress.dim_800x1200.jpg',
    Accessories: '/assets/generated/accessories-collection.dim_800x600.jpg',
    'New Arrivals': '/assets/generated/cocktail-dress.dim_600x800.jpg',
  };
  return images[categoryName] || '/assets/generated/fashion-model-portrait.dim_600x800.jpg';
}
