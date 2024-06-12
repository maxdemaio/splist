import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
