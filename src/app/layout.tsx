import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "その1本、本当に飲む？",
  description: "飲みたい衝動が来た瞬間に開く。飲酒の損失を可視化し、飲まない未来へ導くアプリ。",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "その1本？",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-md mx-auto min-h-dvh relative">
          {children}
        </div>
      </body>
    </html>
  );
}
