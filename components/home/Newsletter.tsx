'use client';

/**
 * Newsletter signup.
 *
 * Posts to the single /api/newsletter integration point (Flodesk). Requires
 * NEWSLETTER_API_KEY in the environment. See app/api/newsletter/route.ts.
 */

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SiteContent } from '@/lib/types';

interface NewsletterProps {
  content?: Pick<
    SiteContent,
    'newsletterHeadline' | 'newsletterSubtext' | 'newsletterButtonText'
  > | null;
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
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-soil-2 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {content?.newsletterHeadline || 'Join the mailing list'}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {content?.newsletterSubtext ||
              'New releases, events, and the occasional behind-the-scenes note. No spam, ever.'}
          </p>

          {status === 'success' ? (
            <p className="text-brand font-medium text-lg">
              You&rsquo;re on the list — thank you!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-brand hover:bg-brand-dark text-white h-12 px-6 shrink-0"
              >
                {status === 'submitting' ? (
                  'Joining…'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {content?.newsletterButtonText || 'Sign up'}
                  </>
                )}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-white/60 text-sm mt-4">
              Newsletter signup isn&rsquo;t connected yet. Please try again later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
