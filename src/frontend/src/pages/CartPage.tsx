import { Link, useNavigate } from '@tanstack/react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gold/40" />
          <h2 className="mb-4 font-serif text-2xl font-bold text-gold">Your cart is empty</h2>
          <p className="mb-6 text-gold/70">Start shopping to add items to your cart</p>
          <Button onClick={() => navigate({ to: '/' })} className="bg-gold text-black">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-8 text-gold hover:text-gold-light"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <h1 className="mb-8 font-serif text-4xl font-bold text-gold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => {
                const imageUrl =
                  item.product.images.length > 0
                    ? item.product.images[0].getDirectURL()
                    : '/assets/placeholder.jpg';

                return (
                  <Card
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="border-gold/20 bg-black/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={imageUrl}
                          alt={item.product.name}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              to="/product/$productId"
                              params={{ productId: item.product.id.toString() }}
                            >
                              <h3 className="font-serif text-lg font-semibold text-gold hover:text-gold-light">
                                {item.product.name}
                              </h3>
                            </Link>
                            <div className="mt-1 flex gap-4 text-sm text-gold/70">
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="h-8 w-8 border-gold/20 text-gold hover:bg-gold/10"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-gold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="h-8 w-8 border-gold/20 text-gold hover:bg-gold/10"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-gold">
                                {item.product.price.currencyCode}{' '}
                                {(item.product.price.amount * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-gold/70 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button
              variant="ghost"
              onClick={clearCart}
              className="mt-4 text-gold/70 hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 border-gold/20 bg-black/50">
              <CardContent className="p-6">
                <h2 className="mb-4 font-serif text-2xl font-bold text-gold">Order Summary</h2>
                <Separator className="my-4 bg-gold/20" />
                <div className="space-y-2">
                  <div className="flex justify-between text-gold/70">
                    <span>Subtotal</span>
                    <span>USD {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gold/70">
                    <span>Shipping</span>
                    <span>{getTotalPrice() > 100 ? 'Free' : 'USD 10.00'}</span>
                  </div>
                  <Separator className="my-4 bg-gold/20" />
                  <div className="flex justify-between text-xl font-bold text-gold">
                    <span>Total</span>
                    <span>
                      USD {(getTotalPrice() + (getTotalPrice() > 100 ? 0 : 10)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-gold text-black hover:bg-gold-light" size="lg">
                  Proceed to Checkout
                </Button>
                <p className="mt-4 text-center text-xs text-gold/60">
                  Payment processing coming soon
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
