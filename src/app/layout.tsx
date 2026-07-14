import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'OS Pessoal',
  description: 'Seu espaço pessoal para vida, saúde e crescimento.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="shell">
          <header className="app-header">
            <div>
              <p className="eyebrow">VIDA, SAÚDE E CRESCIMENTO</p>
              <h1 className="brand">OS Pessoal</h1>
            </div>
            <nav className="nav" aria-label="Navegação principal">
              <Link href="/">Hoje</Link>
              <Link href="/semana">Semana</Link>
              <Link href="/crescimento">Crescimento</Link>
              <Link href="/corpo">Corpo</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
