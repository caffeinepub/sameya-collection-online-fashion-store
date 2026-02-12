import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGetProductsByCategory } from '../hooks/useQueries';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch all products to find the one we need
  const { data: allProducts, isLoading } = useGetProductsByCategory('');
  const product = allProducts?.find((p) => p.id === BigInt(productId));

  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success('Added to cart!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="h-[600px] bg-gold/10" />
            <Skeleton className="h-[600px] bg-gold/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-gold">Product not found</h2>
          <Button onClick={() => navigate({ to: '/' })} className="bg-gold text-black">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [];
  const currentImage =
    images.length > 0 ? images[selectedImageIndex].getDirectURL() : '/assets/placeholder.jpg';

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-8 text-gold hover:text-gold-light"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-lg border border-gold/20">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      idx === selectedImageIndex ? 'border-gold' : 'border-gold/20'
                    }`}
                  >
                    <img
                      src={img.getDirectURL()}
                      alt={`${product.name} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <Badge className="mb-2 bg-gold/20 text-gold">{product.category}</Badge>
                <h1 className="mb-2 font-serif text-4xl font-bold text-gold">{product.name}</h1>
              </div>
              <Button variant="ghost" size="icon" className="text-gold hover:text-gold-light">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            <p className="mb-6 text-2xl font-bold text-gold">
              {product.price.currencyCode} {product.price.amount.toFixed(2)}
            </p>

            <Separator className="my-6 bg-gold/20" />

            <p className="mb-6 text-gold/80">{product.description}</p>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gold">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className={
                        selectedSize === size
                          ? 'bg-gold text-black'
                          : 'border-gold/20 text-gold hover:bg-gold/10'
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gold">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                      className={
                        selectedColor === color
                          ? 'bg-gold text-black'
                          : 'border-gold/20 text-gold hover:bg-gold/10'
                      }
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gold">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-gold/20 text-gold hover:bg-gold/10"
                >
                  -
                </Button>
                <span className="w-12 text-center text-gold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gold/20 text-gold hover:bg-gold/10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {Number(product.inventory) > 0 ? (
                <Badge className="bg-green-500/20 text-green-400">
                  In Stock ({Number(product.inventory)} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={Number(product.inventory) === 0}
              className="w-full bg-gold text-black hover:bg-gold-light"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Separator className="my-6 bg-gold/20" />

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-gold/70">
              <p>• Free shipping on orders over $100</p>
              <p>• 30-day return policy</p>
              <p>• Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
