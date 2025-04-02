import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-end items-center"></header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
