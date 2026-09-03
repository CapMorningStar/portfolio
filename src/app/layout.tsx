import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kyaw Soe Lwin | Data Science & AI/ML Engineer',
  description:
    'Professional portfolio of Kyaw Soe Lwin — UC San Diego Data Science student (4.0 GPA) specializing in end-to-end Machine Learning pipelines, RAG systems, and Computer Vision.',
  keywords: [
    'Kyaw Soe Lwin',
    'Data Science',
    'Machine Learning Engineer',
    'AI Engineer',
    'UC San Diego',
    'UCSD Data Science',
    'RAG',
    'Generative AI',
    'Computer Vision',
    'PyTorch',
    'TensorFlow',
  ],
  authors: [{ name: 'Kyaw Soe Lwin' }],
  openGraph: {
    title: 'Kyaw Soe Lwin | Data Science & AI/ML Engineer',
    description:
      'UC San Diego Data Science student (4.0 GPA) building end-to-end ML pipelines, RAG architectures, and Computer Vision engines.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30 overflow-x-hidden antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
