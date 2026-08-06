import { Siren, Phone } from 'lucide-react';
import type { EmergencyCTAContent } from '@/lib/types';

interface EmergencyCTAProps {
  content: EmergencyCTAContent;
  phone: string;
}

export function EmergencyCTA({ content, phone }: EmergencyCTAProps) {
  return (
    <section className="bg-accent-orange py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <Siren className="h-10 w-10 text-white animate-pulse hidden md:block" />
          <div>
            <p className="text-white font-bold text-xl md:text-2xl">
              {content.headline}
            </p>
            <p className="text-white/90">{content.subtext}</p>
          </div>
        </div>
        <a
          href={`tel:${phone.replace(/\D/g, '')}`}
          className="inline-flex items-center gap-2 bg-white text-accent-orange font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg shrink-0"
        >
          <Phone className="h-5 w-5" />
          {content.buttonText} {phone}
        </a>
      </div>
    </section>
  );
}
