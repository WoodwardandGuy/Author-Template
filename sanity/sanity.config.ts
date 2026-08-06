import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { resolve } from './presentation/resolve';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// The four collections the client edits day-to-day.
const clientTypes = ['book', 'event', 'bookClubPhoto', 'press'];

// Single-instance documents (site config) — pinned, not creatable/deletable.
const singletons: { id: string; title: string }[] = [
  { id: 'authorInfo', title: 'Author Information' },
  { id: 'heroContent', title: 'Hero Section' },
  { id: 'featuredRelease', title: 'Featured Release' },
  { id: 'siteContent', title: 'Site Content' },
];
const singletonIds = new Set(singletons.map((s) => s.id));

// Homepage-only content types that are ours to manage, not part of her four.
const adminCollections = ['brandStatement', 'praise', 'faqItem', 'blogPost'];

export default defineConfig({
  name: 'author-website',
  title: 'Author Website CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── What the client edits ────────────────────────────────
            S.documentTypeListItem('book').title('Books'),
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('bookClubPhoto').title('Book Club Gallery'),
            S.documentTypeListItem('press').title('Press'),

            S.divider(),

            // ── Admin: site settings + homepage content (kept out of her flow) ─
            S.listItem()
              .title('⚙ Site Settings')
              .id('siteSettings')
              .child(
                S.list()
                  .title('Site Settings')
                  .items([
                    ...singletons.map((s) =>
                      S.listItem()
                        .title(s.title)
                        .id(s.id)
                        .child(S.document().schemaType(s.id).documentId(s.id)),
                    ),
                    S.divider(),
                    S.documentTypeListItem('brandStatement').title('About Statement'),
                    S.documentTypeListItem('praise').title('Praise'),
                    S.documentTypeListItem('faqItem').title('FAQ'),
                    S.documentTypeListItem('blogPost').title('Blog Posts'),
                  ]),
              ),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Restrict the global "Create new" menu to the client's four content types.
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          clientTypes.includes(item.templateId) ||
          adminCollections.includes(item.templateId),
      ),
    // Singletons can't be created/duplicated/deleted — only edited & published.
    actions: (prev, { schemaType }) =>
      singletonIds.has(schemaType)
        ? prev.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : prev,
  },
});

// NOTE: Hard per-user access (so the client literally cannot reach Site Settings)
// is a project-level role in sanity.io/manage — assign Erika a non-Administrator
// role (e.g. a custom "Editor"). This config does the structural + create/delete
// locking; the role assignment is the one remaining dashboard step.
