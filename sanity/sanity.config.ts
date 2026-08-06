import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { resolve } from './presentation/resolve';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Documents that should exist only once (edited in place, not created as a list).
const singletons = ['authorInfo', 'heroContent', 'featuredRelease', 'siteContent'];
const singletonTitles: Record<string, string> = {
  authorInfo: 'Author Information',
  heroContent: 'Hero Section',
  featuredRelease: 'Featured Release',
  siteContent: 'Site Content',
};

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
            ...singletons.map((id) =>
              S.listItem()
                .title(singletonTitles[id])
                .id(id)
                .child(S.document().schemaType(id).documentId(id)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletons.includes(listItem.getId()!),
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
});
