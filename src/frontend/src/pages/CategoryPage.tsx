import { useParams } from '@tanstack/react-router';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';
import { useGetProductsByCategory } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage() {
  const { categoryName } = useParams({ from: '/category/$categoryName' });
  const { data: products, isLoading } = useGetProductsByCategory(categoryName);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-gold md:text-5xl">
            {categoryName}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gold/70">
              {isLoading ? 'Loading...' : `${products?.length || 0} products`}
            </p>
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-96 bg-gold/10" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={Number(product.id)} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-gold/70">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
