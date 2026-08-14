import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdminProvider } from '@/context/AdminContext';

export const metadata: Metadata = {
  title: 'Atharva Chavan | E-Waste & Environmental Management Portfolio',
  description:
    'E-Portfolio of Atharva Chavan showcasing learning activities, assignments, sustainability projects, e-waste research, and environmental management work.',
  keywords: [
    'Atharva Chavan',
    'E-Waste Management',
    'Environmental Management',
    'IT Engineering',
    'Prof. Nilima Main',
    'Sustainable Electronics',
    'Circular Economy',
    'Academic Portfolio',
  ],
  authors: [{ name: 'Atharva Chavan' }],
  openGraph: {
    title: 'Atharva Chavan | E-Waste & Environmental Management Portfolio',
    description:
      'Official college course portfolio for E-Waste & Environmental Management by Atharva Chavan.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-900">
        <AdminProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
