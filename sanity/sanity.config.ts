import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { resolve } from './presentation/resolve';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ubvlqnqq';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'hbg-tree-service',
  title: 'Harrisburg Tree Service CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Company Information')
              .id('companyInfo')
              .child(
                S.documentTypeList('companyInfo').title('Company Information')
              ),
            S.listItem()
              .title('Hero Section')
              .id('heroContent')
              .child(
                S.documentTypeList('heroContent').title('Hero Section')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['companyInfo', 'heroContent'].includes(listItem.getId()!)
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
