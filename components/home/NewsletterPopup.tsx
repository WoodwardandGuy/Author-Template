'use client';

/**
 * Newsletter popup — centered full-screen modal.
 *
 * Copy is hardcoded and character-exact per the client — DO NOT edit:
 *   Headline: "Want to be a Burier?"
 *   Accept:   "Hand me a shovel."
 *   Decline:  "Sounds like work."
 *
 * Presentation follows the design prototype: a dimmed backdrop over the whole
 * screen with a centered card (not a corner toast). Signup posts to the single
 * /api/newsletter integration point (Flodesk). Appears once on first visit after
 * a short delay, dismissible (X / Escape / backdrop / "Sounds like work."), and
 * remembers dismissal in localStorage so it never nags.
 */

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Signature } from '@/components/home/Signature';

const DISMISS_KEY = 'elw-newsletter-popup-dismissed';
const SHOW_DELAY_MS = 8000;

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  // Close on Escape while open.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

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
      try {
        localStorage.setItem(DISMISS_KEY, '1');
      } catch {
        /* ignore */
      }
    } catch {
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-2">
            <Signature className="mx-auto h-auto w-36 text-brand" />
            <h2 className="mt-4 font-bold text-2xl tracking-tight text-ink">
              Welcome in, Burier.
            </h2>
            <p className="mt-2 text-gray-600">
              Your shovel is on its way — check your inbox to confirm, then start
              digging.
            </p>
          </div>
        ) : (
          <>
            <Signature className="mx-auto h-auto w-36 text-brand" />
            <h2
              id="newsletter-popup-title"
              className="mt-4 font-bold text-2xl tracking-tight text-ink"
            >
              Want to be a Burier?
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              First looks, release news, and the occasional shallow secret —
              straight to your inbox. No spam.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <Input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="h-12"
              />
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="h-12 w-full bg-brand text-white hover:bg-brand-dark"
              >
                {status === 'submitting' ? 'Joining…' : 'Hand me a shovel.'}
              </Button>
            </form>

            <button
              onClick={dismiss}
              className="mt-4 text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-ink"
            >
              Sounds like work.
            </button>

            {status === 'error' && (
              <p className="mt-3 text-xs text-gray-500">
                Signup isn&rsquo;t connected yet — please try again later.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
