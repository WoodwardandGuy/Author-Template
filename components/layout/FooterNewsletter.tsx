'use client';

import { useState } from 'react';

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
    return (
      <p className="text-[14px] text-brass">You&rsquo;re on the list — thank you.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="min-w-[170px] flex-1 border border-ivory/28 bg-transparent px-4 py-3 text-[14px] text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-brass focus-visible:ring-2 focus-visible:ring-brass/40"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="shrink-0 bg-brass px-6 py-3 text-[12px] uppercase tracking-[0.16em] text-deepPlum transition-colors hover:bg-brassHover disabled:opacity-70"
      >
        {status === 'submitting' ? 'Joining…' : 'Join'}
      </button>
      {status === 'error' && (
        <p className="w-full text-[12px] text-ivory/50">
          Signup isn&rsquo;t connected yet — please try again later.
        </p>
      )}
    </form>
  );
}
