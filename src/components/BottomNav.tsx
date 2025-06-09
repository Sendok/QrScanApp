"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QrCode, History, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/scan', label: 'Scan', icon: ScanLine },
  { href: '/history', label: 'History', icon: History },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-md">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6 mb-0.5", isActive ? "text-primary" : "")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
