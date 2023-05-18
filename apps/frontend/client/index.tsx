'use client';
import { initQueryClient } from '@ts-rest/react-query';
import { apiBlog } from '@no-code/contracts';

export const client = initQueryClient(apiBlog, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  baseHeaders: {},
});

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;
