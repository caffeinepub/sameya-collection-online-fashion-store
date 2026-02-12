import { Sparkles } from 'lucide-react';
import { useGetBrandInfo } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { data: brandInfo, isLoading } = useGetBrandInfo();

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="mx-auto mb-8 h-12 w-64 bg-gold/10" />
          <Skeleton className="mx-auto h-96 max-w-4xl bg-gold/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/boutique-interior.dim_1200x800.jpg"
            alt="Boutique Interior"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>
        <div className="container relative mx-auto flex h-full items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Sparkles className="h-12 w-12 text-gold" />
            </div>
            <h1 className="font-serif text-5xl font-bold text-gold md:text-6xl">
              About SaMeya Collection
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Story */}
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-gold">Our Story</h2>
              <p className="text-lg leading-relaxed text-gold/80">{brandInfo?.story}</p>
            </div>

            {/* Mission */}
            <div className="rounded-lg border border-gold/20 bg-black/50 p-8">
              <h2 className="mb-4 font-serif text-3xl font-bold text-gold">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gold/80">{brandInfo?.mission}</p>
            </div>

            {/* Values */}
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-gold">Our Values</h2>
              <p className="text-lg leading-relaxed text-gold/80">{brandInfo?.values}</p>
            </div>

            {/* Heritage */}
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 font-serif text-3xl font-bold text-gold">Heritage</h2>
                <p className="text-lg leading-relaxed text-gold/80">{brandInfo?.heritage}</p>
              </div>
              <div>
                <h2 className="mb-4 font-serif text-3xl font-bold text-gold">Craftsmanship</h2>
                <p className="text-lg leading-relaxed text-gold/80">{brandInfo?.craftsmanship}</p>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid gap-4 md:grid-cols-2">
              <img
                src="/assets/generated/fashion-model-portrait.dim_600x800.jpg"
                alt="Fashion"
                className="h-64 w-full rounded-lg object-cover"
              />
              <img
                src="/assets/generated/accessories-collection.dim_800x600.jpg"
                alt="Accessories"
                className="h-64 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
