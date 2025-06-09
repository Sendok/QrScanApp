"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CameraView } from '@/components/CameraView';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { useToast } from "@/hooks/use-toast";
import type { ScannedItem } from '@/types';
import { ScanLine, RefreshCw } from 'lucide-react';

const MAX_HISTORY_ITEMS = 20; // Limit the number of items in history

export default function ScanPage() {
  const [scanCount, setScanCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  // Load scanCount from localStorage on mount
  useEffect(() => {
    const storedScanCount = localStorage.getItem('scanXScanCount');
    if (storedScanCount) {
      setScanCount(parseInt(storedScanCount, 10));
    }
  }, []);

  // Save scanCount to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('scanXScanCount', scanCount.toString());
  }, [scanCount]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const newScanCount = scanCount + 1;
      setScanCount(newScanCount);

      const scannedData = `https://scanned-item-${Date.now()}.com`;
      const newItem: ScannedItem = {
        id: Date.now().toString(),
        data: scannedData,
        scannedAt: new Date().toISOString(),
      };

      // Add to history (localStorage)
      const history = JSON.parse(localStorage.getItem('scanXHistory') || '[]') as ScannedItem[];
      const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem('scanXHistory', JSON.stringify(updatedHistory));
      
      toast({
        title: "QR Code Scanned!",
        description: `Data: ${scannedData.substring(0,30)}...`,
      });

      if (newScanCount % 3 === 0) {
        setShowAd(true);
        // Automatically hide ad after some time
        setTimeout(() => setShowAd(false), 5000); // Ad shown for 5 seconds
      }
      setIsScanning(false);
    }, 1500); // Simulate 1.5 second scan
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-8 bg-background text-foreground space-y-6">
      <h1 className="text-3xl font-headline font-semibold text-primary-foreground">Scan QR Code</h1>
      
      <CameraView />

      <Button 
        onClick={handleScan} 
        disabled={isScanning}
        className="w-full max-w-md py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md transition-transform active:scale-95"
      >
        {isScanning ? (
          <>
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <ScanLine className="mr-2 h-5 w-5" />
            Tap to Scan
          </>
        )}
      </Button>

      <p className="text-sm text-muted-foreground">
        Scans performed: {scanCount}
      </p>
      <p className="text-xs text-muted-foreground text-center max-w-md">
        This is a simulation. Actual camera access and QR decoding are not implemented. Ads will appear after every 3 scans.
      </p>

      {showAd && <AdPlaceholder />}
      {/* Ad can also be closed by clicking outside or a dedicated close button if AdPlaceholder had one */}
      {showAd && <div className="fixed inset-0 z-40" onClick={handleAdClose}></div>}
    </div>
  );
}
