'use client';

import { useState } from 'react';
import type { SiteContent } from '@/lib/types';

interface ContactFormProps {
  content?: Pick<
    SiteContent,
    'contactHeadline' | 'contactSubtext' | 'contactButtonText'
  > | null;
  /** Preselects a subject (e.g. the Book Club page opens with "Book club submission"). */
  defaultSubject?: string;
}

const SUBJECTS = [
  'General',
  'Book club submission',
  'Media & events',
  'Something else',
] as const;

const FIELD =
  'w-full border border-ink/25 bg-transparent px-4 py-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-smokyGreen focus-visible:ring-2 focus-visible:ring-smokyGreen/30';

export function ContactForm({ content, defaultSubject }: ContactFormProps) {
  const initialSubject =
    defaultSubject && SUBJECTS.includes(defaultSubject as (typeof SUBJECTS)[number])
      ? defaultSubject
      : SUBJECTS[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
      setFormData({ name: '', email: '', subject: initialSubject, message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="bg-ivory">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-x-20 gap-y-12 px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vw,92px)]">
        <div>
          <h2 className="font-display text-[clamp(30px,5vw,42px)] leading-[1.1] text-ink">
            {content?.contactHeadline || 'Get in touch'}
          </h2>
          {content?.contactSubtext && (
            <p className="mt-5 max-w-[380px] text-[16.5px] leading-[1.9] text-ink/68">
              {content.contactSubtext}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={change}
              placeholder="Name"
              aria-label="Name"
              className={FIELD}
            />
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={change}
              placeholder="Email"
              aria-label="Email"
              className={FIELD}
            />
          </div>

          <select
            name="subject"
            value={formData.subject}
            onChange={change}
            aria-label="Subject"
            className={FIELD}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={change}
            placeholder="Message"
            aria-label="Message"
            className={`${FIELD} resize-y`}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="self-start bg-smokyGreen px-8 py-4 text-[12px] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink disabled:opacity-70"
          >
            {isSubmitting ? 'Sending…' : content?.contactButtonText || 'Send'}
          </button>

          <div aria-live="polite">
            {status === 'success' && (
              <p className="text-[14px] text-smokyGreen">
                Thank you — your message is on its way.
              </p>
            )}
            {status === 'error' && (
              <p className="text-[14px] text-red-700">
                Something went wrong. Please try again in a moment.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
