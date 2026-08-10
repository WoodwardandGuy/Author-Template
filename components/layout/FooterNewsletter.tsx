'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/** Footer newsletter field — posts to the single /api/newsletter integration point. */
export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-wine-light font-medium">You&rsquo;re on the list — thank you!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-brand hover:bg-brand-dark text-white shrink-0"
      >
        {status === 'submitting' ? 'Joining…' : 'Sign up'}
      </Button>
    </form>
  );
}
