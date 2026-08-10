'use client';

/**
 * Newsletter popup.
 *
 * Copy is hardcoded and character-exact per the client — DO NOT edit:
 *   Headline: "Want to be a Burier?"
 *   Accept:   "Hand me a shovel."
 *   Decline:  "Sounds like work."
 *
 * Signup posts to the single /api/newsletter integration point (Flodesk).
 * Behaviour: appears once on first visit after a short delay, dismissible, and
 * remembers dismissal in localStorage so it never nags.
 */

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DISMISS_KEY = 'elw-newsletter-popup-dismissed';
const SHOW_DELAY_MS = 6000;

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<'ask' | 'email'>('ask');
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
      aria-modal="false"
      aria-label="Newsletter signup"
      className="fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-ink text-white shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <button
        onClick={dismiss}
        aria-label="Close"
        className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {status === 'success' ? (
        <div className="pr-6">
          <p className="text-xl font-bold">You&rsquo;re in.</p>
          <p className="text-white/70 mt-1">Welcome, Burier.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight pr-6">Want to be a Burier?</h2>

          {step === 'ask' ? (
            <div className="mt-5 flex flex-col gap-3">
              <Button
                onClick={() => setStep('email')}
                className="bg-brand hover:bg-brand-dark text-white w-full"
              >
                Hand me a shovel.
              </Button>
              <button
                onClick={dismiss}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Sounds like work.
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <Input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-brand hover:bg-brand-dark text-white w-full"
              >
                {status === 'submitting' ? 'Joining…' : 'Hand me a shovel.'}
              </Button>
              {status === 'error' && (
                <p className="text-white/60 text-xs">
                  Signup isn&rsquo;t connected yet — please try again later.
                </p>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
}
