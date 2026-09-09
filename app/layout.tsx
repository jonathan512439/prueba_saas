import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Catálogouno — experiencias multirrubro',
  description: 'Demostración visual de catálogos digitales para comercios, servicios y reservas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
