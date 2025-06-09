// This page will redirect to the /scan route by default.
// For actual redirection, you might use next.config.js redirects
// or a client-side redirect component if preferred.
// For simplicity in scaffolding, we'll assume the (tabs) layout handles this.
// Or, if this page is directly accessed, it shows nothing or redirects.

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/scan');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <p className="text-foreground">Loading ScanX...</p>
    </div>
  );
}
