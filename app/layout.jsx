import './globals.css';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' });

export const metadata = {
  title: 'Bella Vista — Italian Restaurant',
  description: 'Authentic Italian cuisine. Order directly from your table.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
