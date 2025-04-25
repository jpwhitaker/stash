import { Geist, Geist_Mono } from "next/font/google";
import { 
  Sorts_Mill_Goudy, 
} from "next/font/google";
import "./globals.css";
import SearchBar from "./components/SearchBar";
import hotelData from "./components/data.json"
import LogoLink from "./components/LogoLink";
import Image from "next/image";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sortsMillGoudy = Sorts_Mill_Goudy({
  variable: "--font-sorts-mill-goudy",
  subsets: ["latin"],
  weight: "400",
});


export const metadata = {
  title: "Stash Hotel Rewards",
  description: "Discover the Best Independent Hotels",
};

export default function RootLayout({ children }) {
  const cities = [...new Set(hotelData.map(hotel => hotel.city))].sort();
  const hotelNames = [...new Set(hotelData.map(hotel => hotel.name))].sort();
  
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${sortsMillGoudy.variable}
          antialiased
        `}
      >
        <header>
          <nav className="px-20 py-8">
            <LogoLink />
          </nav>
        </header>
        <SearchBar cities={cities} hotels={hotelNames}/>
        {children}
      </body>
    </html>
  );
}
