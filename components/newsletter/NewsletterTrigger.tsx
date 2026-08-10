'use client';

import { useNewsletterModal } from '@/components/newsletter/NewsletterModalProvider';

/**
 * A button that opens the newsletter modal. Lets server components (Hero,
 * Events empty state, Book Club header) trigger the modal without themselves
 * becoming client components.
 */
export function NewsletterTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useNewsletterModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
