'use client';

/**
 * Newsletter modal + open-state provider.
 *
 * The modal is a centered overlay opened from several places — the header
 * "Mailing list" button, the hero "Become a Burier" CTA, and empty-state
 * "Join the mailing list" buttons — so its open state is lifted into a small
 * context provider mounted once in the site layout. It also auto-opens once on
 * first visit and remembers dismissal in localStorage so it never nags.
 *
 * Copy is client-verbatim and character-exact per the client — DO NOT edit:
 *   Label:    "The Buriers"
 *   Headline: "Want to be a Burier?"
 *   Body:     "Cover reveals, event dates, and the occasional thing I probably
 *              shouldn't tell you."
 *   Submit:   "Hand me a shovel."
 *   Dismiss:  "Sounds like work."
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';
import type { SanityImage } from '@/lib/types';

const DISMISS_KEY = 'elw-newsletter-popup-dismissed';
const SHOW_DELAY_MS = 6000;

interface NewsletterModalContextValue {
  open: () => void;
}

const NewsletterModalContext = createContext<NewsletterModalContextValue | null>(null);

export function useNewsletterModal() {
  const ctx = useContext(NewsletterModalContext);
  if (!ctx) {
    throw new Error('useNewsletterModal must be used within a NewsletterModalProvider');
  }
  return ctx;
}

export function NewsletterModalProvider({
  portrait,
  children,
}: {
  portrait?: SanityImage;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const markDismissed = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    markDismissed();
  }, [markDismissed]);

  // First-visit auto-open, unless previously dismissed.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const t = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <NewsletterModalContext.Provider value={value}>
      {children}
      {isOpen && <NewsletterModal portrait={portrait} onClose={close} />}
    </NewsletterModalContext.Provider>
  );
}

function NewsletterModal({
  portrait,
  onClose,
}: {
  portrait?: SanityImage;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const portraitUrl = portrait?.asset
    ? urlFor(portrait).width(700).height(900).url()
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-elw-veil bg-[rgba(26,24,34,0.72)]"
      />

      {/* Panel */}
      <div className="relative grid w-full max-w-[900px] animate-elw-rise-fast grid-cols-1 bg-ivory shadow-2xl md:grid-cols-2">
        {/* Left — brand portrait over smoky-green wash */}
        <div className="relative hidden min-h-[400px] bg-smokyGreen md:block">
          {portraitUrl && (
            <Image
              src={portraitUrl}
              alt={portrait?.alt || ''}
              fill
              sizes="450px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-smokyGreen/75 to-smokyGreen/15" />
        </div>

        {/* Right — copy + form */}
        <div className="px-8 py-12 sm:px-12">
          {status === 'success' ? (
            <div>
              <p className="font-display text-4xl leading-tight text-ink">
                You&rsquo;re in.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                Welcome, Burier. Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] uppercase tracking-[0.24em] text-brass">
                The Buriers
              </p>
              <h2 className="mt-4 font-display text-[clamp(30px,5vw,44px)] leading-[1.1] text-ink">
                Want to be a Burier?
              </h2>
              <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-ink/70">
                Cover reveals, event dates, and the occasional thing I probably
                shouldn&rsquo;t tell you.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full border border-ink/25 bg-transparent px-4 py-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-smokyGreen focus-visible:ring-2 focus-visible:ring-smokyGreen/40"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-smokyGreen px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Joining…' : 'Hand me a shovel.'}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-ink/60">
                    Signup isn&rsquo;t connected yet — please try again later.
                  </p>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-1 self-start text-[13px] text-ink/55 underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Sounds like work.
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
