import { BottomNav } from '@/components/BottomNav';
import type { ReactNode } from 'react';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">{children}</main> {/* pb-16 for bottom nav space */}
      <BottomNav />
    </div>
  );
}
