import './globals.css';

export const metadata = {
  title: 'Bella Vista — Italian Restaurant',
  description: 'Authentic Italian cuisine in the heart of the city.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
