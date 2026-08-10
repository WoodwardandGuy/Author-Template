'use client';

/**
 * Newsletter band.
 *
 * ⚠️ Posts to /api/newsletter, which is a stub until an email provider
 * (Flodesk, MailerLite, Kit, etc.) is chosen. See app/api/newsletter/route.ts.
 *
 * Heading and submit label are client-verbatim — do not edit.
 */

import { useState } from 'react';
import type { SiteContent } from '@/lib/types';

interface NewsletterProps {
  content?: Pick<SiteContent, 'newsletterSubtext'> | null;
}

export function Newsletter({ content }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'band' }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="bg-deepPlum text-ivory">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-x-20 gap-y-12 px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vw,92px)]">
        <div>
          <h2 className="font-display text-[clamp(30px,4.4vw,44px)] leading-[1.14]">
            Want to be a Burier?
          </h2>
          {content?.newsletterSubtext && (
            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.85] text-ivory/64">
              {content.newsletterSubtext}
            </p>
          )}
        </div>

        <div>
          {status === 'success' ? (
            <p className="text-[16px] text-brass" role="status">
              You&rsquo;re on the list — welcome, Burier.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full border border-ivory/28 bg-transparent px-[18px] py-[17px] text-[16px] text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-brass focus-visible:ring-2 focus-visible:ring-brass/40"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-brass px-6 py-[17px] text-[12px] uppercase tracking-[0.2em] text-deepPlum transition-colors hover:bg-brassHover disabled:opacity-70"
              >
                {status === 'submitting' ? 'Joining…' : 'Hand me a shovel.'}
              </button>
              {status === 'error' && (
                <p className="text-[13px] text-ivory/55" role="alert">
                  Signup isn&rsquo;t connected yet — please try again later.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
