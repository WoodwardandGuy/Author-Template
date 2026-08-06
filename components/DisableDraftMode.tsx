'use client';

import { useIsPresentationTool } from 'next-sanity/hooks';

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  // Don't show the button inside Presentation Tool — it has its own controls
  if (isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-lg"
    >
      Disable Draft Mode
    </a>
  );
}
