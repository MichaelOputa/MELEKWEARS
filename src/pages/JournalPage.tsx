import { journalArticles } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import Img from '@/components/Img';

interface JournalPageProps {
  onNavigate: (page: string) => void;
}

const categories = ['Style', 'Craftsmanship', 'Fabrics', 'Nigerian Fashion', 'Behind the Brand', 'Collections'];

export default function JournalPage({ onNavigate }: JournalPageProps) {
  const { ref, visible } = useReveal();

  return (
    <div className="pt-24 lg:pt-28">
      <div className="px-6 lg:px-10 py-12 text-center bg-chocolate-950">
        <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">The Melek Journal</h1>
        <p className="text-sm text-ivory-200/60 mt-4">Stories on style, craftsmanship, and Nigerian fashion.</p>
      </div>

      <div className="px-6 lg:px-10 py-8 bg-chocolate-950">
        <div className="mx-auto max-w-[1600px] flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs tracking-wider uppercase border border-chocolate-600 text-ivory-200/60 px-4 py-2"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="px-6 lg:px-10 py-12 bg-chocolate-950">
        <div className="mx-auto max-w-[1600px]">
          {/* Featured article */}
          {journalArticles[0] && (
            <article
              className={`group cursor-pointer mb-16 reveal ${visible ? 'is-visible' : ''}`}
              onClick={() => onNavigate('journal')}
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="aspect-[16/10] overflow-hidden bg-chocolate-800">
                  <Img
                    src={journalArticles[0].image}
                    alt={journalArticles[0].title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-gold mb-3">{journalArticles[0].category}</p>
                  <h2 className="font-serif text-3xl lg:text-4xl text-ivory-50 group-hover:text-gold transition-colors">
                    {journalArticles[0].title}
                  </h2>
                  <p className="text-sm text-ivory-200/60 mt-4 leading-relaxed">{journalArticles[0].excerpt}</p>
                  <p className="text-xs text-ivory-300/50 mt-4">{journalArticles[0].date}</p>
                </div>
              </div>
            </article>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {journalArticles.slice(1).map((article, i) => (
              <article
                key={article.id}
                className={`group cursor-pointer reveal ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => onNavigate('journal')}
              >
                <div className="aspect-[3/4] overflow-hidden bg-chocolate-800 mb-5">
                  <Img
                    thumb
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                </div>
                <p className="text-[10px] tracking-wider-2 uppercase text-gold mb-2">{article.category}</p>
                <h3 className="font-serif text-lg text-ivory-50 group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-ivory-300/50 mt-2">{article.date}</p>
                <p className="text-sm text-ivory-200/60 mt-3 leading-relaxed">{article.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
