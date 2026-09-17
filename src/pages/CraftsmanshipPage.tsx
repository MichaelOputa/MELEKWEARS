import { craftsmanshipImages } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

const features = [
  {
    title: 'Trims & Accents',
    description: 'Contrast ribbed tipping along sleeve cuffs and bottom hems.',
    image: craftsmanshipImages.trims,
  },
  {
    title: 'Minimal Branding',
    description: 'Clean chest logo embroidery designed to remain subtle and distinctive.',
    image: craftsmanshipImages.branding,
  },
  {
    title: 'Precision Construction',
    description: 'Open plackets, structured shoulders, and tailored resort fits.',
    image: craftsmanshipImages.construction,
  },
  {
    title: 'Texture & Fabric',
    description: 'Multi-tonal bouclé, slub knits, waffle weaves, breathable cottons, and heavy-gauge textured knits.',
    image: craftsmanshipImages.texture,
  },
];

export default function CraftsmanshipPage() {
  const { ref, visible } = useReveal();

  return (
    <div className="pt-24 lg:pt-28">
      <div className="px-6 lg:px-10 py-12 text-center bg-chocolate-950">
        <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">Made With Intention.</h1>
        <p className="text-sm text-ivory-200/60 mt-4 max-w-2xl mx-auto leading-relaxed">
          Every MelekWears piece is created with purpose — from the selection of premium fabrics to the smallest finishing detail.
        </p>
      </div>

      <div ref={ref} className="px-6 lg:px-10 py-16 lg:py-24 bg-chocolate-900">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 gap-12 lg:gap-16">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-chocolate-800 mb-6">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-serif text-2xl text-ivory-50 mb-3">{feature.title}</h2>
              <p className="text-sm text-ivory-200/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
