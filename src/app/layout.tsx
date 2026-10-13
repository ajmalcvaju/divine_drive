import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsapp from '@/components/layout/FloatingWhatsapp';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: DEFAULT_DEALERSHIP_SETTINGS.seoTitle,
  description: DEFAULT_DEALERSHIP_SETTINGS.seoDescription,
  keywords: [
    'used cars Kozhikode',
    'pre owned cars Kerala',
    'Divine Drive Kozhikode',
    'second hand luxury cars Kozhikode',
    'buy used car Calicut',
    'certified flood free cars Kerala',
  ],
  authors: [{ name: 'Divine Drive' }],
  openGraph: {
    title: DEFAULT_DEALERSHIP_SETTINGS.seoTitle,
    description: DEFAULT_DEALERSHIP_SETTINGS.seoDescription,
    url: 'https://divinedrive.in',
    siteName: 'Divine Drive',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#0B0B0C] text-[#F3F4F6] min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
