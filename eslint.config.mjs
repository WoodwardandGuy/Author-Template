import next from 'eslint-config-next/core-web-vitals';

// Flat config for ESLint 9 (Next 16 removed `next lint`). eslint-config-next v16
// ships a native flat-config array, so we spread it directly — same rules as the
// old `.eslintrc.json` (`next/core-web-vitals`), no FlatCompat needed.
const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts'] },
  ...next,
];

export default config;
