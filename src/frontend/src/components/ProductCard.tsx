import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images.length > 0 ? product.images[0].getDirectURL() : '/assets/placeholder.jpg';

  return (
    <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
      <Card className="group overflow-hidden border-gold/20 bg-black/50 transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.featured && (
            <Badge className="absolute right-2 top-2 bg-gold text-black">Featured</Badge>
          )}
          {Number(product.inventory) === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 font-serif text-lg font-semibold text-gold">{product.name}</h3>
          <p className="mb-2 line-clamp-2 text-sm text-gold/70">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gold">
              {product.price.currencyCode} {product.price.amount.toFixed(2)}
            </span>
            <span className="text-xs text-gold/60">{product.category}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
