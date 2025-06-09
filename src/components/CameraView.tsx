
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not available.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Available',
          description: 'Your browser does not support camera access or it is disabled.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Ensure video is playing, some browsers require explicit play
          videoRef.current.play().catch(err => console.error("Video play failed:", err));
          videoRef.current.onloadedmetadata = () => {
            setIsCameraInitialized(true);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsCameraInitialized(false);
        let description = 'Please enable camera permissions in your browser settings to use this app.';
        if (error instanceof Error) {
            if (error.name === "NotAllowedError") {
                description = "Camera access was denied. Please enable it in your browser settings.";
            } else if (error.name === "NotFoundError") {
                description = "No camera was found. Please ensure a camera is connected and enabled.";
            } else if (error.name === "NotReadableError") {
                description = "Camera is already in use or there was a hardware error.";
            } else {
                description = `An error occurred: ${error.message}`;
            }
        }
        toast({
          variant: 'destructive',
          title: 'Camera Access Error',
          description: description,
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-muted-foreground rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover rounded-lg",
          hasCameraPermission === true ? "block" : "hidden"
        )}
        autoPlay
        muted
        playsInline
      />

      {hasCameraPermission !== true && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-background/80 p-4 z-10">
          {hasCameraPermission === null && (
            <>
              <Camera size={64} className="mb-4 animate-pulse" />
              <p className="text-lg font-medium">Requesting camera access...</p>
            </>
          )}
          {hasCameraPermission === false && (
            <Alert variant="destructive" className="w-full max-w-sm bg-card text-card-foreground">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Camera Access Problem</AlertTitle>
              <AlertDescription>
                Camera access is required. Check permissions and ensure a camera is available. Refresh to try again.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {hasCameraPermission !== false && (
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-20">
          <div className="relative w-full max-w-[280px] aspect-square">
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
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent/70 rounded-full scan-line" />
          </div>
        </div>
      )}

      {hasCameraPermission === true && isCameraInitialized && (
        <p className="absolute bottom-4 text-center text-sm text-background/90 bg-black/50 px-3 py-1.5 rounded-md pointer-events-none z-30">
          Align QR Code within frame
        </p>
      )}
    </div>
  );
}
