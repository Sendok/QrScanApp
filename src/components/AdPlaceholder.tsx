import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export function AdPlaceholder() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg">Advertisement</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Image 
            src="https://placehold.co/300x250.png" 
            alt="Ad Placeholder" 
            width={300} 
            height={250} 
            className="rounded-md"
            data-ai-hint="advertisement banner" 
          />
          <p className="text-xs text-muted-foreground mt-2">This is a placeholder for an AdMob ad.</p>
        </CardContent>
      </Card>
    </div>
  );
}
