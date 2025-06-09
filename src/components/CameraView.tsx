"use client";

import { Camera } from 'lucide-react';

export function CameraView() {
  return (
    <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-muted-foreground rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
      {/* Placeholder for actual camera feed */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-background/80">
        <Camera size={64} className="mb-4" />
        <p className="text-lg font-medium">Align QR Code within frame</p>
      </div>
      
      {/* Scanning Frame Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
        <div className="relative w-full max-w-[280px] aspect-square">
          {/* Corner Brackets */}
          {[
            "top-0 left-0 border-t-4 border-l-4",
            "top-0 right-0 border-t-4 border-r-4",
            "bottom-0 left-0 border-b-4 border-l-4",
            "bottom-0 right-0 border-b-4 border-r-4",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-10 h-10 border-accent rounded-sm ${pos}`}
            />
          ))}
          {/* Animated Scanning Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent/70 rounded-full scan-line" />
        </div>
      </div>
    </div>
  );
}
