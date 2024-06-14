import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  openGraph: {
    title: 'Splist',
    description: 'Share your top artists and songs with friends!',
    url: 'https://splist-lac.vercel.app/',
    siteName: 'Splist',
    images: [
      {
        url: 'https://splist-lac.vercel.app/og.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html className="dark" lang="en">
      <AuthSessionProvider session={session}>
        <body className={inter.className + " md:p-12 p-6"}>{children}</body>
      </AuthSessionProvider>
    </html>
  );
}
