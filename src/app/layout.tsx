import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  openGraph: {
    title: "Splist",
    description: "Share your top artists and songs with friends!",
    url: "https://splist-lac.vercel.app/",
    siteName: "Splist",
    images: [
      {
        url: "https://splist-lac.vercel.app/og.png", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html className="dark" lang="en">
      <AuthSessionProvider session={session}>
        <body className={inter.className}>
          {children}
          <Analytics mode={process.env.NODE_ENV === "production" ? "production" : "development"} />
        </body>
      </AuthSessionProvider>
    </html>
  );
}
