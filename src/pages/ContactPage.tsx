import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Instagram, Twitter } from 'lucide-react';

const WHATSAPP_NUMBER = '2348134525822';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello MelekWears! 👋\n\n*Subject:* ${form.subject}\n\n*Message:*\n${form.message}\n\n— ${form.name}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', subject: '', message: '' });
  };

  return (
    <div className="pt-24 lg:pt-28">
      <div className="px-6 lg:px-10 py-12 text-center bg-chocolate-950">
        <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">Contact</h1>
        <p className="text-sm text-ivory-200/60 mt-4">We'd love to hear from you.</p>
      </div>

      <div className="px-6 lg:px-10 py-16 lg:py-24 bg-chocolate-900">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form → sends via WhatsApp */}
          <div>
            <h2 className="font-serif text-2xl text-ivory-50 mb-2">Send a Message</h2>
            <p className="text-sm text-ivory-200/60 mb-8">
              Fill in the form and we'll open WhatsApp with your message pre-filled.
            </p>
            {sent ? (
              <div className="border border-chocolate-700 p-6 text-center">
                <p className="text-sm text-gold mb-4">Your message was sent to WhatsApp!</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-ivory-100 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs tracking-wider-2 uppercase px-10 py-4 transition-colors"
                >
                  <MessageCircle size={16} />
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-2xl text-ivory-50 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MessageCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">WhatsApp</p>
                  <a
                    href="https://wa.me/2348134525822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 mt-1 block transition-colors"
                  >
                    +234 813 452 5822
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Email</p>
                  <a
                    href="mailto:Melekwears@gmail.com"
                    className="text-sm text-ivory-200/60 hover:text-gold mt-1 block transition-colors"
                  >
                    Melekwears@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram size={20} className="text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Instagram</p>
                  <a
                    href="https://instagram.com/melekwears"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ivory-200/60 hover:text-pink-400 mt-1 block transition-colors"
                  >
                    @melekwears
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Twitter size={20} className="text-sky-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Twitter / X</p>
                  <a
                    href="https://twitter.com/melekwears"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ivory-200/60 hover:text-sky-400 mt-1 block transition-colors"
                  >
                    @melekwears
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Atelier</p>
                  <p className="text-sm text-ivory-200/60 mt-1">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-chocolate-700">
              <p className="text-xs tracking-wider-2 uppercase text-gold mb-4">Customer Care</p>
              <p className="text-sm text-ivory-200/60 leading-relaxed">
                For order inquiries, shipping questions, or product care guidance, our team is
                available to assist you via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
