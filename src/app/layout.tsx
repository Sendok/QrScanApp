import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ScanX - QR Code Scanner',
  description: 'Scan QR codes easily with ScanX. Track your scan history and enjoy a seamless experience.',
  manifest: '/manifest.json', // Optional: for PWA capabilities
  themeColor: '#F5F0FF', // Very light lavender
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        {/* Optional: PWA related meta tags */}
        <meta name="application-name" content="ScanX" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ScanX" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#D0BFFF" /> 
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
