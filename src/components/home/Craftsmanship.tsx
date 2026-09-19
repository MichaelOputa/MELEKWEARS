import { craftsmanshipImages } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import Img from '@/components/Img';

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

export default function Craftsmanship() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-900">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">The Process</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">Made With Intention.</h2>
          <p className="text-sm text-ivory-200/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            Every MelekWears piece is created with purpose — from the selection of premium fabrics to the smallest finishing detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-chocolate-800 mb-5">
                <Img
                  thumb
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="font-serif text-xl text-ivory-50 mb-2">{feature.title}</h3>
              <p className="text-sm text-ivory-200/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
