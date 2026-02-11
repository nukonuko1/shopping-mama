import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "買い物ママ - スーパー最安値比較",
  description: "近所のスーパーの最安値を商品ごとに比較。今日はどこに買いに行けばいいか一目瞭然！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-background text-foreground">
        <header className="bg-primary text-white shadow-md sticky top-0 z-50">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              買い物ママ
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/ranking" className="hover:opacity-80">
                ランキング
              </Link>
              <Link href="/auth/login" className="bg-white/20 rounded-full px-3 py-1 hover:bg-white/30">
                ログイン
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 py-4 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
