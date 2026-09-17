import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (!supabase) {
        setStatus('error');
        return;
      }
      const { error } = await supabase
        .from('contact_messages')
        .insert(form);
      if (error) {
        setStatus('error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 lg:pt-28">
      <div className="px-6 lg:px-10 py-12 text-center bg-chocolate-950">
        <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">Contact</h1>
        <p className="text-sm text-ivory-200/60 mt-4">We'd love to hear from you.</p>
      </div>

      <div className="px-6 lg:px-10 py-16 lg:py-24 bg-chocolate-900">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            <h2 className="font-serif text-2xl text-ivory-50 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Message</label>
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
                disabled={status === 'loading'}
                className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-sm text-gold animate-fade-in">Thank you. We'll be in touch shortly.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-2xl text-ivory-50 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Email</p>
                  <p className="text-sm text-ivory-200/60 mt-1">hello@melekwears.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Phone</p>
                  <p className="text-sm text-ivory-200/60 mt-1">+234 (0) 1 234 5678</p>
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
                For order inquiries, shipping questions, or product care guidance, our team is available to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
