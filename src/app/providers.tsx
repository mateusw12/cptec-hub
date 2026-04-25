"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmotionRegistry from "@/lib/emotion-registry";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </EmotionRegistry>
  );
}
