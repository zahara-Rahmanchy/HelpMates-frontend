import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import Providers from "@/lib/Providers/Providers";
import {Toaster} from "sonner";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ChatComponent from "@/components/shared/Chatbot/ChatComponent";
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "HelpMates",
  description: "Volunteer,contribute and grow",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Providers>
      <html lang="en">
         <head>
        <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            {" "}
            <Toaster position="top-center" />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            {children}
            <ChatComponent/>
            {/* </LocalizationProvider> */}
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
