import { defineConfig } from 'orval';

export default defineConfig({
  atuna: {
    input: 'https://api.atuna.org/openapi.json',
    output: {
      target: 'src/lib/api/generated/atuna-client.ts',
      schemas: 'src/lib/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      baseUrl: process.env.VITE_API_BASE_URL || 'https://api.atuna.org',
      prettier: true,
      override: {
        mutator: {
          path: 'src/lib/api/http.ts',
          name: 'api',
        },
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: false,
          options: {
            staleTime: 30000,
            refetchOnWindowFocus: false,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npm run lint || true',
    },
  },
});
