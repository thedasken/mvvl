import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';

import '@/index.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/bricolage-grotesque/wght.css';

const queryClient = new QueryClient();
const root = document.getElementById('root')!;

createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
