"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ExternalLink } from 'lucide-react';
import type { ScannedItem } from '@/types';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<ScannedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedHistory = localStorage.getItem('scanXHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('scanXHistory');
    setHistory([]);
  };

  const deleteItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('scanXHistory', JSON.stringify(updatedHistory));
  };
  
  if (!mounted) {
    // Prevents hydration mismatch by not rendering list until client-side mount
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <p>Loading history...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pt-8 bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-semibold text-primary-foreground">Scan History</h1>
        {history.length > 0 && (
          <Button variant="destructive" size="sm" onClick={clearHistory}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <History className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No scans yet.</p>
          <p className="text-sm text-muted-foreground">Start scanning to see your history here.</p>
        </div>
      ) : (
        <ScrollArea className="flex-grow rounded-md">
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base break-all font-normal text-card-foreground">
                    {item.data}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Scanned on: {new Date(item.scannedAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end items-center gap-2 pt-2">
                   <Link href={item.data} target="_blank" rel="noopener noreferrer" passHref>
                    <Button variant="outline" size="sm" className="text-accent-foreground border-accent hover:bg-accent/10">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Open
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete item</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
