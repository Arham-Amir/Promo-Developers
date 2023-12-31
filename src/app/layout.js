import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Provider from '@redux/provider'
import Navbar from '@components/Base/navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-roboto'
})
const myFont = localFont({
  src: './fanwood-webfont.woff',
  display: 'swap',
  variable: '--font-myFont'
})
const heading = localFont({
  src: './GoudyStM-webfont.woff',
  display: 'swap',
  variable: '--font-heading'
})

export const metadata = {
  title: 'Promo Developers',
  author: "Umar Latif",
  description: "Promo Developers is a leading construction firm specializing in providing high-quality construction and contracting services. With a commitment to excellence and a customer-centric approach, we have established a strong reputation in the industry for delivering outstanding results. Our team of experienced professionals and skilled craftsmen work collaboratively to meet our client's unique construction need.",
  keyWords: "PromoGroup, RealEstate, Construction, Developer, Bricks, Farms, Promo Developer, Promo Farms, Promo Developers, Developers, Promo Bricks, Developer Clove, Developer Bulb, Developer Peeled, Developer Powder, Developer Paste, G1 Developer",
  openGraph: {
    title: "Promo Developers",
    site_name: "Promo Developers",
    url: "https://promodevelopers.com/",
    description: "Promo Developers is a leading construction firm specializing in providing high-quality construction and contracting services. With a commitment to excellence and a customer-centric approach, we have established a strong reputation in the industry for delivering outstanding results. Our team of experienced professionals and skilled craftsmen work collaboratively to meet our client's unique construction need.",
    image: "/image/nav_logo.gif",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-bg'>
      <body className={`${inter.variable} ${myFont.variable} ${heading.variable} custom-scrollbar font-sans w-screen overflow-x-hidden`}>
        <Provider>
          <Navbar />
          <ToastContainer />
          {children}
        </Provider>
      </body>
    </html>
  )
}
