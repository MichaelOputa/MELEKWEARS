import { Instagram, Mail, Phone } from 'lucide-react';
import type { ElementType } from 'react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import XIcon from '@/components/icons/XIcon';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

const socials: {
  label: string;
  handle: string;
  href: string;
  icon: ElementType | null;
  color: string;
}[] = [
  {
    label: 'Instagram',
    handle: '@melekwears',
    href: 'https://instagram.com/melekwears',
    icon: Instagram,
    color: 'hover:text-pink-400',
  },
  {
    label: 'X',
    handle: '@melekwears',
    href: 'https://twitter.com/melekwears',
    icon: XIcon,
    color: 'hover:text-ivory-50',
  },
  {
    label: 'Pinterest',
    handle: '@melekwears',
    href: 'https://pinterest.com/melekwears',
    icon: null,
    color: 'hover:text-red-400',
  },
  {
    label: 'Email',
    handle: 'Melekwears@gmail.com',
    href: 'mailto:Melekwears@gmail.com',
    icon: Mail,
    color: 'hover:text-gold',
  },
  {
    label: 'WhatsApp',
    handle: '+234 813 452 5821',
    href: 'https://wa.me/2348134525821',
    icon: WhatsAppIcon,
    color: 'hover:text-green-400',
  },
  {
    label: 'Call',
    handle: '+234 813 452 5821',
    href: 'tel:+2348134525821',
    icon: Phone,
    color: 'hover:text-gold',
  },
];

// Simple Pinterest P icon
function PinterestIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.140-.828 3.330-.236.995.499 1.806 1.476 1.806 1.771 0 3.136-1.866 3.136-4.562 0-2.387-1.715-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 01.069.286c-.076.315-.244 1.002-.278 1.14-.044.181-.146.219-.337.132C7.8 17.9 7 16.44 7 14.764c0-3.101 2.252-5.952 6.497-5.952 3.411 0 6.063 2.432 6.063 5.68 0 3.39-2.138 6.118-5.104 6.118-0.997 0-1.934-.519-2.254-1.129l-.614 2.292c-.222.854-.822 1.924-1.225 2.575.924.286 1.9.44 2.917.44C17.523 22 22 17.523 22 12S17.523 2 12 2z" />
    </svg>
  );
}

export default function AccountPage({ onNavigate }: AccountPageProps) {
  return (
    <div className="min-h-screen bg-chocolate-950 pt-32 pb-24 px-6 lg:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-wider-2 uppercase text-gold mb-4">Stay Connected</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ivory-50 mb-4">
            Find Us Everywhere
          </h1>
          <p className="text-sm text-ivory-200/60 leading-relaxed max-w-md mx-auto">
            Follow our world, reach out with questions, or send your order directly via WhatsApp.
            We're always just a message away.
          </p>
        </div>

        {/* Social links */}
        <div className="space-y-4 mb-16">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`flex items-center justify-between border border-chocolate-700 px-6 py-5 text-ivory-200/70 ${s.color} hover:border-gold/50 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-4">
                  <span className="transition-colors duration-300">
                    {Icon ? (
                      <Icon size={20} />
                    ) : (
                      <PinterestIcon size={20} />
                    )}
                  </span>
                  <div>
                    <p className="text-xs tracking-wider-2 uppercase text-gold mb-0.5">{s.label}</p>
                    <p className="text-sm">{s.handle}</p>
                  </div>
                </div>
                <span className="text-xs tracking-wider-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit →
                </span>
              </a>
            );
          })}
        </div>

        {/* WhatsApp order CTA */}
        <div className="bg-chocolate-900 border border-chocolate-700 p-8 text-center">
          <WhatsAppIcon size={28} className="text-green-400 mx-auto mb-4" />
          <h2 className="font-serif text-xl text-ivory-100 mb-2">Ready to Order?</h2>
          <p className="text-sm text-ivory-200/60 mb-6 leading-relaxed">
            Browse the shop, add your favourites to your bag, and check out via WhatsApp — our team
            will confirm your order and shipping details personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3 hover:bg-gold-light transition-colors"
            >
              Shop Now
            </button>
            <a
              href="https://wa.me/2348134525821"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-600 text-green-400 text-xs tracking-wider-2 uppercase px-8 py-3 hover:bg-green-600/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
