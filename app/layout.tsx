import '../styles/globals.css';

export const metadata = {
  title: 'G-Fondation',
  description: 'Ton système personnel de progression.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
