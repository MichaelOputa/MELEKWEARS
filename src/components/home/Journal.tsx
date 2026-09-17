import { journalArticles } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

interface JournalProps {
  onNavigate: (page: string) => void;
}

const categories = ['Style', 'Craftsmanship', 'Fabrics', 'Nigerian Fashion', 'Behind the Brand', 'Collections'];

export default function Journal({ onNavigate }: JournalProps) {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className={`text-center mb-12 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">The Journal</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">The Melek Journal</h2>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs tracking-wider uppercase border border-chocolate-600 text-ivory-200/60 px-4 py-2"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {journalArticles.map((article, i) => (
            <article
              key={article.id}
              className={`group cursor-pointer reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => onNavigate('journal')}
            >
              <div className="aspect-[3/4] overflow-hidden bg-chocolate-800 mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
              <p className="text-[10px] tracking-wider-2 uppercase text-gold mb-2">{article.category}</p>
              <h3 className="font-serif text-lg text-ivory-50 group-hover:text-gold transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-ivory-200/50 mt-2">{article.date}</p>
              <p className="text-sm text-ivory-200/60 mt-3 leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
