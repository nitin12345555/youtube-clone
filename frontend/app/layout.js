import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { Toaster } from "react-hot-toast"; 

export const metadata = {
  title: "YouTube Playlist Curator",
  description: "Curate YouTube videos and collections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AppProvider>
      </body>
    </html>
  );
}
